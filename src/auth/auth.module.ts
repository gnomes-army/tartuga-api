import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './auth-strategies/google.strategy';
import { VkStrategy } from './auth-strategies/vk.strategy';
import { authMiddleware } from './auth.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthGateway,
    GoogleStrategy,
    VkStrategy,
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
