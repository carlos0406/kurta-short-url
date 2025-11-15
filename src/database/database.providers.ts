import { Client } from 'cassandra-driver';
import { config } from '../config/config';

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
];
