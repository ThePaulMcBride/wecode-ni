import { getRepostableJobs, repostJob } from "utils/server/jobs";
import sanatizeJob from "utils/server/sanatize-job";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const jobs = await getRepostableJobs();

  const repostableJobs = jobs.map((job) => sanatizeJob({ job, isAdmin: true }));

  if (key !== process.env.CRON_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const jobsPromise = repostableJobs.map((job) =>
    repostJob({ slug: job.slug, auto: true })
  );
  const repostedJobs = await Promise.all(jobsPromise);

  return NextResponse.json({
    repostableJobs,
    repostedJobs,
  });
}
