import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SessionAuthMiddleware } from './session-auth.middleware';
import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';
import { GoogleStrategy } from './strategies/google.strategy';
import { VkStrategy } from './strategies/vk.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
  ],
  providers: [
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
      .apply(SessionAuthMiddleware)
      .forRoutes('\/auth\/[^\/]+$');
  }
}
