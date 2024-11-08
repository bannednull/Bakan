import FormSignIn from '@/app/(auth)/login/_components/form-signin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in',
};

function LoginPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Log in to your account</h1>
      <FormSignIn />
    </>
  );
}

export default LoginPage;
