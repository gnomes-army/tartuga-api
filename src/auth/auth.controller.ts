import { Controller, Get, Req, UseGuards, Session } from '@nestjs/common';
import { Request } from 'express';
import { AuthGateway } from './auth.gateway';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authGateway: AuthGateway) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  public google() { }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  public googleCallback(
    @Req() request: Request,
    @Session() session: { socketId?: string },
  ): string {
    this.authGateway.server.in(session.socketId).emit('google', { jwt: 'lol.kek.jwt-cheburek' });
    return '';
  }
}