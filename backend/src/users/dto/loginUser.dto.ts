import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class loginUserDto {
  _id: ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  permissions: string;

  createdAt: Date;
}
