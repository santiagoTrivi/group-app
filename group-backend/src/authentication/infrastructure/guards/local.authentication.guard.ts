/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({
      property: 'user',
    });
  }
}
