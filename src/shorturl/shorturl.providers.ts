import { Client } from 'cassandra-driver';
import Redis from 'ioredis';
import { CassandraShortUrlRepository } from './infrastructure/repositories/cassandra-short-url.repository';
import { IdGeneratorService } from './infrastructure/services/id-generator.service';
import { CreateShortUrlUseCase } from './application/usecases/create-short-url.usecase';

export const shortUrlProviders = [
  {
    provide: 'SHORTURL_REPOSITORY',
    useFactory: (client: Client) => {
      return new CassandraShortUrlRepository(client);
    },
    inject: ['CASSANDRA_CLIENT'],
  },
  {
    provide: 'ID_GENERATOR_SERVICE',
    useFactory: (redisClient: Redis) => {
      return new IdGeneratorService(redisClient);
    },
    inject: ['REDIS_CLIENT'],
  },
  {
    provide: 'CREATE_SHORTURL_USECASE',
    useFactory: (
      shortUrlRepository: CassandraShortUrlRepository,
      idGeneratorService: IdGeneratorService,
    ) => {
      return new CreateShortUrlUseCase(shortUrlRepository, idGeneratorService);
    },
    inject: ['SHORTURL_REPOSITORY', 'ID_GENERATOR_SERVICE'],
  },
];
