import NextAuth from "next-auth";
import { nextAuthConfig } from "utils/auth-config";

const handler = NextAuth(nextAuthConfig);
export { handler as GET, handler as POST };
