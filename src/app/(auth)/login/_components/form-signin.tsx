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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoaderCircle } from 'lucide-react';
import { signinSchema } from '../validate';
import { loginAction } from '../actions';
import Link from 'next/link';

function FormSignIn() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const { executeAsync } = useAction(loginAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
      router.push('/dashboard');
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => await executeAsync(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
              </div>
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

        <Button className="w-full" size="sm" type="submit">
          {form.formState.isSubmitting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
          Sign in
        </Button>

        <p className="text-sm text-muted-foreground">
          No account?{' '}
          <Link className="text-blue-500 hover:text-blue-700" href="/register">
            Sign Up Now
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default FormSignIn;
