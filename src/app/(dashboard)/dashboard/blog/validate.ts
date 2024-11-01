import { z } from 'zod';

export type Blog = {
  id: number;
  title: string;
  content: string;
  userId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean(),
});
