import { buildMetadata } from "app/shared-metadata";
import { DashboardTitle } from "components/DashboardTitle";
import { Button } from "components/button";
import { JobsTable } from "components/user-jobs-table";
import Link from "next/link";
import { getUser } from "utils/auth-config";
import { getJobsForCompany } from "utils/server/jobs";
import sanatizeJob from "utils/server/sanatize-job";
import ClearLocalStorage from "./ClearLocalStorage";
import { EmptyJobsTable } from "components/EmptyJobsTable";

export const generateMetadata = buildMetadata({ title: "Dashboard" });

export default async function Dashboard() {
  const user = await getUser();
  const company = user?.Company;

  if (!company) {
    throw new Error("No company found for user");
  }

  const rawJobs = await getJobsForCompany({ id: company.id });
  const jobs = rawJobs.map((job) => sanatizeJob({ job, isAdmin: false }));

  return (
    <main
      className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
      tabIndex={0}
    >
      <DashboardTitle
        title="Dashboard"
        buttons={
          <Link href="/dashboard/post-a-job" passHref legacyBehavior>
            <Button as="a" color="teal">
              Post a job
            </Button>
          </Link>
        }
      />

      <ClearLocalStorage />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {jobs.length === 0 ? <EmptyJobsTable /> : <JobsTable jobs={jobs} />}
        </div>
      </div>
    </main>
  );
}
