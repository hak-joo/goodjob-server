import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ResponseType } from 'src/lib/response';

@Controller('company')
export class CompanyController {
  @Inject(CompanyService) private companyService: CompanyService;

  @UseGuards(JwtAuthGuard)
  @Get('')
  public async list(@Request() req): Promise<ResponseType> {
    return this.companyService.getList(req.user);
  }
}
