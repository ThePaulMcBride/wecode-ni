"use client";

import { GraphQLClient } from "graphql-request";
import { useState, useEffect, useRef } from "react";
import { useNotification } from "utils/client/notification-context";
import localstorage from "localstorage-ttl";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { JobForm, JobProps } from "components/JobForm";

const client = new GraphQLClient("/api/graphql");
const stripeId = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

const createDraftJobQuery = `
  mutation CreateDraftJob($job: CreateJobInput) {
    job: createOrUpdateDraftJob(job: $job) {
      id
    }
  }
`;

const createCheckoutSessionQuery = `
  mutation CreateCheckoutSession($draftJobId: Int!) {
    session: createCheckoutSession(draftJobId: $draftJobId) {
      id
    }
  }
`;

const defaultValues = {
  title: "",
  salaryData: {
    currency: "",
    value: "",
    max: "",
  },
  location: "",
  employmentType: [],
  tags: [],
  description: "",
  applyUrl: "",
  howToApply: "",
  companyTitle: "",
  companyUrl: "",
} satisfies JobProps;

function getPendingJob() {
  if (typeof window === "undefined") {
    return defaultValues;
  }

  return localstorage.get("pending_job") as JobProps;
}

export default function Form({ user }) {
  const job = getPendingJob() || defaultValues;
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const stripeRef = useRef<Stripe | undefined>();

  const { sendNotificationSignal } = useNotification();

  useEffect(() => {
    async function load() {
      stripeRef.current = await loadStripe(stripeId);
    }
    load();
  }, []);

  async function handleSubmit(data) {
    if (processing) return;
    setErrors({});
    setProcessing(true);

    try {
      const res = (await client.request(createDraftJobQuery, {
        job: data,
      })) as any;
      const jobId = res.job.id;
      const session = (await client.request(createCheckoutSessionQuery, {
        draftJobId: jobId,
      })) as any;

      localstorage.set("pending_job", data, 1000 * 60 * 30);

      await stripeRef.current.redirectToCheckout({
        sessionId: session.session.id,
      });
    } catch (e) {
      sendNotificationSignal({
        type: "OPEN",
        message: "There was an error with your submission",
        flashType: "error",
      });

      const errors = e.response.errors[0].extensions.validationErrors;
      if (errors) {
        return setErrors(errors);
      }
    } finally {
      setProcessing(false);
    }
  }

  return (
    <JobForm
      job={job}
      handleSubmit={handleSubmit}
      submitLabel="Publish Job"
      processing={processing}
      errors={errors}
    />
  );
}
