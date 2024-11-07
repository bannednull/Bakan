'use server';

import { prisma } from '@/lib/prisma';
import { actionWithAuth } from '@/lib/safe-action';
import { changePasswordSchema } from '@dashboard/profile/validate';
import { hash } from 'bcryptjs';

export const changePasswordAction = actionWithAuth
  .metadata({ name: 'change_password' })
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { password }, ctx: { userId } }) => {
    try {
      const passwordHash = await hash(password, 10);
      await prisma.user.update({
        where: {
          id: +userId,
        },
        data: {
          password: passwordHash,
        },
      });
      return { success: true };
    } catch {
      return { error: 'An error occurred during password change' };
    }
  });
