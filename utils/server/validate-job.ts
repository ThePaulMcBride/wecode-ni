import xss from "xss";
import normalizeUrl from "normalize-url";
import { z } from "zod";

const jobSchema = z
  .object({
    title: z.string().min(2),
    salaryData: z
      .union([
        z.object({
          currency: z.literal(""),
          value: z.literal(""),
          max: z.literal(""),
        }),
        z.object({
          currency: z.enum(["GBP", "EUR", "USD"]),
          value: z.string(),
          max: z.string(),
        }),
        z.object({
          currency: z.enum(["GBP", "EUR", "USD"]),
          value: z.string(),
          max: z.literal(""),
        }),
      ])
      .nullable()
      .optional()
      .refine((salaryData) => {
        if (!salaryData) return true;

        if (salaryData.value && isNaN(parseInt(salaryData.value))) return false;
        if (salaryData.max && isNaN(parseInt(salaryData.max))) return false;

        return true;
      }),
    location: z.string().min(2).max(64),
    tags: z.array(z.string().max(32)),
    employmentType: z.array(z.string()),
    description: z.string().min(1),
    applyUrl: z
      .string()
      .email()
      .or(
        z.string().refine((url) => {
          if (!url) return false;
          if (!isUrl(url)) return false;
          return true;
        })
      ),
    howToApply: z.string().min(1),
    companyTitle: z.string().min(3),
    companyUrl: z.string().refine((url) => {
      if (!url) return false;
      if (!isUrl(url)) return false;
      return true;
    }),
  })
  .transform(sanitizeJob);

function isEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const isUrl = (urlString) => {
  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return urlRegex.test(urlString);
};

function sanitizeJob(job) {
  function getApplyUrl(url) {
    try {
      let applyUrl = url.trim();
      applyUrl = isEmail(applyUrl)
        ? applyUrl
        : normalizeUrl(applyUrl, { forceHttps: true, stripWWW: false });
      return applyUrl;
    } catch {
      return url.trim();
    }
  }

  function getCompanyUrl(url) {
    try {
      const applyUrl = normalizeUrl(url.trim(), {
        forceHttps: true,
        stripWWW: false,
      });
      return applyUrl;
    } catch (e) {
      return url.trim();
    }
  }

  return {
    title: job.title.trim(),
    salaryData:
      job.salaryData?.currency || job.salaryData?.value || job.salaryData?.max
        ? {
            currency: job.salaryData.currency?.trim(),
            value: job.salaryData.value?.trim(),
            max: job.salaryData.max?.trim(),
          }
        : undefined,
    location: job.location.trim(),
    tags: job.tags?.map((tag) => tag.trim()) || [],
    employmentType: job.employmentType?.map((type) => type.trim()) || [],
    description: xss(job.description.trim()).replace(/<p><br><\/p>/g, ""),
    applyUrl: getApplyUrl(job.applyUrl),
    howToApply: xss(job.howToApply.trim()).replace(/<p><br><\/p>/g, ""),
    companyTitle: job.companyTitle.trim(),
    companyUrl: getCompanyUrl(job.companyUrl),
    applyUrlIsEmail: isEmail(job.applyUrl),
  };
}

export default function validate(job) {
  const result = jobSchema.safeParse(job);

  if (result.success === false) {
    return { errors: result.error.flatten().fieldErrors };
  }

  return {
    value: result.data,
  };
}
