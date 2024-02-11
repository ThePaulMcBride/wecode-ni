import { DashboardTitle } from "components/DashboardTitle";
import { getJob } from "utils/server/jobs";
import sanatizeJob from "utils/server/sanatize-job";
import { buildMetadata } from "app/shared-metadata";
import { Buttons } from "./Buttons";
import Form from "./Form";

export const generateMetadata = buildMetadata({ title: "Edit Job" });

export default async function EditJob(props) {
  const slug = props.params.slug;
  const rawJob = await getJob({ slug, admin: false });
  const job = sanatizeJob({ job: rawJob, isAdmin: false });

  return (
    <main
      className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
      tabIndex={0}
    >
      <DashboardTitle title="Edit Job" buttons={<Buttons slug={slug} />} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <Form job={job} />
        </div>
      </div>
    </main>
  );
}
