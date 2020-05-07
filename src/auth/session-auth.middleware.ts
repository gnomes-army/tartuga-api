import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SessionAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.query.socketId) {
      req.session.socketId = req.query.socketId;
    }
    next();
  }
}
