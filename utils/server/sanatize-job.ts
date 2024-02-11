import { Job, JobEmploymentType, JobTag } from "@prisma/client";
import { stripHtml } from "string-strip-html";
import { FormattedJob } from "./jobs";
import config from "config";

function processDate(date?: Date): string | undefined {
  if (!date) {
    return undefined;
  }

  const safeDate = new Date(date);
  return safeDate.toISOString();
}

function processSalary(salaryData) {
  if (!salaryData) return null;
  if (!salaryData.value) return null;

  const parsedSalary = salaryData
    ? `${parseInt(salaryData.value).toLocaleString("en-UK", {
        style: "currency",
        currency: salaryData.currency,
        maximumSignificantDigits: 3,
        notation: "compact",
      })}${salaryData.max ? ` - ` : ""}${
        salaryData.max
          ? parseInt(salaryData.max).toLocaleString("en-UK", {
              style: "currency",
              currency: salaryData.currency,
              maximumSignificantDigits: 3,
              notation: "compact",
            })
          : ""
      }`
    : null;

  return parsedSalary;
}

export type GenericJob = Job & {
  objectID?: string;
  JobTags: JobTag[];
  JobEmploymentTypes: JobEmploymentType[];
};

export interface SanatizedJob extends ReturnType<typeof sanatizeJob> {}

export default function sanatizeJob<T extends FormattedJob>({
  job,
  isAdmin = false,
}: {
  job: T;
  isAdmin?: boolean;
}) {
  const slug = "objectID" in job ? job.slug || job.objectID : job.slug;

  const companyDomain = new URL(job.companyUrl).hostname;
  const logoUrl = job.logoUrl ?? `${config.url}/company-logo/${companyDomain}`;

  return {
    ...(isAdmin ? job : {}),
    id: job.id,
    slug,
    applyUrl: job.applyUrl,
    applyUrlIsEmail: job.applyUrlIsEmail,
    companyTitle: job.companyTitle,
    companyUrl: job.companyUrl,
    companyId: job.companyId,
    createdAt: processDate(job.createdAt),
    deletedAt: processDate(job.deletedAt),
    publishedAt: processDate(job.publishedAt),
    description: job.description,
    expires: processDate(job.expires),
    howToApply: job.howToApply,
    location: job.location,
    salary: processSalary(job.salaryData),
    salaryData: job.salaryData?.["currency"] && {
      currency: job.salaryData["currency"],
      value: job.salaryData["value"],
      max: job.salaryData["max"],
    },
    shortDescription: `${stripHtml(job.description || "").result.substring(
      0,
      155
    )}...`,
    title: job.title,
    logoUrl: logoUrl,
    tags: job.tags,
    employmentType: job.employmentType,
  };
}
