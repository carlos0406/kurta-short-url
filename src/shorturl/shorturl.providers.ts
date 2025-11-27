import { Client } from 'cassandra-driver';
import Redis from 'ioredis';
import { CassandraShortUrlRepository } from './infrastructure/repositories/cassandra-short-url.repository';
import { IdGeneratorService } from './infrastructure/services/id-generator.service';
import { CreateShortUrlUseCase } from './application/usecases/create-short-url.usecase';
import { GetShortUrlByIdUseCase } from './application/usecases/get-short-url-by-id.usecase';
import { ListShortUrlsUseCase } from './application/usecases/list-short-urls.usecase';
import { Config } from 'src/config/config';

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
    useFactory: (redisClient: Redis, config: Config) => {
      return new IdGeneratorService(redisClient, config.SECRET_KEY);
    },
    inject: ['REDIS_CLIENT', 'CONFIG'],
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
  {
    provide: 'GET_SHORTURL_BY_ID_USECASE',
    useFactory: (shortUrlRepository: CassandraShortUrlRepository) => {
      return new GetShortUrlByIdUseCase(shortUrlRepository);
    },
    inject: ['SHORTURL_REPOSITORY'],
  },
  {
    provide: 'LIST_SHORTURLS_USECASE',
    useFactory: (shortUrlRepository: CassandraShortUrlRepository) => {
      return new ListShortUrlsUseCase(shortUrlRepository);
    },
    inject: ['SHORTURL_REPOSITORY'],
  },
];
