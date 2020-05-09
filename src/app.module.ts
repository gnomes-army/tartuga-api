import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule, NestSessionOptions } from 'nestjs-session';
import * as redis from 'redis';
import * as expressSession from 'express-session';
import * as connectRedis from 'connect-redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    SessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<NestSessionOptions> => {
        const RedisStore = connectRedis(expressSession);
        const redisClient = redis.createClient({
          url: configService.get<string>('REDIS_URL'),
        });
        return {
          session: {
            store: new RedisStore({
              client: redisClient,
            }),
            secret: configService.get<string>('SESSION_SECRET'),
            resave: true,
            saveUninitialized: true,
          },
        };
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
