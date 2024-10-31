'use server';

import { actionClient } from '@/lib/safe-action';
import { signinSchema } from './validate';

export const loginAction = actionClient
  .metadata({ name: 'login' })
  .schema(signinSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      console.log(email, password);
      return { success: true };
    } catch {
      return { error: 'Invalid credentials' };
    }
  });
