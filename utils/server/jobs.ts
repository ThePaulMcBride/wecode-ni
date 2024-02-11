import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import endOfDay from "date-fns/endOfDay";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import getSeconds from "date-fns/getSeconds";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import algoliasearch from "algoliasearch";
import db, { EmploymentType, Job, JobEmploymentType, JobTag, Prisma } from "db";

import sanatizeJob from "./sanatize-job";

const algoliaId = process.env.ALGOLIA_APP_ID;
const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY;

export interface JobFromDatabase extends Job {
  JobEmploymentTypes: JobEmploymentType[];
  JobTags: JobTag[];
}
export interface FormattedJob extends Job {
  tags: string[];
  employmentType: EmploymentType[];
  objectID?: string;
}

export interface JobInput extends Prisma.JobUncheckedCreateInput {
  tags: string[];
  employmentType: EmploymentType[];
}

function formatTagsandEmploymentTypes(rawJob: JobFromDatabase): FormattedJob {
  const { JobEmploymentTypes, JobTags, ...job } = rawJob;

  const tags = JobTags?.map((tag) => tag.tag) || [];
  const employmentType = JobEmploymentTypes?.map((type) => type.type) || [];

  return {
    ...job,
    tags,
    employmentType,
  };
}

export async function getStats() {
  const currentTime = new Date();
  const cutoff = subDays(currentTime, 365);

  const liveJobs = await db.job.count({
    where: {
      AND: [
        { publishedAt: { gte: cutoff } },
        {
          OR: [
            {
              deletedAt: null,
            },
            {
              deletedAt: {
                gt: currentTime,
              },
            },
          ],
        },
      ],
    },
  });

  const totalJobs = await db.job.count({
    where: {
      publishedAt: { not: null },
    },
  });

  const totalCompanies = await db.job.findMany({
    where: {
      publishedAt: { not: null },
    },
    select: {
      companyTitle: true,
    },
    distinct: ["companyTitle"],
  });

  return {
    liveJobs: liveJobs | 0,
    totalJobs: totalJobs | 0,
    totalCompanies: totalCompanies.length | 0,
  };
}

export const getLiveJobs = async (
  { search }: { search?: string } = {
    search: "",
  }
): Promise<FormattedJob[]> => {
  const currentTime = new Date();
  const cutoff = subDays(currentTime, 365);

  if (search) {
    const client = algoliasearch(algoliaId, algoliaAdminKey);
    const index = client.initIndex("jobs");
    const searchResults = await index.search<FormattedJob>(search);

    return searchResults.hits.filter(notDeleted);
  }

  const rawJobs = await db.job.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
    ],
    where: {
      AND: [
        { publishedAt: { gte: cutoff } },
        {
          OR: [
            {
              deletedAt: null,
            },
            {
              deletedAt: {
                gt: currentTime,
              },
            },
          ],
        },
      ],
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  const formattedJobs = rawJobs.map((job) => formatTagsandEmploymentTypes(job));

  return formattedJobs;
};

export const getRepostableJobs = async (): Promise<FormattedJob[]> => {
  const currentTime = new Date();
  const start = subDays(currentTime, 30);
  const cutOff = subDays(currentTime, 60);

  const jobs = await db.job.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
    ],
    where: {
      AND: [
        { publishedAt: { lte: start, gte: cutOff } },
        { expires: { lte: currentTime } },
        { repostCount: { lte: 2 } },
        {
          OR: [{ deletedAt: null }, { deletedAt: { gt: currentTime } }],
        },
      ],
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  return jobs.map((job) => formatTagsandEmploymentTypes(job));
};

export const getRecentlyDeletedJobs = async ({
  cutoffDays,
}: {
  cutoffDays: number;
}): Promise<FormattedJob[]> => {
  const currentTime = new Date();
  const cutOff = subDays(currentTime, cutoffDays);

  const rawJobs = await db.job.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
    ],
    where: {
      AND: [
        {
          deletedAt: {
            lte: currentTime,
          },
        },
        {
          deletedAt: {
            gte: cutOff,
          },
        },
      ],
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  const jobs = rawJobs.sort(sortByCreatedDate);

  return jobs.map((job) => formatTagsandEmploymentTypes(job));
};

