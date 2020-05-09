import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { UsersService } from '../users/users.service';

import { v5 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    return this.jwtService.sign({ ...user });
  }
}
