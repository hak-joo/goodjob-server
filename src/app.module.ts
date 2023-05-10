import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PassportModule,
    JwtModule,
    CompanyModule,
  ],
  controllers: [AppController, CompanyController],
  providers: [AppService, CompanyService],
})
export class AppModule {}
