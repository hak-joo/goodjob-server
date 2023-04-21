import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from 'src/lib/bcrypt';
import { ResponseType } from 'src/lib/response';
import { User } from 'src/user/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(userId: string, password: string): Promise<User> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      return null;
    }
    const matched = await comparePassword(password, user.password);

    if (matched) {
      return user;
    }
  }
  public async login(user: {
    userId: string;
    password: string;
  }): Promise<ResponseType> {
    const generatedToken = this.jwtService.sign({
      userId: user.userId,
      password: user.password,
    });
    if (!generatedToken) {
      return {
        data: null,
        statusCode: HttpStatus.UNAUTHORIZED,
      };
    }
    return {
      data: {
        access_token: generatedToken,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async getUser(user: {
    userId: string;
    password: string;
  }): Promise<ResponseType> {
    const foundUser = await this.userService.findOne(user.userId);
    if (foundUser) {
      return {
        data: foundUser,
        statusCode: HttpStatus.OK,
      };
    }
    return {
      data: null,
      statusCode: HttpStatus.UNAUTHORIZED,
    };
  }
}
