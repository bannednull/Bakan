import FormSignIn from '@/app/(auth)/login/_components/form-signin';
import LoginGoogle from '@/app/(auth)/login/_components/login-google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in',
};

function LoginPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Log in to your account</h1>
      <LoginGoogle />
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <FormSignIn />
    </>
  );
}

export default LoginPage;
