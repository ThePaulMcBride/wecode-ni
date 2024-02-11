import { Newsletter } from "components/sidebar/newsletter";
import { WhyPost } from "components/sidebar/why-post";
import { getLiveJobs } from "utils/server/jobs";
import { JobLink } from "../JobLink";
import sanatizeJob from "utils/server/sanatize-job";
import { buildMetadata } from "app/shared-metadata";
import config from "config";

export const revalidate = 1;

export const generateMetadata = async (props, parent) => {
  const searchTerm = props.params.search;
  const search = decodeURIComponent(searchTerm);
  const titleCaseSearch = search
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const smartTitle = config.tags.find((tag) => tag.value === search)?.label;

  const getMetadata = await buildMetadata({
    title: `${smartTitle ?? titleCaseSearch} Jobs`,
  });

  return getMetadata(props, parent);
};

export default async function SearchPage(props) {
  const searchTerm = props.params.search;
  const search = decodeURIComponent(searchTerm);

  const rawJobs = await getLiveJobs({ search }).catch(() => []);
  const jobs = rawJobs.map((job) => sanatizeJob({ job }));

  function renderJobs() {
    if (jobs.length) {
      return (
        <div className="rounded shadow overflow-hidden bg-white">
          <div className="job-list">
            {jobs.map((job) => (
              <JobLink job={job} key={job.slug} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <p className="text-center text-gray-800 p-6">No jobs were found! 😔</p>
    );
  }

  return (
    <main className="flex-1">
      <header className="header bg-primary-500 text-white flex items-center justify-center flex-col text-center px-4 pt-28 pb-36 bg-hero-pattern">
        <h2 className="mb-6 text-3xl">
          Belfast and Northern Ireland&apos;s best software development and tech
          jobs.
        </h2>
      </header>

      <div className="container mx-auto mt-[-6rem] flex flex-col lg:flex-row justify-center">
        <div className="jobs lg:w-2/3 mx-4 p-8 bg-white rounded flex flex-col shadow border-primary-500 border-b-2">
          <form action="/search">
            <label htmlFor="search" className="mb-4 block">
              <span className="uppercase tracking-wider text-xs font-bold">
                Search
              </span>

              <input
                name="search"
                defaultValue={search}
                className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
              />
            </label>
          </form>
        </div>
      </div>

      <div
        id="jobs"
        className="container mx-auto flex flex-col lg:flex-row py-6"
      >
        <div className="jobs lg:w-2/3 mx-4 mb-6">{renderJobs()}</div>
        <div className="sidebar lg:w-1/3 mx-4">
          <Newsletter />
          <WhyPost />
        </div>
      </div>
    </main>
  );
}
