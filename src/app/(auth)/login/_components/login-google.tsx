import Google from '@/components/brands/google';
import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

function LoginGoogle() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <Button className="w-full" size="sm" type="submit" variant="outline">
        <Google className="size-6" /> Sign in with Google
      </Button>
    </form>
  );
}

export default LoginGoogle;
