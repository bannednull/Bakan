import { type DefaultSession } from 'next-auth';

type Role = 'admin' | 'user';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    customerId: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      customerId: string;
      role: Role;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    customerId: string;
    role: Role;
  }
}
