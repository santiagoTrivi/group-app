/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';
import { IRegister } from 'src/authentication/domain/interfaces/register.interface';

/* eslint-disable prettier/prettier */
export class RegisterDto implements IRegister {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Length(8)
  password: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
}
