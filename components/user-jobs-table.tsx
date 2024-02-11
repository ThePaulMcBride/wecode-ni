import Link from "next/link";
import { SanatizedJob } from "utils/server/sanatize-job";
import Image from "next/legacy/image";

interface Props {
  jobs: SanatizedJob[];
}

export const JobsTable: React.FC<React.PropsWithChildren<Props>> = ({
  jobs,
}) => {
  return (
    <div className="max-w-10xl mx-auto pb-12">
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="flex w-full justify-between">
          <div className="flex-1 px-6 pr-10 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
            Job
          </div>
          <div className="hidden lg:block flex-1 px-12 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
            Location
          </div>
        </div>
        <ul>
          {jobs.map((job, index) => (
            <li
              key={job.slug}
              className={index !== 0 ? "border-t border-gray-200" : undefined}
            >
              <Link
                href={`/dashboard/jobs/[slug]`}
                as={`/dashboard/jobs/${job.slug}`}
                className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center relative">
                      <Image
                        className="rounded-full h-12 w-12"
                        src={job.logoUrl}
                        alt={`${job.companyTitle} logo`}
                        layout="fill"
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-4 lg:grid lg:grid-cols-2 lg:gap-4">
                      <div>
                        <div className="text-md leading-5 text-primary-600 truncate font-bold">
                          {job.title}
                        </div>
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                          <span className="truncate">{job.companyTitle}</span>
                        </div>
                      </div>
                      <div className="hidden lg:flex items-center">
                        <div>
                          <div className="flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
