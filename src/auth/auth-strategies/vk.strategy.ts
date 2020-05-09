import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-vkontakte';
import { AuthService } from '../auth.service';

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vk') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.VK_APP_ID,
      clientSecret: process.env.VK_SECURE_KEY,
      callbackURL: `${process.env.GATEWAY}/auth/vk/callback`,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    const jwt = await this.authService.signIn(profile);
    done(null, { jwt });
  }
}
