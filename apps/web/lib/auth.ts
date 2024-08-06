import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@repo/database";
import { genrateJWT } from "./functions/genrateJwt";
import { session, token } from "../types/interfaces";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

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
      //  todo add credentials type
      async authorize(credentials): Promise<any> {
        try {
          console.log("auth.js ", credentials);

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

            return {
              uid: userdb.id,
              name: userdb.name,
              email: userdb.email,
              jwtToken: jwt,
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
    jwt: async ({ token, user }: { token: JWT; user: any }) => {
      const newToken = token as token;
      if (user) {
        newToken.uid = user.uid;
        newToken.jwtToken = user.jwtToken;
      }
      return newToken;
    },
    session: ({ session, token }) => {
      const newSession = session as session;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid as token["uid"];
        newSession.user.jwtToken = token.jwtToken as token["jwtToken"];
      }
      return newSession;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;

export default authOptions;
