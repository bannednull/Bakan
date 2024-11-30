'use server';

import { resetPasswordSchema } from '@/app/(auth)/reset-password/validate';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import { hash } from 'bcryptjs';
import { decode } from 'next-auth/jwt';

export const actionResetPassword = actionClient
  .metadata({ name: 'reset-password' })
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { token, password } }) => {
    try {
      const tokenData = await decode({
        secret: process.env.AUTH_SECRET!,
        token,
        salt: '_token_',
      });

      if (!tokenData) {
        throw new Error('Token not found');
      }

      const user = await prisma.user.findUnique({
        where: {
          email: tokenData.email!,
        },
        omit: {
          password: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const passwordHash = await hash(password, 10);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: passwordHash,
        },
      });

      return { success: true };
    } catch {
      return { error: '' };
    }
  });
