import { Request, Response } from 'express';

export function authMiddleware(req: Request, res: Response, next: Function) {
  if (req.query.socketId) req.session.socketId = req.query.socketId;
  next();
}
