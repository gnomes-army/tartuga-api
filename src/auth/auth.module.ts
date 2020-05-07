import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SessionAuthMiddleware } from './session-auth.middleware';
import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthGateway, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionAuthMiddleware)
      .forRoutes('\/auth\/[^\/]+$');
  }
}
