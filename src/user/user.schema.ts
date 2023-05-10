import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export interface Prefer {
  welfare: number;
  pay: number;
  task: number;
  commute: number;
  culture: number;
}

@Schema({ collection: 'user' })
export class User {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  jobGroup: string;

  @Prop({ type: Object })
  prefer?: Prefer;
}

export const UserSchema = SchemaFactory.createForClass(User);
