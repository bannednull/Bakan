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
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { signupSchema } from '../validate';
import { registerAction } from '../actions';

function FormSignUp() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const { executeAsync } = useAction(registerAction, {
    onSuccess({ data }) {
      if (data && 'error' in data) {
        form.setError('root', { message: data.error });
        return;
      }
      toast.success('Sign up successful');
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => await executeAsync(data);

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
          name="repeatPassword"
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

        <Button className="w-full" size="sm" type="submit">
          {form.formState.isSubmitting && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
          Sign Up
        </Button>

        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link className="text-blue-500 hover:text-blue-700" href="/login">
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default FormSignUp;
