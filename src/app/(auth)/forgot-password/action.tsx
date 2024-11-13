'use server';

import ForgotPassword from '@/app/(auth)/forgot-password/_components/email-forgot';
import { forgotSchema } from '@/app/(auth)/forgot-password/validate';
import { env } from '@/lib/env';
import { transporter } from '@/lib/nodemailer';
import { prisma } from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import { render } from '@react-email/components';
import { encode } from 'next-auth/jwt';

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

    const emailHtml = await render(<ForgotPassword token={tokenEmail} />);

    //TODO: send email
    await transporter.sendMail({
      from: '"Reset your password" <bakanpro@zohomail.com>',
      to: user.email!,
      subject: 'Reset your password',
      html: emailHtml,
    });
  });
