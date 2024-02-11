import Stripe from "stripe";
import addDays from "date-fns/addDays";
import endOfDay from "date-fns/endOfDay";
import {
  getDraftJob,
  createJobSlug,
  createOrUpdateJob,
} from "utils/server/jobs";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  console.log("It's working");
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  try {
    // Get event from Stripe to ensure it is genuine
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const draftJobId = session.client_reference_id;
      const draftJob = await getDraftJob({
        id: parseInt(draftJobId, 10),
      });

      if (!draftJob) {
        throw new Error(
          `A job preview could not be found with token: ${draftJobId}`
        );
      }

      // Publish job
      const slug = await createJobSlug(draftJob.companyTitle, draftJob.title);
      const currentTime = new Date();

      const job = {
        ...draftJob,
        publishedAt: currentTime,
        createdAt: currentTime,
        expires: endOfDay(addDays(currentTime, 30)),
      };

      await createOrUpdateJob({ job, slug });

      return NextResponse.json({
        success: true,
        message: `Job with slug: ${slug} was successfully created`,
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json(
      { error: true, message: e.message },
      { status: 500 }
    );
  }
}
