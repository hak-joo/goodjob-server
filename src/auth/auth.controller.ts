import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ResponseType } from 'src/lib/response';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject(AuthService) private authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@Request() req): Promise<ResponseType> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async getUser(@Request() req): Promise<ResponseType> {
    return this.authService.getUser(req.user);
  }
}
