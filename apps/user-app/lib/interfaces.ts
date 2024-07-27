import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface session extends Session {
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

export interface token extends JWT {
  uid: string;
  jwtToken: string;
}
