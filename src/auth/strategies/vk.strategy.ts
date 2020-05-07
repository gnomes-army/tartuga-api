import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-vkontakte';

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const { NODE_ENV, SCHEME, HOST, PORT } = process.env;

    super({
      clientID: process.env.VK_APP_ID,
      clientSecret: process.env.VK_SECURE_KEY,
      callbackURL: `${SCHEME}://${HOST}:${NODE_ENV === 'production' ? 443 : PORT}/auth/vk/callback`,
      scope: 'email profile',
    }, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      if (!profile) {
        done(new BadRequestException(), null);
      }

      const name = profile.name;
      // const email = profile.email;

      done(undefined, { name });
    });
  }
}
