import { Controller, Get, Req, HttpCode, UseGuards, Session } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
  ) {}

  @Get('me')
  public me(
    @Req() req: Request
  ) {
    return req.user;
  }
}
