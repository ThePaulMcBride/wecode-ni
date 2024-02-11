import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[20rem] md:min-h-[40rem] flex items-center justify-center">
      <div className="sm:w-2/3 max-w-md px-4 mx-auto mb-8 lg:mb-0">
        <div className="form-container bg-white p-8 rounded shadow">
          <h1 className="text-gray-800 mb-2 font-semibold leading-tight text-2xl">
            Job not found!
          </h1>
          <p className="text-gray-800 leading-normal mb-8">
            Oh no, it looks like this job doesn&apos;t exist. Why not head back
            to the home page and check out a few of the other jobs?
          </p>
          <Link
            href="/"
            className="bg-primary-500 hover:bg-primary-600 text-center w-full text-white font-bold py-3 px-4 rounded mb-4 mt-2 no-underline"
          >
            View all jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
