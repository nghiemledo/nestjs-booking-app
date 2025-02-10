import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ResponseType from 'src/utils/responsetype.util';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json(new ResponseType('Token is required').error());
    return;
  }

  jwt.verify(token, 'secretkey123', (err, user) => {
    if (err) {
      return res.status(403).json(new ResponseType('Invalid token').error());
    }

    (req as any).user = user;
    next();
  });
};
