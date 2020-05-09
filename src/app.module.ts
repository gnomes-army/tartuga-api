import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule, NestSessionOptions } from 'nestjs-session';
import * as redis from 'redis';
import * as expressSession from 'express-session';
import * as connectRedis from 'connect-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    SessionModule.forRootAsync({
      useFactory: async (): Promise<NestSessionOptions> => {
        const RedisStore = connectRedis(expressSession);
        const redisClient = redis.createClient({
          url: process.env.REDIS_URL,
        });

        return {
          session: {
            store: new RedisStore({
              client: redisClient,
            }),
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
          },
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
