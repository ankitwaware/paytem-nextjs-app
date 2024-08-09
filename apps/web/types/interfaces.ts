import type { DefaultSession, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export interface CustomSession extends Session {
  user: {
    /** The user's postal address. */
    uid: string;
    jwtToken: string;
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * you need to add them back into the newly declared interface.
     */
  } & DefaultSession["user"];
}

export interface Token extends JWT {
  uid: string;
  jwtToken: string;
}

export interface AuthUser extends User {
  uid: string;
  jwtToken: string;
}