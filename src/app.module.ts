import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ShorturlModule } from './shorturl/shorturl.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [DatabaseModule, ConfigModule, ShorturlModule, RedisModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
