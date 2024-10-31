import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

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
}).use(async ({ next, clientInput, metadata }) => {
  const result = await next({ ctx: {} });

  if (process.env.NODE_ENV === 'development') {
    console.log(`Input -> ${JSON.stringify(clientInput)}`);
    console.log(`Result -> ${JSON.stringify(result.data)}`);
    console.log(`Metadata -> ${JSON.stringify(metadata)}`);

    return result;
  }

  return result;
});