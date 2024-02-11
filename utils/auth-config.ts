import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth/next";
import { getProJobCountForCompany } from "utils/server/jobs";
import db from "db";

export const nextAuthConfig = {
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    verifyRequest: "/login/success",
    error: "/login", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    session: async ({ session, user }) => {
      const fullUser = await db.user.findUnique({
        where: { id: user.id },
        include: { Company: true },
      });
      session.user = fullUser as any;
      if (fullUser?.Company?.jobLimit) {
        const currentJobCount = await getProJobCountForCompany({
          companyId: fullUser.Company.id,
        });
        session.user.Company.jobsAvailable =
          fullUser?.Company?.jobLimit - currentJobCount;
      }
      return session;
    },
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: "info@wecodeni.com",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_ID,
      clientSecret: process.env.GITHUB_AUTH_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
};

export async function getUser() {
  const session = await getServerSession(nextAuthConfig);

  return session?.user;
}
