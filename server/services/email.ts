import { client, sender } from '../services/mailtrap';

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
      // html: html content
      category: 'Email Verification',
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send email verification code');
  }
};
