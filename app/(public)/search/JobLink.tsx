import { SanatizedJob } from "utils/server/sanatize-job";
import Image from "next/legacy/image";
import Link from "next/link";
import format from "date-fns/formatDistanceToNow";
import parse from "date-fns/parseISO";

export const JobLink = ({ job }: { job: SanatizedJob }) => {
  return (
    <div
      className="job-item grid text-sm text-gray-700 p-4 sm:py-6 border-t-2 border-gray-100 bg-white first:border-0"
      style={{ gridTemplateColumns: "auto minmax(0, 1fr)" }}
    >
      <div className="h-8 sm:h-10 md:h-11 w-8 sm:w-10 md:w-11 bg-white border border-gray-100 sm:mr-4 rounded-full lazyautosizes ls-is-cached lazyloaded relative">
        {job.logoUrl ? (
          <Image
            className="rounded-full w-full text-[0px]"
            src={job.logoUrl}
            alt={`${job.companyTitle} logo`}
            width={48}
            height={48}
          />
        ) : null}
      </div>

      <div className="col-start-1 sm:col-start-2 row-start-2 sm:row-start-1">
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 font-bold mt-2 sm:mt-0">
          <Link
            href={`/jobs/${job.slug}`}
            passHref
            className="job-title focus:outline-none focus:text-primary-600 hover:text-primary-600 transition ease-in-out duration-150"
          >
            {job.title}
          </Link>
        </h2>
        <h3 className="text-base md:text-lg text-gray-900">
          <span className="company-title focus:outline-none transition ease-in-out duration-150">
            {job.companyTitle}
          </span>
        </h3>
      </div>
      <div className="col-start-1 sm:col-start-2 col-end-2 sm:col-end-4">
        <div className="flex flex-row flex-wrap mt-3 space-x-1 sm:space-x-2">
          <ul className="leading-relaxed sm:leading-normal">
            <li className="inline">
              <h4 className="inline">
                <span className="focus:outline-none transition ease-in-out duration-150">
                  {job.location}
                </span>
              </h4>
            </li>
          </ul>
          {job.salary && (
            <>
              <span>·</span>
              <h4 className="leading-relaxed sm:leading-normal">
                <span className="focus:outline-none transition ease-in-out duration-150">
                  {job.salary}
                </span>
              </h4>
            </>
          )}
        </div>
      </div>
      <div className="col-start-3 row-start-1 flex items-baseline justify-end self-center sm:self-auto">
        <div className="inline-block sm:mr-4">
          <span>{format(parse(job.publishedAt!))} ago</span>
        </div>
      </div>
    </div>
  );
};
