import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { hashPassword } from '../utils/hash';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/* Signup */

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body; // we have zod-validation on client side

    let user = await User.findOne({ email });

    // If user already exists
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Verification token

    await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send verification code
    // await sendVerificationEmail(email, verificationToken);

    // Send info to client/frontend
    const userWithoutPassword = await User.findOne({ email }).select(
      '-password',
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to Signup' });
  }
};

/* Signin */

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }

    user.lastLogin = new Date();
    await user.save();

    // Send info to client/frontend
    const userWithoutPassword = await User.findOne({ email }).select(
      '-password',
    );

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

/* Verify Email 
    When user 1st signs up, frontend sends a code to the email which should be equal to verificationToken stored in the database
    Expiry of token should be greater than current time
*/

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select('-password');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }
    // If verification code matched
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email
    // await sendWelcomeEmail(user.email, user.fullname);
    return res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/* Logout */

export const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie('token').status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/* Forgot Password */

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const resetToken = crypto.randomBytes(40).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 1000 * 60 * 60); // 1hr
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send reset password email link
    // await sendPasswordResetEmail(user.email. `${process.env.CLIENT_URL}/resetpassword/${token}`);

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/* Reset Password */

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }
    // update password
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();
    // send success reset email
    // await sendResetSuccessEmail(user.email)
    return res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/* Check Auth */

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findOne(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      success: false,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
