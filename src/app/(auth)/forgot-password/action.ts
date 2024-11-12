'use server';

import { forgotSchema } from '@/app/(auth)/forgot-password/validate';
import { actionClient } from '@/lib/safe-action';

export const forgotAction = actionClient
  .metadata({ name: 'ForgotPassword' })
  .schema(forgotSchema)
  .action(async ({ parsedInput: { email } }) => {
    console.log(email);

    return {
      error: 'forgot password error',
    };
  });
