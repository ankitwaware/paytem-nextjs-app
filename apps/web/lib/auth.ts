import type { NextAuthOptions, User } from "next-auth";
import prisma from "@repo/database/client";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { AuthUser, CustomSession, Token } from "../types/interfaces";
import  genrateJWT  from "./genrateJwt";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // ask for permission on every time
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }
    }),
    credentialsProvider({
      name: "Credential",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser> {
        try {
          // find user in Databse
          const userdb = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          });

          if (!userdb) return null;

          const correctPassword = await compare(
            credentials?.password || "",
            userdb.password,
          );

          if (!correctPassword) return null;

          // genrate new JWT
          const jwt = await genrateJWT({
            id: userdb.id,
          });

          return {
            id: String(userdb.id),
            uid: String(userdb.id),
            name: userdb.name,
            email: userdb.email,
            jwtToken: jwt,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret3",
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: User }) => {
      const newToken = token as Token;
      const userData = user as AuthUser;
      if (userData && userData.uid && userData.jwtToken) {
        newToken.uid = userData.uid;
        newToken.jwtToken = userData.jwtToken;
      }
      return newToken;
    },
    session: ({ session, token }) => {
      const newSession = session as CustomSession;
      const newToken = token as Token;
      if (newToken.uid && newToken.jwtToken) {
        newSession.user.uid = newToken.uid;
        newSession.user.jwtToken = newToken.jwtToken;
      }
      return newSession;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;

export default authOptions;
