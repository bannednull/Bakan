'use server';

import { revalidatePath } from 'next/cache';
import { actionWithAuth } from '@/lib/safe-action';
import prisma from '@/lib/prisma';
import { blogSchema } from '@dashboard/blogs/validate';
import { z } from 'zod';
import { Parser } from 'json2csv';

export const createAction = actionWithAuth
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

export const updateAction = actionWithAuth
  .metadata({ name: 'update_blog' })
  .schema(blogSchema)
  .action(async ({ parsedInput: { id, title, content, published }, ctx: { userId } }) => {
    if (!id) {
      return { error: 'No blog id found' };
    }

    try {
      const result = await prisma.blog.updateMany({
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

      if (result.count === 0) {
        return { error: 'No blog found to update' };
      }

      revalidatePath('/dashboard/blog');
      return { success: 'Blog updated successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'Something went wrong' };
    }
  });

export const deleteAction = actionWithAuth
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

export const exportDataAction = actionWithAuth
  .metadata({ name: 'export_data_csv' })
  .action(async ({ ctx: { userId } }) => {
    try {
      const data = await prisma.blog.findMany({
        where: {
          userId: +userId,
        },
      });

      const fields = ['title', 'content', 'published', 'createdAt'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      return { success: true, csv };
    } catch {
      return { success: false, error: 'Failed to export CSV' };
    }
  });
