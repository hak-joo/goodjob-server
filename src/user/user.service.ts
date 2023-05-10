import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './user.dto';
import { ResponseType } from 'src/lib/response';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { encodePassword } from 'src/lib/bcrypt';

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
      user.password = await encodePassword(user.password);

      user.prefer = null;
      user.jobGroup = '';
      await user.save();
      return {
        data: user,
        statusCode: HttpStatus.OK,
      };
    }
  }
  public async findOne(userId: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ userId });
    return foundUser;
  }
}
