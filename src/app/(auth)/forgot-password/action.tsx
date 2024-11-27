'use server';

import ForgotPassword from '@/app/(auth)/forgot-password/_components/email-forgot';
import { forgotSchema } from '@/app/(auth)/forgot-password/validate';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import { encode } from 'next-auth/jwt';
import { Resend } from 'resend';

export const forgotAction = actionClient
  .metadata({ name: 'forgot_password' })
  .schema(forgotSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        error: 'This email is not registered',
      };
    }

    const tokenEmail = await encode({
      secret: env.AUTH_SECRET!,
      token: {
        email: user.email,
      },
      maxAge: 24 * 60 * 60, //24 hours
      salt: '_token_',
    });

    //TODO: send email
    const resend = new Resend(env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: user.email!,
      subject: 'Forgot Password',
      react: ForgotPassword({ token: tokenEmail }),
    });

    if (error) {
      return {
        error: error.message,
      };
    }

    console.log(data);
  });
