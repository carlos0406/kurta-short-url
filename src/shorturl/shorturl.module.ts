import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { shortUrlProviders } from './shorturl.providers';
import { ShortUrlController } from './presentation/shorturl.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [...shortUrlProviders],
  controllers: [ShortUrlController],
})
export class ShorturlModule {}
