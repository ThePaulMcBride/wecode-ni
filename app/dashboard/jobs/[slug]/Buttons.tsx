"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "components/button";
import { Popover, PopoverOption } from "components/popover";
import { useNotification } from "utils/client/notification-context";
import { GraphQLClient } from "graphql-request";

const deleteJobQuery = `
  mutation deleteJob($slug: String!) {
    job: deleteJob(slug: $slug) {
      slug
    }
  }
`;

const client = new GraphQLClient("/api/graphql");

export function Buttons({ slug }) {
  const { sendNotificationSignal } = useNotification();
  const [deleteInFlight, setDeleteInFlight] = useState(false);

  async function deleteJob(e) {
    e.preventDefault();

    if (deleteInFlight) return;
    setDeleteInFlight(true);

    try {
      await client.request(deleteJobQuery, { slug });
      sendNotificationSignal({
        type: "OPEN",
        message: "Job successfully deleted",
        flashType: "success",
      });
    } catch (e) {
      sendNotificationSignal({
        type: "OPEN",
        message: "Something went wrong",
        flashType: "error",
      });
    } finally {
      setDeleteInFlight(false);
    }
  }

  return (
    <>
      <Popover
        className="mr-2"
        target={
          <Button iconAfter="down" color="white">
            More
          </Button>
        }
      >
        <PopoverOption
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
          onClick={deleteJob}
        >
          Delete job
        </PopoverOption>
      </Popover>
      <Link passHref href={`/jobs/${slug}`} legacyBehavior>
        <Button as="a" color="teal">
          View
        </Button>
      </Link>
    </>
  );
}
