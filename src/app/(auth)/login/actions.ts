'use server';

import { actionClient } from '@/lib/safe-action';
import { signinSchema } from './validate';
import { signIn } from '@/lib/auth';

export const loginAction = actionClient
  .metadata({ name: 'login' })
  .schema(signinSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await signIn('credentials', {
        redirect: false,
        ...{ email, password },
      });
      return { success: true };
    } catch {
      return { error: 'Invalid credentials' };
    }
  });
