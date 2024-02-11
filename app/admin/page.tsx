import { buildMetadata } from "app/shared-metadata";
import { DashboardTitle } from "components/DashboardTitle";
import { getStats } from "utils/server/jobs";

export const generateMetadata = buildMetadata({ title: "Admin Dashboard" });

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <main
      className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
      tabIndex={0}
    >
      <DashboardTitle title="Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="max-w-10xl mx-auto pb-12">
            <div className="bg-white shadow overflow-hidden rounded-md">
              <div className="lg:flex">
                <div className="w-full lg:w-1/3 text-center py-4 lg:py-8 lg:border-b-0 border-b">
                  <div className="lg:border-r border-r-0">
                    <div className="text-gray-700">
                      <span className="text-5xl">{stats.totalJobs}</span>
                    </div>
                    <div className="text-sm font-bold uppercase text-primary-500 tracking-wide">
                      Total jobs
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 text-center py-4 lg:py-8 lg:border-b-0 border-b">
                  <div className="lg:border-r border-r-0">
                    <div className="text-gray-700">
                      <span className="text-5xl">{stats.totalCompanies}</span>
                    </div>
                    <div className="text-sm font-bold uppercase text-primary-500 tracking-wide">
                      Companies
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 text-center py-4 lg:py-8">
                  <div>
                    <div className="text-gray-700">
                      <span className="text-5xl">{stats.liveJobs}</span>
                    </div>
                    <div className="text-sm font-bold uppercase text-primary-500 tracking-wide">
                      Live jobs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
