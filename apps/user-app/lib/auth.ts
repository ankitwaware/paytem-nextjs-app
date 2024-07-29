import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@repo/database/client";
import { genrateJWT } from "./genrateJWT";
import { session, token } from "./interfaces";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

const client = new PrismaClient();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
      async authorize(credentials): Promise<any> {
        try {
          console.log("auth.js ", credentials);

          // find user in Databse
          const userdb = await client.user.findFirst({
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

          const correctPassword = await compare(
            credentials?.password || "",
            userdb!.password,
          );

          if (!correctPassword) return null;

          if (userdb && correctPassword) {
            // genrate new JWT
            const jwt = await genrateJWT({
              id: userdb.id,
            });

            // TODO Add Session in DB

            return {
              uid: userdb.id,
              name: userdb.name,
              email: userdb.email,
              jwtToken: jwt
            };
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret3",
  callbacks: {
    async signIn() {
      // const { account, profile } = params;
      // console.log("sign in callback", params);
      // if (account!.provider === "google") {
      //   return (
      //     profile?.email_verified && profile.email.endsWith("@example.com")
      //   );
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt: async ({ token, user }: { token: JWT; user: any }) => {
      const newToken = token as token;
      // console.log("JWT callback params", token, user);
      if (user) {
        newToken.uid = user.uid;
        newToken.jwtToken = user.jwtToken;
      }
      // console.log("new JWT to user", newToken);
      return newToken;
    },
    session: ({ session, token }) => {
      const newSession = session as session;
      // console.log("session callback params", session, token, user);
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid as token["uid"];
        newSession.user.jwtToken = token.jwtToken as token["jwtToken"];
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

export default authOptions ;