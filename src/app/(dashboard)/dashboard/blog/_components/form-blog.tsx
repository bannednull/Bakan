'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { blogSchema } from '@dashboard/blog/validate';
import { createBlogAction, updateBlogAction } from '@dashboard/blog/actions';
import { DialogClose } from '@/components/ui/dialog';
import { blogStore } from '@/lib/store/blog';
import { useShallow } from 'zustand/shallow';

function FormBlog({ close }: { close?: (open: boolean) => void }) {
  const { isEdit, blog } = blogStore(
    useShallow((state) => ({ isEdit: state.isEdit, blog: state.blog })),
  );

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: isEdit
      ? {
          id: blog?.id.toString(),
          title: blog?.title,
          content: blog?.content,
          published: blog?.published,
        }
      : {
          title: '',
          content: '',
          published: false,
        },
  });

  const { executeAsync } = useAction(isEdit ? updateBlogAction : createBlogAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
      close?.(false);
      toast.success(`Blog post ${isEdit ? 'updated' : 'created'} successfully`);
    },
  });

  const onSubmit = async (data: z.infer<typeof blogSchema>) => await executeAsync(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {isEdit && <input type="hidden" {...form.register('id')} />}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} type="string" placeholder="Title of the post" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="mt-2">Published</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}

        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button size="sm" type="submit">
            {form.formState.isSubmitting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
            {isEdit ? 'Update' : 'Create'} Post
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormBlog;
