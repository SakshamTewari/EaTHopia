import { z } from 'zod';

export const userSignUpSchema = z.object({
  fullname: z.string().min(1, { message: 'Full Name is required' }),
  email: z.string().email({ message: 'Invalid Email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  contact: z
    .string()
    .min(10, { message: 'Contact must be at least 10 digits long' }),
});

export type SignUpInputState = z.infer<typeof userSignUpSchema>;

export const userSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type SignInInputState = z.infer<typeof userSignInSchema>;
