import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { googleAuth, loginUser, registerUser } from "@/axios/auth";
import { AdapterUser } from "next-auth/adapters";
import { TGoogleProfile } from "@/types/auth-types";

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
            token: user.token,
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
            token: user.token,
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
        token.user = { ...user, token: findUser.token };
      }
      // console.log("jwt-token", token);
      // console.log("jwt-user", user);
      // console.log("jwt-account", account);
      // console.log("jwt-profile", profile);
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as AdapterUser;
      console.log("session", session);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("session-2");
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    newUser: "/auth/register",
  },
};
