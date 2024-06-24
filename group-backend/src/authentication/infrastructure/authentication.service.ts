/* eslint-disable prettier/prettier */

import { User } from 'src/user/infrastructure/entity/user.entity';
import { AuthenticationServiceInterface } from '../domain/authentication.service.interface';
import { ILogin } from '../domain/interfaces/login.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { BcryptPasswordHashService } from './bcryptPasswordHash.service';
import { IRegister } from '../domain/interfaces/register.interface';
import { Credentials } from '../domain/interfaces/credentials';
import { ConfigService } from '@nestjs/config';
import { CONFIG_JWT_TIMING } from 'src/config/jwtModule';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService
  implements AuthenticationServiceInterface<User>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptPasswordHashService: BcryptPasswordHashService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async get(id: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });

    const { password, refreshToken, ...result } = user;

    return result;
  }
  async getTokens(uuid: string, email: string): Promise<Credentials> {
    const payload = {
      uuid,
      email,
    };

    const accessToken = await this.jwtService.sign(payload);

    const refreshToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_KEY'),
      expiresIn: CONFIG_JWT_TIMING.refresh_token_expireIn,
    });

    return {
      accessToken,
      refreshToken,
    } as Credentials;
  }
  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(id, { refreshToken });
  }
  async refreshTokens(
    userId: string,
    refreshTokenInput: string,
  ): Promise<Credentials> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const { refreshToken } = user;

    const refreshTokenValidation = refreshTokenInput === refreshToken;

    if (!refreshTokenValidation) throw new ForbiddenException('Access Denied');

    const { id, email } = user;

    const tokens = await this.getTokens(id, email);

    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }
  async logout(id: string): Promise<void> {
    await this.userRepository.update(id, { refreshToken: null });
  }

  async login(user: User): Promise<Credentials> {
    const { id, email } = user;
    const tokens = await this.getTokens(id, email);

    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }
  async register(register: IRegister): Promise<Credentials> {
    const { email, password, firstName, lastName } = register;

    const existUser = await this.userRepository.findOneBy({ email });
    if (existUser) throw new HttpException('user already exist', 400);

    const hashedPassword = await this.bcryptPasswordHashService.hash(password);
    const user = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return await this.login(user);
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
