import 'server-only';

import { env } from '@/lib/env';
import { createOpenAI } from '@ai-sdk/openai';

export const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});
