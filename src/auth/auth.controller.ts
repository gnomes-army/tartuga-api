import { Controller, Get, Req, HttpCode, UseGuards, Session } from '@nestjs/common';
import { Request } from 'express';
import { AuthGateway } from './auth.gateway';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authGateway: AuthGateway) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  public google() { }

  @UseGuards(AuthGuard('vk'))
  @Get('vk')
  public vk() { }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  @HttpCode(204)
  public googleCallback(
    @Session() session: { socketId?: string },
  ) {
    this.authGateway.server.in(session.socketId).emit('auth', { jwt: 'aaa.bbb.ccc' });
  }

  @UseGuards(AuthGuard('vk'))
  @Get('vk/callback')
  @HttpCode(204)
  public vkCallback(
    @Session() session: { socketId?: string },
  ) {
    this.authGateway.server.in(session.socketId).emit('auth', { jwt: 'aaa.bbb.ccc' });
  }
}
