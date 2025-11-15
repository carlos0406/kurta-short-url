import Redis from 'ioredis';
import { config } from 'src/config/config';

export const redisProviders = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
      return new Redis({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
      });
    },
  },
];
