import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ShorturlModule } from './shorturl/shorturl.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import auth from 'src/auth/auth';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    ShorturlModule,
    RedisModule,
    AuthModule.forRoot({
      auth,
      disableGlobalAuthGuard: false,
      bodyParser: false,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
