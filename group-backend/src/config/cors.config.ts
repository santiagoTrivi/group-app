import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  preflightContinue: false,
  methods: ['*', 'PATCH'],
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Accept',
    'Origin',
    'x-refresh-token',
    'Authorization',
  ],
  credentials: true,
};
