import { Client } from 'cassandra-driver';
import { config } from '../config/config';
import { PrismaService } from './services/prisma.service';

export const databaseProviders = [
  {
    provide: 'CASSANDRA_CLIENT',
    useFactory: () => {
      return new Client({
        contactPoints: [config.DBHOST],
        localDataCenter: config.DBDATACENTER,
        keyspace: config.DBKEYSPACE,
      });
    },
  },
  {
    provide: 'PRISMA_SERVICE',
    useFactory: () => {
      return new PrismaService();
    },
  },
];
