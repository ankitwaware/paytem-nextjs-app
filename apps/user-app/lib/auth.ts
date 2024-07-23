import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@repo/database/client";

const client = new PrismaClient();

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { importJWK, JWTPayload, SignJWT } from "jose";

export interface session extends Session {
  user: {
    id: string;
    jwtToken: string;
    email: string;
    name: string;
    type?: string;
  };
}

export interface token extends JWT {
  uid: string;
  jwtToken: string;
}

export const genrateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

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
          console.log("crede", credentials);
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
            // valid user

            // genrate new JWT
            const jwt = await genrateJWT({
              id: userdb.id,
            });

            // TODO  add Account and Session in DB

            return {
              id: userdb.id,
              name: userdb.name,
              email: userdb.email,
              token: jwt,
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
    jwt: async ({ token, user }: any) => {
      // Persist the OAuth access_token and or the user id to the token right after signin
      const newToken = token as token;
      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = user.token;
      }
      console.log("jwt", newToken);
      return newToken;
    },
    session: ({ session, token }: any) => {
      // Send properties to the client, like an access_token and user id from a provider.
      const newSession: session = session as session;
      if (newSession.user && token.uid) {
        newSession.user.id = token.uid;
        newSession.user.jwtToken = token.jwtToken;
      }
      console.log("session", newSession);
      return newSession;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;
