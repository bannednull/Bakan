import { auth } from '@/lib/auth';
import { openai } from '@/lib/ia';
import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { ratelimit } from '@/lib/ratelimit';

export const maxDuration = 30;

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = req.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(`${ip}-conversation`);

  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: `You are a professional content creation assistant. Your goal is to help users generate and optimize high-quality content for various platforms, including blogs, websites, and social media. For each interaction with the user, follow these guidelines:

      - Ask about the main topic, the content's objective, and the target audience.
      - Provide SEO-optimized titles and subtitles.
      - Generate content with an SEO focus, suggesting relevant keywords.
      - Provide detailed and contextualized descriptions for the content.
      - Use headers and tags to organize the content.
      - Be professional, clear, and concise. Adapt the conversation tone to the user's preferred level of formality while maintaining a collaborative and helpful approach.
    `,
    messages,
  });

  return result.toDataStreamResponse();
});
