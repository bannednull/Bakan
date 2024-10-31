'use server';

import { actionClient } from '@/lib/safe-action';
import { signupSchema } from './validate';

export const registerAction = actionClient
  .metadata({ name: 'register' })
  .schema(signupSchema)
  .action(async ({ parsedInput: { email, password, repeatPassword } }) => {
    if (password !== repeatPassword) {
      return { error: 'Passwords do not match' };
    }
    try {
      console.log(email, password, repeatPassword);
      return { success: true };
    } catch {
      return { error: 'An error occurred during registration' };
    }
  });
