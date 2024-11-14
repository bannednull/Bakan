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
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}

export default LoginGoogle;
