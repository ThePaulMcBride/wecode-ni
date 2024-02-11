"use client";

import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Image from "next/legacy/image";
import { SanatizedJob } from "utils/server/sanatize-job";

const statuses = [
  { key: "live", title: "Live", link: "jobs" },
  { key: "expired", title: "Expired", link: "jobs-expired" },
  { key: "deleted", title: "Deleted", link: "jobs-deleted" },
];

interface Props {
  jobs: SanatizedJob[];
  filter: string;
}

export const JobsTable: React.FC<React.PropsWithChildren<Props>> = ({
  jobs,
  filter,
}) => {
  const [search, setSearch] = useState("");

  function navigate(status) {
    if (status === "live") {
      Router.push("/admin/jobs");
    }
    if (status === "expired") {
      Router.push("/admin/jobs-expired");
    }
    if (status === "deleted") {
      Router.push("/admin/jobs-deleted");
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const filter = search.trim().toLowerCase();
    if (!filter) return job;
    return (
      job.title.toLowerCase().includes(filter) ||
      job.companyTitle.toLowerCase().includes(filter) ||
      job.location.toLowerCase().includes(filter)
    );
  });

  return (
    <div className="max-w-10xl mx-auto pb-12">
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="bg-white px-4 border-b border-gray-200 sm:px-6">
          <div className="pt-3 pb-4 sm:p-0">
            <div className="sm:hidden">
              <select
                value={filter}
                onChange={(e) => navigate(e.target.value)}
                className="form-select block w-full text-gray-900 border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300 transition ease-in-out duration-150"
              >
                {statuses.map((status) => (
                  <option value={status.key} key={status.title}>
                    {status.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div>
                <nav className="-mb-px flex">
                  {statuses.map((status, index) => (
                    <Link
                      key={status.title}
                      href={`/admin/${status.link}`}
                      className={`${index === 0 ? "" : "ml-8"} ${
                        status.key === filter
                          ? "border-primary-500 text-primary-600 focus:text-primary-800 focus:border-primary-700"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm leading-5 focus:outline-none  transition ease-in-out duration-150`}
                    >
                      {status.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-5 pb-3 sm:px-6">
          <div>
            <label htmlFor="filter" className="sr-only">
              Search jobs
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="filter"
                  className="appearance-none rounded-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                  placeholder="JavaScript Developer"
                />
              </div>
              <span className="-ml-px relative flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm leading-5 bg-gray-50 text-gray-900 transition ease-in-out duration-150">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-2">Filter</span>
              </span>
            </div>
          </div>
        </div>
        <ul>
          {filteredJobs.map((job, index) => (
            <li
              key={job.slug}
              className={index !== 0 ? "border-t border-gray-200" : undefined}
            >
              <Link
                href={`/admin/jobs/${job.slug}`}
                className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center relative">
                      <Image
                        className="rounded-full"
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
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <p className="text-sm leading-5 text-gray-700">
            Showing <span className="font-medium">{filteredJobs.length}</span>{" "}
            of <span className="font-medium">{jobs.length}</span> results
          </p>
        </div>
      </div>
    </div>
  );
};
