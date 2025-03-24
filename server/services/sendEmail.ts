import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from './emailTemplate';
import { client, sender } from './mailtrap';

/* Verification Email */

export const sendVerificationEmail = async (
  email: string,
  verificationCode: string,
) => {
  const recipient = [
    {
      email,
    },
  ];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'EaTHopia: Verify your email',
      html: htmlContent.replace('{verificaionCode}', verificationCode),
      category: 'Email Verification',
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send email verification code');
  }
};

/* Welcome Email */

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [
    {
      email,
    },
  ];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'Welcome to EaTHopia',
      html: htmlContent,
      template_variables: {
        company_info_name: 'EaTHopia',
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send welcome email');
  }
};

/* Password Reset Email */

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string,
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'EaTHopia: Reset your password',
      html: htmlContent,
      category: 'Reset Password',
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to reset password');
  }
};

/* Reset Success Email */

export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'EaTHopia: Password reset successful ',
      html: htmlContent,
      category: 'Reset Password',
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send reset password success email');
  }
};
