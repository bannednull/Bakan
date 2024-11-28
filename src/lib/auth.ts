import NextAuth, { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const credentialsSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
          customerId: user.customerId || '',
          role: user.role,
        };
      },
    }),
    Google,
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
        token.customerId = user.customerId;
        token.role = user.role;
      }

      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      session.user.id = token.sub as string;
      session.user.customerId = token.customerId;
      session.user.role = token.role;
      return session;
    },
    authorized: async ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const protected_routes = ['/dashboard', '/profile', '/blogs', '/chat'];
      const isOnDashboard = protected_routes.includes(request.nextUrl.pathname);
      return isLoggedIn || !isOnDashboard;
    },
  },
});
