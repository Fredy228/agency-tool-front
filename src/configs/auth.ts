import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import {
  googleAuth,
  loginUser,
  refreshToken,
  registerUser,
} from "@/axios/auth";
import { AdapterUser } from "next-auth/adapters";
import { TGoogleProfile } from "@/types/auth-types";
import { decodeJwtToken } from "@/services/jwtToken";
import { UserInterface } from "@/interfaces/user";
import axios from "axios";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
        name: { label: "name", type: "text", placeholder: "Enter your name" },
        type: {
          label: "type",
          type: "text",
          required: true,
          placeholder: "Enter: login or register",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!["register", "login"].includes(credentials?.type)) return null;
        let user = null;

        if (credentials.type === "login") {
          user = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: String(user.id),
            name: user.firstName,
            email: user.email,
            image: user.image,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          } as User;
        }

        if (credentials.type === "register") {
          user = await registerUser({
            email: credentials.email,
            password: credentials.password,
            firstName: credentials.name,
          });

          return {
            id: String(user.id),
            name: user.firstName,
            email: user.email,
            image: user.image,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          } as User;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }

      if (user && account?.provider === "google" && profile?.email) {
        const profileUser = profile as TGoogleProfile;
        const payload = {
          email: profile.email,
          firstName: profileUser.given_name,
          lastName: profileUser.family_name,
        };
        const findUser = await googleAuth(payload);
        token.user = {
          ...user,
          accessToken: findUser.accessToken,
          refreshToken: findUser.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as AdapterUser;
      const tokenAuth = token.user as UserInterface;
      console.log("session-1", session);

      if (!tokenAuth.refreshToken || !tokenAuth.accessToken) {
        session.user = undefined;
        return session;
      }

      const decodedToken = decodeJwtToken(tokenAuth.accessToken);
      console.log("decode", decodedToken);

      const currTime = new Date().getTime();
      const currExp = decodedToken?.exp
        ? decodedToken.exp * 1000
        : (session.user = undefined);

      console.log(
        "Left minutes",
        currExp && Math.floor((currExp - currTime) / 60),
      );

      if (currExp && currTime > currExp - 1000) {
        try {
          const tokens = await refreshToken(tokenAuth.refreshToken);
          session.user = { ...session.user, ...tokens };
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            session.user = undefined;
            return session;
          }
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    newUser: "/auth/register",
  },
};
