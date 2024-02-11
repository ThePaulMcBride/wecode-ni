// Required to prevent a build error on Vercel
import "ts-tiny-invariant";
import Stripe from "stripe";
import addDays from "date-fns/addDays";
import endOfDay from "date-fns/endOfDay";
import { getServerSession } from "next-auth/next";
import { nextAuthConfig } from "utils/auth-config";
import { ApolloClient } from "apollo-client";
import {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} from "apollo-server-micro";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import {
  getStats,
  getLiveJobs,
  getRepostableJobs,
  getRecentlyDeletedJobs,
  getJob,
  getJobsForCompany,
  createJobSlug,
  createOrUpdateDraftJob,
  createOrUpdateJob,
  getDraftJob,
  repostJob,
  deleteJob,
  getProJobCountForCompany,
  FormattedJob,
} from "utils/server/jobs";
import validateJob from "utils/server/validate-job";
import getAbsoluteUrl from "utils/absolute-url";
import siteConfig from "config";
import sanatizeJob from "utils/server/sanatize-job";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

const typeDefs = gql`
  type User {
    name: String
    email: String!
    admin: Boolean
    company: Company
  }
  type Company {
    id: Int!
    name: String
    subscriptionStatus: String
    jobLimit: Int
    jobsAvailable: Int
  }
  type Job {
    id: Int!
    applyUrl: String!
    applyUrlIsEmail: Boolean!
    title: String!
    tags: [String]
    employmentType: [String!]
    companyTitle: String!
    companyUrl: String!
    createdAt: String!
    publishedAt: String
    deletedAt: String
    description: String!
    logoUrl: String
    expires: String!
    howToApply: String!
    location: String!
    salary: String
    salaryData: SalaryData
    shortDescription: String!
    slug: String!
    adminEmail: String
  }
  type DraftJob {
    applyUrl: String!
    applyUrlIsEmail: Boolean!
    title: String!
    tags: [String]
    employmentType: [String!]
    companyTitle: String!
    companyUrl: String!
    description: String!
    logoUrl: String
    howToApply: String!
    location: String!
    salary: String
    salaryData: SalaryData
    shortDescription: String!
    id: Int!
    adminEmail: String
  }
  type CheckoutSession {
    id: String!
    object: String!
    cancel_url: String!
    client_reference_id: String!
    customer_email: String
    livemode: Boolean!
    payment_intent: String!
    payment_method_types: [String]!
    success_url: String!
  }
  type Stats {
    totalJobs: Int!
    liveJobs: Int!
    totalCompanies: Int!
  }
  type SalaryData {
    currency: String
    value: String
    max: String
  }
  input SalaryDataInput {
    currency: String
    value: String
    max: String
  }
  input CreateJobInput {
    title: String!
    salary: String
    salaryData: SalaryDataInput
    location: String!
    tags: [String!]
    employmentType: [String!]
    description: String!
    applyUrl: String!
    howToApply: String!
    companyTitle: String!
    companyUrl: String!
  }
  type Query {
    getCurrentUser: User!
    getJobs(search: String, status: String): [Job]
    getJob(slug: String!): Job
    getJobsForCompany: [Job]!
    getDraftJob(id: Int!): DraftJob
    getStats: Stats
  }
  type Mutation {
    createOrUpdateDraftJob(id: Int, job: CreateJobInput): DraftJob!
    createCheckoutSession(draftJobId: Int!): CheckoutSession
    createOrUpdateJob(slug: String, job: CreateJobInput): Job
    createProJob(job: CreateJobInput): Job
    repostJob(slug: String!): Job
    deleteJob(slug: String!): Job
  }
`;

