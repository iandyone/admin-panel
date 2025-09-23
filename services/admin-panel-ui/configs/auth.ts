/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthConfig, NextAuthResult } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'

import { signInAction } from '@/actions';
import { EUserRoles, UserAuthData } from '@/types';


export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email', required: true },
        password: { label: 'Password', type: 'password', placeholder: 'password', required: true },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const accessToken = await signInAction(credentials.email as string, credentials.password as string)
          const user = jwtDecode<UserAuthData>(accessToken);


          return {
            id: user.id,
            email: user.email,
            role: user.role.toLowerCase(),
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            isNewUser: user.isNewUser,
            accessToken
          };

        } catch {
          return null
        }
      },
    })
  ],
  trustHost: true,
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.firstName = user.firstName;
        token.lastName = user.lastName
        token.isActive = user.isActive;
        token.isNewUser = user.isNewUser;
      }

      return token;
    },

    async session({ session, token }) {
      if (!session.user) session.user = {} as any;

      (session as any).accessToken = token.accessToken;
      (session as any).isNewUser = token.isNewUser;
      (session as any).accessToken = token.accessToken;

      session.user.id = token.userId as string;
      session.user.email = (token.email as string) || session.user.email;
      session.user.role = token.role as EUserRoles;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.isActive = token.isActive as boolean;

      return session;
    },
  },
}

const nextAuth = NextAuth(authConfig)

export const handlers: NextAuthResult['handlers'] = nextAuth.handlers;
export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;

