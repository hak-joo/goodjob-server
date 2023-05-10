import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.schema';
import { CompanyService } from './company.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CompanyService, UserService],
  exports: [CompanyService, MongooseModule],
})
export class CompanyModule {}
