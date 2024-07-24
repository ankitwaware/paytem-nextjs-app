import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@repo/database/client";
import { genrateJWT } from "./genrateJWT";
import { session, token } from "./interfaces";

const client = new PrismaClient();

export const NEXT_AUTH_CONFIG = {
  providers: [
    credentialsProvider({
      name: "Credential",
      credentials: {
        username: {
          label: "username",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          // find user in Databse
          const userdb = await client.user.findFirst({
            where: {
              email: credentials.username,
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          });

          if (
            userdb &&
            userdb.password &&
            (await compare(credentials.password || "", userdb!.password))
          ) {
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

          // user not in db
          console.log("not in db");
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret3",
  callbacks: {
    jwt: async (params: any) => {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log("jwtCall", params);
      const newToken = params.token as token;
      if (params.user) {
        newToken.uid = params.user.id;
        newToken.jwtToken = params.user.token;
        
      }
      return newToken;
    },
    session: (params: any) => {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("sessCall", params);
      const newSession: session = params.session as session;
      if (newSession.user && params.token.uid && params.token.account) {
        newSession.user.id = params.token.uid;
        newSession.user.jwtToken = params.token.jwtToken;
        newSession.user.account.acc_id = params.token.acc_id;
        newSession.user.account.type = params.token.type;
      }
      console.log("session", newSession);
      return newSession;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;
