"use client";

import { JobForm } from "components/JobForm";
import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { useNotification } from "utils/client/notification-context";

const updateJobQuery = `
  mutation CreateOrUpdateJob($slug: String! $job: CreateJobInput!) {
    job: createOrUpdateJob(job: $job, slug: $slug) {
      slug
    }
  }
`;

const client = new GraphQLClient("/api/graphql");

export default function Form({ job }) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [processing, setProcessing] = useState(false);
  const { sendNotificationSignal } = useNotification();

  async function handleSubmit(data) {
    setErrors({});
    setProcessing(true);

    try {
      await client.request(updateJobQuery, { slug: job.slug, job: data });
      window.scrollTo(0, 0);
      sendNotificationSignal({
        type: "OPEN",
        message: "Job has been updated",
        flashType: "success",
      });
    } catch (e) {
      window.scrollTo(0, 0);
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
    <div className="max-w-10xl mx-auto pb-12">
      <div className="bg-white shadow overflow-hidden rounded-md p-4 sm:p-6">
        <JobForm
          job={job}
          errors={errors}
          handleSubmit={handleSubmit}
          processing={processing}
          submitLabel="Update Job"
        />
      </div>
    </div>
  );
}