export const getRecentlyPublishedJobs = async ({
  cutoffDays,
}: {
  cutoffDays: number;
}): Promise<FormattedJob[]> => {
  const currentTime = new Date();
  const cutOff = subDays(currentTime, cutoffDays);

  const rawJobs = await db.job.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
    ],
    where: {
      AND: [
        { publishedAt: { gte: cutOff } },
        {
          OR: [{ deletedAt: null }, { deletedAt: { gt: currentTime } }],
        },
      ],
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  const jobs = rawJobs.map((job) => formatTagsandEmploymentTypes(job));

  return jobs;
};

export const getJob = async ({
  slug,
  admin,
}): Promise<FormattedJob | undefined> => {
  const currentTime = new Date();

  const rawJob = await db.job.findFirst({
    where: {
      slug,
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  if (!rawJob) {
    return undefined;
  }

  const job = formatTagsandEmploymentTypes(rawJob);

  if (!admin && job.deletedAt && isBefore(job.deletedAt, currentTime)) {
    return undefined;
  }

  return job;
};

export async function getJobsForCompany({
  id,
}: {
  id: number;
}): Promise<FormattedJob[]> {
  const currentTime = new Date();
  const cutoff = subDays(currentTime, 365);

  const rawJobs = await db.job.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
    ],
    where: {
      AND: [
        { companyId: id },
        { publishedAt: { gte: cutoff } },
        {
          OR: [
            {
              deletedAt: null,
            },
            {
              deletedAt: {
                gt: currentTime,
              },
            },
          ],
        },
      ],
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  const jobs = rawJobs.map((job) => formatTagsandEmploymentTypes(job));

  return jobs;
}

export async function getProJobCountForCompany({
  companyId,
}: {
  companyId: number;
}): Promise<number> {
  const currentTime = new Date();
  const cutoff = subDays(currentTime, 365);

  return await db.job.count({
    where: {
      AND: [
        { publishedAt: { gte: cutoff } },
        { companyId: companyId },
        { pro: true },
        {
          OR: [
            {
              deletedAt: null,
            },
            {
              deletedAt: {
                gt: currentTime,
              },
            },
          ],
        },
      ],
    },
  });
}

export const getDraftJob = async ({
  id,
}: {
  id: number;
}): Promise<null | FormattedJob> => {
  const job = await db.job.findFirst({
    where: {
      id,
      publishedAt: null,
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  if (!job) {
    return null;
  }

  return formatTagsandEmploymentTypes(job);
};

export const createOrUpdateJob = async ({
  slug,
  job,
}: {
  slug: string;
  job: JobInput;
}): Promise<FormattedJob> => {
  let data: Job;

  const { tags, employmentType, id, ...jobData } = job;

  if (id) {
    await db.jobTag.deleteMany({ where: { jobId: id } });
    await db.jobEmploymentType.deleteMany({ where: { jobId: id } });
  }

  if (id) {
    data = await db.job.update({
      where: { id: id },
      data: {
        ...jobData,
        salaryData: jobData.salaryData || Prisma.JsonNull,
        slug,
      },
    });
  } else {
    data = await db.job.create({
      data: {
        ...jobData,
        slug,
      },
    });
  }

  const jobFromDb = await db.job.update({
    where: { id: data.id },
    data: {
      JobTags: {
        createMany: {
          data: tags.map((tag) => ({ tag })),
        },
      },
      JobEmploymentTypes: {
        createMany: {
          data: employmentType.map((type) => ({ type })),
        },
      },
    },
    include: {
      JobTags: true,
      JobEmploymentTypes: true,
    },
  });

  const formattedJob = formatTagsandEmploymentTypes(jobFromDb);

  await updateSearchIndex(slug, formattedJob);

  return formattedJob;
};

export const createOrUpdateDraftJob = async ({
  id,
  job,
  companyId,
}: {
  id?: number;
  job: JobInput;
  companyId: number;
}): Promise<FormattedJob> => {
  const { tags, employmentType, ...jobData } = job;
  let res: Job;

  if (id) {
    await db.jobTag.deleteMany({ where: { jobId: jobData.id } });
    await db.jobEmploymentType.deleteMany({ where: { jobId: jobData.id } });
  }

  if (id) {
    res = await db.job.update({
      where: {
        id,
      },
      data: {
        ...jobData,
        salaryData: jobData.salaryData || Prisma.JsonNull,
        companyId,
      },
    });
  } else {
    res = await db.job.create({
      data: {
        ...jobData,
        salaryData: jobData.salaryData || Prisma.JsonNull,
        companyId,
      },
    });
  }

  const jobFromDatabase = await db.job.update({
    where: { id: res.id },
    data: {
      JobTags: {
        createMany: {
          data: tags.map((tag) => ({ tag })),
        },
      },
      JobEmploymentTypes: {
        createMany: {
          data: employmentType.map((type) => ({ type })),
        },
      },
    },
    include: {
      JobTags: true,
      JobEmploymentTypes: true,
    },
  });

  return formatTagsandEmploymentTypes(jobFromDatabase);
};

export const repostJob = async ({
  slug,
  auto = false,
}: {
  slug: string;
  auto?: boolean;
}): Promise<FormattedJob | { error: string }> => {
  const job = await db.job.findUnique({
    where: { slug },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  const exists = !!job;

  if (!exists) {
    return { error: "Job does not exist" };
  }

  const existingJobData = formatTagsandEmploymentTypes(job);

  const existingPublishedAt = existingJobData.publishedAt;
  const hours = getHours(existingPublishedAt);
  const minutes = getMinutes(existingPublishedAt);
  const seconds = getSeconds(existingPublishedAt);
  const now = new Date();

  const publishedAt = auto
    ? subDays(setSeconds(setMinutes(setHours(now, hours), minutes), seconds), 1)
    : now;
  const expires = endOfDay(addDays(publishedAt, 30));

  const updatedJob = await db.job.update({
    where: { slug },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
    data: {
      publishedAt,
      expires,
      repostCount: {
        increment: 1,
      },
      deletedAt: null,
    },
  });

  // const sanitizedJob = sanatizeJob({ job: updatedJob, isAdmin: true });
  const formattedJob = formatTagsandEmploymentTypes(updatedJob);

  await updateSearchIndex(slug, formattedJob);

  return formattedJob;
};

export const deleteJob = async ({
  slug,
}: {
  slug: string;
}): Promise<FormattedJob> => {
  const job = await db.job.update({
    where: { slug },
    data: {
      deletedAt: new Date(),
    },
    include: {
      JobEmploymentTypes: true,
      JobTags: true,
    },
  });

  const formattedJob = formatTagsandEmploymentTypes(job);

  await updateSearchIndex(slug, formattedJob);

  return formattedJob;
};

export const createJobSlug = async (
  companyTitle: string,
  title: string
): Promise<string> => {
  const intialSlug = `${companyTitle} ${title}`
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return makeUnique(intialSlug);
};

async function updateSearchIndex(slug: string, job: FormattedJob) {
  try {
    const client = algoliasearch(algoliaId, algoliaAdminKey);
    const index = client.initIndex("jobs");

    const publishedAt = job.publishedAt;
    const deletedAt = job.deletedAt;

    if (
      (publishedAt && isBefore(publishedAt, subDays(new Date(), 90))) ||
      (deletedAt && isBefore(deletedAt, new Date()))
    ) {
      return await index.deleteObject(slug);
    }

    return await index.saveObject({
      ...sanatizeJob({ job }),
      objectID: slug,
    });
  } catch (e) {
    console.error(e);
  }
}

async function makeUnique(slug: string, suffix?: number): Promise<string> {
  suffix = suffix || 0;
  const uniqueSlug = !suffix ? slug : `${slug}-${suffix}`;
  const exists = await db.job.findUnique({ where: { slug: uniqueSlug } });
  if (!exists) return uniqueSlug;

  const count = suffix + 1;
  return makeUnique(slug, count);
}

function sortByCreatedDate(a, b) {
  return Date.parse(b.createdAt) - Date.parse(a.createdAt);
}

function notDeleted(job) {
  const currentTime = new Date();
  if (!job.deletedAt) {
    return true;
  }
  return isAfter(new Date(job.deletedAt), currentTime);
}
