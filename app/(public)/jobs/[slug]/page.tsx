import { Newsletter } from "components/sidebar/newsletter";
import Image from "next/image";
import { getJob } from "utils/server/jobs";
import sanatizeJob from "utils/server/sanatize-job";
import { notFound } from "next/navigation";
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import { buildMetadata } from "app/shared-metadata";

export const generateMetadata = async (props, parent) => {
  const slug = props.params.slug;
  const rawJob = await getJob({ slug, admin: false });

  if (!rawJob) {
    notFound();
  }

  const job = sanatizeJob({ job: rawJob });

  const getMetadata = await buildMetadata({
    title: `${job.title} at ${job.companyTitle}`,
    description: job.shortDescription,
    images: [{ url: job.logoUrl, width: 400, height: 400 }],
  });

  return getMetadata(props, parent);
};

export const revalidate = 1;

export default async function JobPage(props) {
  const slug = props.params.slug;
  const rawJob = await getJob({ slug, admin: false });

  if (!rawJob) {
    notFound();
  }

  const job = sanatizeJob({ job: rawJob });

  return (
    <>
      <div className="container flex-1 mx-auto flex flex-col lg:flex-row py-6">
        <div className="lg:w-2/3 mx-4 mb-8 lg:mb-0">
          <div className="form-container bg-white p-8 rounded shadow">
            <div className="mb-8 flex justify-between">
              <div>
                <h1 className="text-gray-800 mb-2 font-semibold leading-tight text-4xl">
                  {job.title}
                </h1>
                <span className="block text-gray-600 ">
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 no-underline"
                  >
                    {job.companyTitle}
                  </a>
                  <span className="inline-block mx-2">&middot;</span>
                  {job.location}
                  {job.salary && (
                    <>
                      <span className="inline-block mx-2">&middot;</span>
                      {job.salary}
                    </>
                  )}
                </span>
              </div>
              <div className="md:flex w-16 ml-4 items-center hidden">
                <Image
                  className="rounded-full w-full text-[0px]"
                  src={job.logoUrl}
                  alt={`${job.companyTitle} logo`}
                  loading="lazy"
                  width={64}
                  height={64}
                />
              </div>
            </div>
            <h3 className="text-gray-800 mb-2 font-semibold md:text-xl">
              Description
            </h3>

            <div
              className="job-description prose max-w-none md:prose-lg prose-a:text-primary-500 prose-a:no-underline text-gray-800 mb-8 break-words hyphens-auto"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

            <h3 className="text-gray-800 mb-2 font-semibold md:text-xl">
              How to Apply
            </h3>
            <div
              className="prose max-w-none md:prose-lg prose-a:text-primary-500 prose-a:no-underline text-gray-800 mb-8 break-words hyphens-auto"
              dangerouslySetInnerHTML={{ __html: job.howToApply }}
            />

            <a
              href={`/jobs/${job.slug}/apply`}
              data-action="apply"
              className="bg-primary-500 hover:bg-primary-600 block text-center w-full text-white font-bold py-3 px-4 rounded no-underline"
            >
              Apply Now
            </a>
          </div>
        </div>
        <div className="sidebar lg:w-1/3 mx-4">
          <a
            href={`/jobs/${job.slug}/apply`}
            data-action="apply"
            className="hidden lg:block bg-primary-500 hover:bg-primary-600 text-center w-full text-white font-bold py-3 px-4 rounded mb-4 mt-2 no-underline"
          >
            Apply Now
          </a>
          <Newsletter />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `${JSON.stringify(generateschemaOrgJSONLD(job))}`,
        }}
      />
    </>
  );
}

function generateschemaOrgJSONLD(job) {
  let baseSalary;
  if (job.salaryData) {
    baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salaryData.currency,
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
      },
    };

    if (!job.salaryData.max) {
      baseSalary.value.value = parseInt(job.salaryData.value);
    } else {
      baseSalary.value.minValue = parseInt(job.salaryData.value);
      baseSalary.value.maxValue = parseInt(job.salaryData.max);
    }
  }

  return {
    "@context": "http://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: format(parse(job.createdAt), "yyyy-MM-dd"),
    validThrough: format(parse(job.expires), "yyyy-MM-dd"),
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.companyTitle,
      sameAs: job.companyUrl,
      logo: job.logoUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: job.location,
        addressLocality: job.location,
        addressRegion: "Northern Ireland",
      },
    },
    baseSalary,
  };
}
