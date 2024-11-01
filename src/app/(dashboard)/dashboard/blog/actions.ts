'use server';

import { actionWithAuth } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { blogSchema } from './validate';

export const blogAction = actionWithAuth
  .metadata({ name: 'create_blog' })
  .schema(blogSchema)
  .action(async ({ parsedInput: { title, content, published }, ctx: { userId } }) => {
    try {
      await prisma.blog.create({
        data: {
          title,
          content,
          published,
          userId: +userId,
        },
      });
      revalidatePath('/dashboard/blog');
      return { success: 'Blog created successfully' };
    } catch {
      return { error: 'Something went wrong' };
    }
  });
