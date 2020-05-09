import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth-strategies/google.strategy';
import { VkontakteStrategy } from './auth-strategies/vkontakte.strategy';
import { JwtStrategy } from './auth-strategies/jwt.strategy';
import { authMiddleware } from './auth.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES'), },
      }),
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthGateway,
    GoogleStrategy,
    VkontakteStrategy,
    JwtStrategy,
  ],
  controllers: [
    AuthController,
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .forRoutes('\/auth\/[^\/]+$');
  }
}
