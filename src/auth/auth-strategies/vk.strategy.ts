import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-vkontakte';

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vk') {
  constructor() {
    super({
      clientID: process.env.VK_APP_ID,
      clientSecret: process.env.VK_SECURE_KEY,
      callbackURL: `${process.env.GATEWAY}/auth/vk/callback`,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    done(null, { jwt: 'aaa.bbb.ccc' });
  }
}
