import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // If token is present in cookies, then we wiil verify it
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRETY_KEY!,
    ) as jwt.JwtPayload;

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: 'Invalid JWT token',
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {}
};
