import NextAuth, { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './prisma';
import { compare } from 'bcryptjs';

const credentialsSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentialsSchema.parse(credentials);
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error('User not found');

        const isPasswordCorrect = await compare(password, user.password || '');
        if (!isPasswordCorrect) throw new Error('Incorrect password');

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        token.id = user.id as string;
      }

      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      session.user.id = token.sub as string;
      return session;
    },
    authorized: async ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      return isLoggedIn || !isOnDashboard;
    },
  },
});
