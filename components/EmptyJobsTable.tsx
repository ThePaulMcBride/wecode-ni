import Link from "next/link";
import { Button } from "./button";

export function EmptyJobsTable() {
  return (
    <div className="max-w-10xl mx-auto pb-12">
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="px-4 pt-5 pb-3 sm:px-6">
          <div className="text-center px-6 py-4">
            <div className="py-8">
              <div className="mb-4">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block fill-current text-gray-300 h-16 w-16"
                >
                  <path
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-2xl text-gray-700 font-medium mb-4">
                No jobs yet
              </p>
              <p className="text-gray-500 max-w-xs mx-auto mb-6">
                Post a job now to start advertising to tech workers across
                Belfast and Northern Ireland.
              </p>
              <div>
                <Link href="/dashboard/post-a-job" passHref legacyBehavior>
                  <Button as="a" color="teal">
                    Post a job
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
