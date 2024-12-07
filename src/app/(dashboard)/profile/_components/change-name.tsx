'use client';

import { useForm } from 'react-hook-form';
import { accountSchema } from '@dashboard/profile/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { changeNameAction } from '@dashboard/profile/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

function ChangeName() {
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
    },
  });

  const { executeAsync } = useAction(changeNameAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: 'An error occurred' });
        return;
      }
      form.reset();
      toast.success('Name changed successfully');
    },
  });

  const onSubmit = async (data: z.infer<typeof accountSchema>) => await executeAsync(data);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User name</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="user name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}

        <Button size="sm" type="submit">
          {form.formState.isSubmitting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  );
}

export default ChangeName;
