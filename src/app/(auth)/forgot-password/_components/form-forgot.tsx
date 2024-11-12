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
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { forgotSchema } from '@/app/(auth)/forgot-password/validate';
import { forgotAction } from '@/app/(auth)/forgot-password/action';
import { toast } from 'sonner';

function FormForgot() {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const { executeAsync } = useAction(forgotAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
      toast.success('Password reset link sent to your email');
      form.reset();
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => await executeAsync(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}

        <Button className="w-full" size="sm" type="submit">
          {form.formState.isSubmitting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
          Reset Password
        </Button>

        <p className="text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link className="text-blue-500 hover:text-blue-700" href="/login">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default FormForgot;
