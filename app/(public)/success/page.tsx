import { buildMetadata } from "app/shared-metadata";
import config from "config";
import Link from "next/link";
import ClearLocalStorage from "./ClearLocalStorage";

export const generateMetadata = buildMetadata({ title: "Success" });

export default function SuccessPage() {
  return (
    <div className="container flex-1 mx-auto my-4 flex items-center justify-center min-h-[35rem]">
      <div className="bg-white md:rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
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
              Payment successful!
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                Your job listing has been posted and should start appearing on
                the homepage soon. A receipt has been sent to the email address
                you provided. If you need to update your job listing or if there
                is anything else I can help with, please email me at{" "}
                <a className="text-primary-500" href={`mailto:${config.email}`}>
                  {config.email}
                </a>
                .
              </p>
            </div>
            <ClearLocalStorage />
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <span className="flex w-full rounded-md shadow-sm">
            <Link
              passHref
              href={`/`}
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              View all jobs
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
