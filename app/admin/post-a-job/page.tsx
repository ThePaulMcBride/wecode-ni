import { DashboardTitle } from "components/DashboardTitle";
import { buildMetadata } from "app/shared-metadata";
import Form from "./Form";

export const generateMetadata = buildMetadata({ title: "Post a Job" });

function PostAJob() {
  return (
    <main
      className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
      tabIndex={0}
    >
      <DashboardTitle title="Post a job" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="max-w-10xl mx-auto pb-12">
            <div className="bg-white shadow overflow-hidden rounded-md p-4 sm:p-6">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostAJob;
