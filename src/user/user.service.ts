import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './user.dto';
import { ResponseType } from 'src/lib/response';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async register(req: UserRegisterDto): Promise<ResponseType> {
    const foundUser = await this.userModel.findOne({ userId: req.userId });

    if (foundUser) {
      return {
        data: null,
        statusCode: HttpStatus.CONFLICT,
      };
    } else {
      const user = await this.userModel.create(req);
      user.prefer = null;
      user.job_group = '';
      await user.save();
      return {
        data: user,
        statusCode: HttpStatus.OK,
      };
    }
  }

  public async login(req: UserRegisterDto): Promise<ResponseType> {
    const foundUser = await this.userModel.findOne({ userId: req.userId });
    if (foundUser && foundUser.password === req.password) {
      return {
        data: foundUser,
        statusCode: HttpStatus.OK,
      };
    } else {
      return {
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
  }
}
