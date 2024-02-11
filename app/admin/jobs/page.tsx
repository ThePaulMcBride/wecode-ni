import Link from "next/link";
import { JobsTable } from "components/jobs-table";
import { Button } from "components/button";
import { DashboardTitle } from "components/DashboardTitle";
import { getLiveJobs } from "utils/server/jobs";
import sanatizeJob from "utils/server/sanatize-job";
import { buildMetadata } from "app/shared-metadata";

export const generateMetadata = buildMetadata({ title: "Jobs" });

export default async function Jobs() {
  const rawJobs = await getLiveJobs();
  const jobs = rawJobs.map((job) => sanatizeJob({ job, isAdmin: true }));

  return (
    <main
      className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
      tabIndex={0}
    >
      <DashboardTitle
        title="Jobs"
        buttons={
          <Link href="/admin/post-a-job" passHref legacyBehavior>
            <Button as="a" color="teal">
              Post a job
            </Button>
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* Stuff goes here */}

          <JobsTable jobs={jobs} filter="live" />
        </div>
      </div>
    </main>
  );
}