const resolvers = {
  Query: {
    async getCurrentUser(_obj, _args, context) {
      return await context?.getCurrentUser();
    },
    async getJobs(_obj, { search, status }, context) {
      const user = await context?.getCurrentUser();
      const admin = user?.admin || false;

      if (status === "expired") {
        if (!admin) throw new AuthenticationError("Not Authorized");
        const jobs = await getRepostableJobs();
        return jobs.map((job) => sanatizeJob({ job, isAdmin: admin }));
      }

      if (status === "deleted") {
        if (!admin) throw new AuthenticationError("Not Authorized");
        const jobs = await getRecentlyDeletedJobs({ cutoffDays: 60 });
        return jobs.map((job) => sanatizeJob({ job, isAdmin: admin }));
      }

      const jobs = await getLiveJobs({ search });
      const sanatizedJobs = jobs.map((job) =>
        sanatizeJob({ job, isAdmin: admin })
      );
      return sanatizedJobs;
    },
    async getJob(_obj, { slug }, context) {
      const user = await context?.getCurrentUser();
      const admin = user?.admin || false;
      const job = await getJob({ slug, admin });
      if (!job) return undefined;
      return sanatizeJob({ job, isAdmin: admin });
    },
    async getJobsForCompany(_obj, { userId }, context) {
      const user = await context.getCurrentUser();
      if ((!user?.admin && userId) || !user) {
        throw new AuthenticationError("Not Authorized");
      }

      const id = user.Company.id;

      const jobs = await getJobsForCompany({ id });
      return jobs.map((job) => sanatizeJob({ job, isAdmin: user.admin }));
    },
    async getDraftJob(_obj, { id }) {
      return await getDraftJob({ id });
    },
    async getStats(_obj, _args, context) {
      const user = await context?.getCurrentUser();
      const admin = user?.admin || false;
      if (!admin) throw new AuthenticationError("Not Authorized");
      const stats = await getStats();

      return stats;
    },
  },
  Mutation: {
    async createOrUpdateDraftJob(_obj, { id, job }, context) {
      const { value, errors } = validateJob(job);

      if (errors) {
        throw new UserInputError(
          "Failed to create draft job due to validation errors",
          { validationErrors: errors }
        );
      }

      const validatedJob = value;
      const user = await context.getCurrentUser();

      try {
        const res = await createOrUpdateDraftJob({
          id,
          job: { ...validatedJob },
          companyId: user.companyId,
        });

        return sanatizeJob({ job: res, isAdmin: user.admin });
      } catch (e) {
        console.error(e);
      }
    },
    async createCheckoutSession(_obj, { draftJobId }, context) {
      const draftJob = await getDraftJob({ id: draftJobId });
      const { origin } = context.origin || "https://wecodeni.com";
      const user = await context.getCurrentUser();
      const customerId = user.Company.stripeCustomerId;

      if (!draftJob) {
        return null;
      }

      const prices = await stripe.prices.list({
        limit: 1,
        lookup_keys: [siteConfig.price_key],
      });
      const price = prices.data[0];

      const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/dashboard`,
        cancel_url: `${origin}/dashboard/post-a-job`,
        payment_method_types: ["card"],
        customer: customerId,
        client_reference_id: `${draftJob.id}`,
        mode: "payment",
        allow_promotion_codes: true,
        payment_intent_data: {
          description: `30 day listing of ${draftJob.title} role on WeCode NI`,
          metadata: {
            company_name: draftJob.companyTitle,
            job_title: draftJob.title,
          },
        },
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
      });

      return session;
    },
    async createOrUpdateJob(_obj, { slug, job }, context) {
      const user = await context?.getCurrentUser();
      const admin = user?.admin || false;

      let jobFromDB: FormattedJob;

      if (slug) {
        jobFromDB = await getJob({ slug, admin });
      }

      if (
        user &&
        !user.admin &&
        jobFromDB &&
        user.Company.id !== jobFromDB?.companyId
      ) {
        throw new AuthenticationError("Not Authorized");
      }

      if (!admin && !slug) throw new AuthenticationError("Not Authorized");

      const { value, errors } = validateJob(job);

      if (errors) {
        throw new UserInputError(
          "Failed to create draft job due to validation errors",
          { validationErrors: errors }
        );
      }

      const validatedJob = value;

      if (slug) {
        const job = await createOrUpdateJob({
          slug,
          job: { id: jobFromDB.id, ...validatedJob },
        });

        return sanatizeJob({ job, isAdmin: admin });
      }

      if (!admin) throw new AuthenticationError("Not Authorized");

      const currentTime = new Date();
      const newSlug = await createJobSlug(
        validatedJob.companyTitle,
        validatedJob.title
      );

      const newJobData = {
        ...validatedJob,
        createdAt: currentTime,
        publishedAt: currentTime,
        expires: endOfDay(addDays(currentTime, 30)),
      };
      const newJob = await createOrUpdateJob({
        slug: newSlug,
        job: newJobData,
      });
      return sanatizeJob({ job: newJob, isAdmin: admin });
    },
    async createProJob(_obj, { job }, context) {
      const user = await context?.getCurrentUser();
      const isPro = ["active", "trialing", "past_due"].includes(
        user.Company.subscriptionStatus
      );
      const companyId = user.Company.id;

      if (!isPro) {
        throw new AuthenticationError("Not Authorized");
      }

      const proJobCount = await getProJobCountForCompany({ companyId });
      if (proJobCount >= user.Company.jobLimit) {
        throw new AuthenticationError("Not Authorized");
      }

      const { value, errors } = validateJob(job);

      if (errors) {
        throw new UserInputError(
          "Failed to create draft job due to validation errors",
          { validationErrors: errors }
        );
      }

      const validatedJob = value;
      const currentTime = new Date();

      const slug = await createJobSlug(
        validatedJob.companyTitle,
        validatedJob.title
      );

      const newJobData = {
        ...validatedJob,
        pro: true,
        companyId,
        createdAt: currentTime,
        publishedAt: currentTime,
        expires: endOfDay(addDays(currentTime, 30)),
      };

      const newJob = await createOrUpdateJob({ slug, job: newJobData });
      return sanatizeJob({ job: newJob, isAdmin: user.admin });
    },
    async repostJob(_obj, { slug }, context) {
      const user = await context?.getCurrentUser();
      const admin = user?.admin || false;
      if (!admin) throw new AuthenticationError("Not Authorized");
      const job = await repostJob({ slug });

      if ("error" in job) {
        throw new AuthenticationError("Not Authorized");
      }

      return sanatizeJob({ job, isAdmin: admin });
    },
    async deleteJob(_obj, { slug }, context) {
      const user = await context?.getCurrentUser();
      const admin = user?.admin || false;

      const jobFromDB = await getJob({ slug, admin });

      if (user && !user.admin && user.Company.id !== jobFromDB.companyId) {
        throw new AuthenticationError("Not Authorized here");
      }

      const job = await deleteJob({ slug });
      return sanatizeJob({ job, isAdmin: admin });
    },
  },
  Job: {
    async logoUrl(job, _args) {
      if (job.logoUrl) return job.logoUrl;
      const companyDomain = new URL(job.companyUrl).hostname;
      return `${siteConfig.url}/company-logo/${companyDomain}`;
    },
  },
  User: {
    async company(user, _args) {
      return user.Company;
    },
  },
  Company: {
    async jobsAvailable(company) {
      if (!company.jobLimit) return 0;
      const proJobCount = await getProJobCountForCompany({
        companyId: company.id,
      });

      const remaining = company.jobLimit - proJobCount;
      return remaining <= 0 ? 0 : remaining;
    },
  },
};

function context({ req, res }) {
  return {
    getCurrentUser: async function () {
      const session = await getServerSession(req, res, nextAuthConfig);
      return session?.user;
    },
    origin: getAbsoluteUrl(req),
  };
}

const apolloServer = new ApolloServer({
  typeDefs: { ...typeDefs },
  resolvers: { ...resolvers },
  context,
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const runQuery = async ({
  query,
  variables,
}: {
  query: string;
  variables?: any;
}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const client = new ApolloClient({
    link: new SchemaLink({
      schema,
      context: (...args) => {
        return undefined;
      },
    }),
    cache: new InMemoryCache(),
  });

  return await client.query({
    query: gql`
      ${query}
    `,
    variables,
  });
};

export default async function handle(req, res) {
  try {
    await apolloServer.start();
  } finally {
    const handler = apolloServer.createHandler({ path: "/api/graphql" });
    return handler(req, res);
  }
}
