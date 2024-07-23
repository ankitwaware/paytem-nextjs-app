import nextAuth from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../../../lib/auth";

const handler = nextAuth(NEXT_AUTH_CONFIG);

export { handler as GET, handler as POST };
