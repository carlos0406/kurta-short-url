import Redis from 'ioredis';

export interface IIdGeneratorService {
  generate(): Promise<string>;
}

export class IdGeneratorService implements IIdGeneratorService {
  constructor(private readonly redisClient: Redis) {}

  async generate(): Promise<string> {
    const id = await this.redisClient.incr('shorturl:id');
    return id.toString();
  }
}
