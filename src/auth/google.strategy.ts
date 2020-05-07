import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}/auth/google/callback`,
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
