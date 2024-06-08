/* eslint-disable prettier/prettier */

import { User } from 'src/user/infrastructure/entity/user.entity';
import { AuthenticationServiceInterface } from '../domain/authentication.service.interface';
import { ILogin } from '../domain/interfaces/login.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { BcryptPasswordHashService } from './bcryptPasswordHash.service';
import { IRegister } from '../domain/interfaces/register.interface';

@Injectable()
export class AuthenticationService
  implements AuthenticationServiceInterface<User>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptPasswordHashService: BcryptPasswordHashService,
  ) {}
  async register(register: IRegister): Promise<void> {
    const { email, password, firstName, lastName } = register;

    const existUser = await this.userRepository.findOneBy({ email });
    if (existUser) throw new HttpException('user already exist', 400);

    const hashedPassword = await this.bcryptPasswordHashService.hash(password);
    await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return;
  }

  async get() {
    return await this.userRepository.find();
  }

  async valideateUser(login: ILogin): Promise<User | null> {
    const { email, password } = login;

    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) return null;

      const isValid = await this.bcryptPasswordHashService.compare(
        password,
        user.password,
      );
      if (!isValid) return null;

      return user;
    } catch (error) {}
  }
}
