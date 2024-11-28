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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { changePasswordSchema } from '@dashboard/profile/validate';
import { changePasswordAction } from '@dashboard/profile/actions';

function ChangePassword() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      repassword: '',
    },
  });

  const { executeAsync } = useAction(changePasswordAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
      form.reset();
      toast.success('Password changed successfully');
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => await executeAsync(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="****" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="****" />
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

export default ChangePassword;
