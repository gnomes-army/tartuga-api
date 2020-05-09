import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Profile } from 'passport';
import { sign } from 'jsonwebtoken';
import { v5 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async signIn(profile: Profile): Promise<string> {
    const id = uuid(`${profile.provider}-${profile.id}`, process.env.UUID_NAMESPACE);

    const user = await this.usersService.createOrUpdate({
      id,
      provider: profile.provider,
      familyName: profile.name.familyName,
      givenName: profile.name.givenName,
      photo: profile.photos[0]?.value,
    });

    return sign({ ...user }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
}
