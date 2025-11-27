import { z } from 'zod';

const envSchema = z.object({
  DBHOST: z.string().default('localhost'),
  DBKEYSPACE: z.string().default('kurta'),
  DBUSER: z.string().default('cassandra'),
  DBPASSWORD: z.string().default('cassandra'),
  DBDATACENTER: z.string().default('datacenter1'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(6379),
  SECRET_KEY: z.string().default('my-secret-key-change-in-production'),
  DATABASE_URL: z
    .string()
    .default('postgresql://kurta:kurta@localhost:5432/kurta?schema=public'),
});

export type Config = z.infer<typeof envSchema>;

export const config = envSchema.parse(process.env);
