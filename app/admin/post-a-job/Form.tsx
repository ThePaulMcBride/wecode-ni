"use client";

import { JobForm, JobProps } from "components/JobForm";
import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { useNotification } from "utils/client/notification-context";

const client = new GraphQLClient("/api/graphql");

const createJobQuery = `
  mutation CreateOrUpdateJob($job: CreateJobInput) {
    job: createOrUpdateJob(job: $job) {
      slug
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

export default function Form() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { sendNotificationSignal, redirectWithNotification } =
    useNotification();

  async function handleSubmit(job) {
    if (processing) return;
    setErrors({});
    setProcessing(true);

    try {
      await client.request(createJobQuery, { job });
      redirectWithNotification({
        route: "/admin/jobs",
        message: "Job has been posted",
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
    <JobForm
      job={defaultValues}
      handleSubmit={handleSubmit}
      submitLabel="Create Job"
      processing={processing}
      errors={errors}
    />
  );
}
