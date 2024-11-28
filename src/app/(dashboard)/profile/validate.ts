import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z.string().min(1),
    repassword: z.string().min(1),
  })
  .refine((data) => data.password === data.repassword, {
    message: 'Passwords do not match',
    path: ['repassword'],
  });
