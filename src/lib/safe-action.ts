import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { auth } from './auth';
import { headers } from 'next/headers';
import { ratelimit } from '@/lib/ratelimit';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
})
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Input -> ${JSON.stringify(clientInput)}`);
      console.log(`Result -> ${JSON.stringify(result.data)}`);
      console.log(`Metadata -> ${JSON.stringify(metadata)}`);

      return result;
    }

    return result;
  })
  .use(async ({ next, metadata }) => {
    const header = await headers();
    const ip = header.get('x-forwarded-for');
    const { success, remaining } = await ratelimit.limit(`${ip}-${metadata.name}`);

    if (!success) {
      throw new Error('Too many requests');
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    });
  });

export const actionWithAuth = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new Error('Session not found!');
  }

  const userId = session.user?.id;

  return next({ ctx: { userId } });
});
