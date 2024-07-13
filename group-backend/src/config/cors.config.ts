import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://group-dmipqb41e-santiagotrivis-projects.vercel.app',
    'https://lhzhxq7h-3000.use2.devtunnels.ms',
  ],
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
