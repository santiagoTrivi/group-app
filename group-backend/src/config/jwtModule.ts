/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const CONFIG_JWT_TIMING = {
  access_token_expireIn: '7d',
  refresh_token_expireIn: '7d',
};

export class JwtModuleConfig {
  static async forRoot() {
    return await JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('PRIVATE_KEY'),
        signOptions: { expiresIn: CONFIG_JWT_TIMING.access_token_expireIn },
      }),
    });
  }
}
