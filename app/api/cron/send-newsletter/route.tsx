import Mailchimp from "mailchimp-api-v3";
import isAfter from "date-fns/isAfter";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import { getHtml } from "emails/job-newsletter";

import { getLiveJobs } from "utils/server/jobs";
import sanatizeJob from "utils/server/sanatize-job";
import { NextResponse } from "next/server";

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const listId = process.env.MAILCHIMP_LIST_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const allJobs = await getLiveJobs();
  const cutoff = subDays(new Date(), 7);
  const currentDate = format(new Date(), "do MMMM yyyy");

  const jobs = allJobs.map((job) => sanatizeJob({ job }));
  const newJobs = jobs.filter((job) => isAfter(parse(job.publishedAt), cutoff));

  if (newJobs.length === 0) return NextResponse.json({ success: true });
  if (key !== process.env.CRON_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  try {
    const email = getHtml(newJobs);
    const response = await mailchimp.post("/templates", {
      name: `${currentDate} - Jobs Notification`,
      html: email,
    });
    const templateId = response.id;
    const campaignResponse = await mailchimp.post("/campaigns", {
      type: "regular",
      recipients: {
        list_id: listId,
      },
      settings: {
        subject_line: "Job Alert 👩‍💻",
        preview_text: "Checkout the new jobs available this week on WeCode NI",
        title: `${currentDate} - Jobs Notification`,
        from_name: "WeCode NI",
        reply_to: "info@wecodeni.com",
        auto_footer: true,
        template_id: templateId,
      },
    });
    const campaignId = campaignResponse.id;
    await mailchimp.post(`/campaigns/${campaignId}/actions/send`);
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
