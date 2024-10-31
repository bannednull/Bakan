'use server';

import { actionClient } from '@/lib/safe-action';
import { signinSchema } from './validate';

export const loginAction = actionClient
  .metadata({ name: 'login' })
  .schema(signinSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      console.log(username, password);
      return { success: true };
    } catch {
      return { error: 'Invalid credentials' };
    }
  });
