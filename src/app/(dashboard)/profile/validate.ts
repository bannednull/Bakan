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

export const avatarSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'The file must be an image in JPEG, PNG or WEBP format',
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: 'The file must not exceed 2 MB',
    }),
});
