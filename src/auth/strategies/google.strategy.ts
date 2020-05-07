import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const { NODE_ENV, SCHEME, HOST, PORT } = process.env;

    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${SCHEME}://${HOST}:${NODE_ENV === 'production' ? 443 : PORT}/auth/google/callback`,
      scope: 'email profile',
    }, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      if (!profile) {
        done(new BadRequestException(), null);
      }

      const name = profile.name;
      const email = profile.emails[0].value;

      done(undefined, { name, email });
    });
  }
}
