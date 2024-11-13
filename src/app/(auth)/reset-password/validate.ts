import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(1),
    repeatPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });
