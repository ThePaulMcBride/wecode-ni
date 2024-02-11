import { buildMetadata } from "app/shared-metadata";
import { getUser } from "utils/auth-config";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const generateMetadata = buildMetadata({ title: "Success" });

export default async function Success() {
  const user = await getUser();

  if (user) {
    redirect("/api/verify");
  }

  return (
    <div className="min-h-[35rem] flex-1 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto mt-8 bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Success!
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                A login link has been sent to the email address you provided.
                Please check your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
