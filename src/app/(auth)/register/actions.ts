'use server';

import { actionClient } from '@/lib/safe-action';
import { signupSchema } from './validate';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';

export const registerAction = actionClient
  .metadata({ name: 'register' })
  .schema(signupSchema)
  .action(async ({ parsedInput: { email, password, repeatPassword } }) => {
    if (password !== repeatPassword) {
      return { error: 'Passwords do not match' };
    }

    const passwordHash = await hash(password, 10);

    try {
      await prisma.user.create({
        data: {
          email,
          password: passwordHash,
        },
      });

      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return { error: 'This email is already registered' };
      }
      return { error: 'An error occurred during registration' };
    }
  });
