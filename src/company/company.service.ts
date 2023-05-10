import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { Company } from './company.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanyService {
  constructor(
    private userService: UserService,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}
  public async getList(user: { userId: string; password: string }) {
    const reqUser = await this.userService.findOne(user.userId);

    const listCompanies = await this.companyModel.find({
      jobGroup: reqUser.jobGroup,
    });
    console.log('listCompanies', listCompanies);
    return {
      data: null,
      statusCode: 200,
    };
  }
}
