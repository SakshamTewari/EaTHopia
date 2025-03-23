import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../models/user.model';

export const generateJwtToken = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ userId: user._id }, process.env._KEY!, {
    expiresIn: '1d',
  });
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
