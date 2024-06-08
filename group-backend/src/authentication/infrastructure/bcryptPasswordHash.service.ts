/* eslint-disable prettier/prettier */
import { compare, genSalt, hash } from 'bcrypt';
import { PasswordEncriptInterface } from '../domain/passwordEncript.interface';

export class BcryptPasswordHashService implements PasswordEncriptInterface {
  private readonly saltNumber: number = 10;
  async hash(input: string): Promise<string> {
    const salt = await genSalt(this.saltNumber);
    const hashedData = await hash(input, salt);

    return hashedData;
  }
  async compare(input: string, hash: string): Promise<boolean> {
    return await compare(input, hash);
  }
}
