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
      authorization: {
        params: { prompt: "select_account" },
      },
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
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (user && account?.provider === "google" && profile?.email) {
        const profileUser = profile as TGoogleProfile;
        const payload = {
          email: profile.email,
          firstName: profileUser.given_name,
          lastName: profileUser.family_name,
          image: profileUser.picture,
        };
        const findUser = await googleAuth(payload);
        token.user = {
          ...user,
          name: profileUser.given_name,
          accessToken: findUser.accessToken,
          refreshToken: findUser.refreshToken,
        };
      }

      if (
        trigger === "update" &&
        session?.accessToken &&
        session?.refreshToken
      ) {
        const updateToken = {
          accessToken: session?.accessToken,
          refreshToken: session?.refreshToken,
        };
        token.user = { ...user, ...updateToken };
      }

      return token;
    },
    async session({ session, token, trigger, newSession }) {
      session.user = token.user as AdapterUser;
      const tokenAuth = token.user as UserInterface;

      if (!tokenAuth.refreshToken || !tokenAuth.accessToken) {
        session.user = undefined;
        return session;
      }

      const decodedTokenAs = decodeJwtToken(tokenAuth.accessToken);
      const decodedTokenRf = decodeJwtToken(tokenAuth.refreshToken);

      const currTime = new Date().getTime();
      const currExpAs = decodedTokenAs?.exp
        ? decodedTokenAs.exp * 1000
        : (session.user = undefined);
      const currExpRf = decodedTokenRf?.exp
        ? decodedTokenRf.exp * 1000
        : (session.user = undefined);

      console.log(
        "Left access:",
        currExpAs &&
          Math.floor((currExpAs - currTime) / 60)
            .toString()
            .slice(0, 2) + "m",
      );
      console.log(
        "Left refresh:",
        currExpRf &&
          Math.floor((currExpRf - currTime) / 60)
            .toString()
            .slice(0, 2) + "m",
      );

      if (currExpRf && currTime > currExpRf) {
        session.user = undefined;
        return session;
      }

      if (currExpAs && currTime > currExpAs - 1000) {
        const clearToken = { accessToken: null };
        session.user = { ...session.user, ...clearToken };
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
