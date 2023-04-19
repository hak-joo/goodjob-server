import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserRegisterDto } from './user.dto';
import { ResponseType } from 'src/lib/response';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService) private userService: UserService;

  @Post('/login')
  public async login(@Body() body: UserRegisterDto): Promise<ResponseType> {
    return this.userService.login(body);
  }

  @Post('/register')
  public async register(@Body() body: UserRegisterDto): Promise<ResponseType> {
    return this.userService.register(body);
  }
}
