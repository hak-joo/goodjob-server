import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ collection: 'stat' })
export class Company {
  @Prop()
  jobGroup: string;

  @Prop()
  CompanyName: string;

  @Prop()
  postWelfare: number;

  @Prop()
  postPay: number;

  @Prop()
  postCulture: number;

  @Prop()
  postTask: number;

  @Prop()
  postCommute: number;

  @Prop()
  negWelfare: number;

  @Prop()
  negPay: number;

  @Prop()
  negCulture: number;

  @Prop()
  negTask: number;

  @Prop()
  negCommute: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
