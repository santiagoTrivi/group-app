/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
