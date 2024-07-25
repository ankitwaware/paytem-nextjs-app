import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@repo/database/client";
import { genrateJWT } from "./genrateJWT";
import { session, token } from "./interfaces";
import GoogleProvider from "next-auth/providers/google";

const client = new PrismaClient();


export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    credentialsProvider({
      name: "Credential",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          // find user in Databse
          const userdb = await client.user.findFirst({
            where: {
              email: credentials.email,
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
            credentials.password || "",
            userdb!.password
          );

          if (!correctPassword) return null;

          if (userdb && correctPassword) {
            // genrate new JWT
            const jwt = await genrateJWT({
              id: userdb.id,
            });

            // TODO Add Session in DB
            const userAccount = await client.account.findFirst({
              where: {
                userId: userdb?.id,
                type: "basicUser",
              },
              select: {
                type: true,
                acc_id: true,
              },
            });

            return {
              id: userdb.id,
              name: userdb.name,
              email: userdb.email,
              token: jwt,
              account: { type: userAccount?.type, acc_id: userAccount?.acc_id },
            };
          }

          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret3",
  callbacks: {
    async signIn(params) {
      // const { account, profile } = params;
      console.log("sign in callback", params);
      // if (account!.provider === "google") {
      //   return (
      //     profile?.email_verified && profile.email.endsWith("@example.com")
      //   );
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt: async ({ token, user }) => {
      const newToken = token as token;
      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = user.token;
        newToken.account = user.account;
      }
      console.log("new JWT to user", newToken);
      return newToken;
    },
    session: ({ session, token }) => {
      const newSession: session = session as session;
      if (newSession.user && token.uid && token.account) {
        newSession.user.id = token.uid as string;
        newSession.user.jwtToken = token.jwtToken as string;
        newSession.user.account = token.account as session["user"]["account"];
      }
      // TODO ADD USER SESSION IN DB
      console.log("new session to user", session);
      return newSession;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;
