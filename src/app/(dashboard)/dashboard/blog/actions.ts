'use server';

import { revalidatePath } from 'next/cache';
import { actionWithAuth } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { blogSchema } from '@dashboard/blog/validate';
import { z } from 'zod';

export const createBlogAction = actionWithAuth
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

export const updateBlogAction = actionWithAuth
  .metadata({ name: 'update_blog' })
  .schema(blogSchema)
  .action(async ({ parsedInput: { id, title, content, published }, ctx: { userId } }) => {
    if (!id) {
      return { error: 'No blog id found' };
    }

    try {
      await prisma.blog.update({
        where: {
          id: +id,
          userId: +userId,
        },
        data: {
          title,
          content,
          published,
        },
      });
      revalidatePath('/dashboard/blog');
      return { success: 'Blog updated successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'Something went wrong' };
    }
  });

export const deleteBlogAction = actionWithAuth
  .metadata({ name: 'delete_blog' })
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id }, ctx: { userId } }) => {
    try {
      await prisma.blog.delete({
        where: {
          id,
          userId: +userId,
        },
      });
      revalidatePath('/dashboard/blog');
      return { success: 'Blog deleted successfully' };
    } catch {
      return { error: 'Something went wrong' };
    }
  });
