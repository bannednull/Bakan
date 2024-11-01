import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    customerId: string;
  }

  interface Session {
    user: {
      id: string;
      customerId: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    customerId: string;
  }
}
