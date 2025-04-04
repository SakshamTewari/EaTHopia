import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extending Express Request to include 'id'
interface AuthenticatedRequest extends Request {
  id?: string;
}

export const isAuthenticated = async (
  req: AuthenticatedRequest,
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
