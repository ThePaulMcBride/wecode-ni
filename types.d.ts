import { Company } from "@prisma/client";

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      admin: boolean;
      image?: string;
      email: string;
      name: string;
      Company?: Company & {
        jobsAvailable: number;
      };
    };
  }
}
