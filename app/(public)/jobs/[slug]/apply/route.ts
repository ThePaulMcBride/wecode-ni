import db from "db";
import isbot from "isbot";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function GET(request: Request, context) {
  const slug = context.params.slug;
  const userAgent = request.headers["user-agent"];
  const xForwardedFor = request.headers["x-forwarded-for"] as string;

  const job = await db.job.findUnique({ where: { slug: slug } });

  if (!isbot(userAgent)) {
    await db.application.create({ data: { jobId: job.id } });

    if (process.env.NODE_ENV === "production") {
      await fetch("https://plausible.io/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          "X-Forwarded-For": xForwardedFor,
        },
        body: JSON.stringify({
          name: "apply",
          props: {
            job: slug,
          },
          url: `https://wecodeni.com/jobs/${slug}`,
          domain: "wecodeni.com",
        }),
      });
    }
  }

  if (isEmail(job.applyUrl)) {
    return redirect(`mailto:${job.applyUrl}`);
  }
  return redirect(job.applyUrl);
}

function isEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
