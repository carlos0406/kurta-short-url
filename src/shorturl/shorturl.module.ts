import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { shortUrlProviders } from './shorturl.providers';
import { ShortUrlController } from './presentation/shorturl.controller';
import { RedisModule } from 'src/redis/redis.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [DatabaseModule, RedisModule, ConfigModule],
  providers: [...shortUrlProviders],
  controllers: [ShortUrlController],
})
export class ShorturlModule {}
