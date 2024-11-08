import FormSignUp from '@/app/(auth)/register/_components/form-signup';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

function SignUpPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Register now</h1>
      <FormSignUp />
    </>
  );
}

export default SignUpPage;
