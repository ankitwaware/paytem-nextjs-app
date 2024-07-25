import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface session extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    jwtToken: string;
    account: {
      acc_id: string;
      type: string;
    };
  };
}

export interface token extends JWT {
  uid: string;
  jwtToken: string;
  account: {
    acc_id: string;
    type: string;
  };
}
