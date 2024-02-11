import * as React from "react";
import { render } from "@react-email/render";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Container } from "@react-email/container";
import { Font } from "@react-email/font";
import { Section } from "@react-email/section";
import { Column } from "@react-email/column";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";
import config from "../config";

type EmailJob = {
  title: string;
  companyTitle: string;
  location: string;
  slug: string;
  shortDescription: string;
};

const defaultJobs = [
  {
    title: "Senior Software Engineer",
    companyTitle: "Kainos",
    location: "Belfast",
    slug: "senior-software-engineer-1",
    shortDescription:
      "We are looking for a Senior Software Engineer to join our team in Belfast. You will be working as part of a team within a large-scale digital transformation programme, with the opportunity to work with the latest technologies in the cloud.",
  },
  {
    title: "Lead Developer",
    companyTitle: "Apple",
    location: "Dublin",
    slug: "lead-developer-1",
    shortDescription:
      "We are looking for a Lead Developer to join our team in Dublin. You will be working as part of a team within a large-scale digital transformation programme, with the opportunity to work with the latest technologies in the cloud.",
  },
];

export default function Email({ jobs = defaultJobs }: { jobs: EmailJob[] }) {
  return (
    <Html style={{ backgroundColor: "#ffffff" }}>
      <Head>
        <title>WeCode NI Jobs Update</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Container
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Section style={{ marginBottom: "24px" }}>
          <Column>
            <Link href={`${config.url}?ref=newsletter`}>
              <Img
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: "600px",
                }}
                src={`${config.url}/images/email-header.png`}
              />
            </Link>
          </Column>
        </Section>
        <Section>
          <Column>
            <Text style={{ fontSize: "18px", color: "#303030" }}>Hey!</Text>
            <Text style={{ fontSize: "18px", color: "#303030" }}>
              Check out the latest jobs on WeCode NI, the best place to find a
              job as a developer in Northern Ireland!
            </Text>
          </Column>
        </Section>
        <Hr style={{}} />
        {jobs.map((job) => (
          <React.Fragment key={job.slug}>
            <Section>
              <Column>
                <Link
                  style={{
                    fontSize: "24px",
                    color: "#303030",
                    fontWeight: "bold",
                    margin: "16px 0",
                    display: "block",
                  }}
                  href={`${config.url}/jobs/${job.slug}?ref=newsletter`}
                >
                  {job.title} - {job.companyTitle}
                </Link>

                <Text style={{ fontSize: "18px", color: "#555555" }}>
                  {job.location}
                </Text>
                <Text style={{ fontSize: "18px", color: "#303030" }}>
                  {job.shortDescription}
                </Text>
                <Link
                  style={{
                    fontSize: "18px",
                    color: "#4DC0B5",
                    fontWeight: "bold",
                    display: "block",
                    margin: "16px 0",
                  }}
                  href={`${config.url}/jobs/${job.slug}?ref=newsletter`}
                >
                  Read More
                </Link>
              </Column>
            </Section>
            <Hr />
          </React.Fragment>
        ))}

        <Section style={{ marginTop: "24px", marginBottom: "24p" }}>
          <Column style={{ textAlign: "center" }}>
            <Button
              href={`${config.url}?ref=newsletter`}
              style={{
                backgroundColor: "#4DC0B5",
                marginRight: "12px",
                color: "#ffffff",
                borderRadius: "4px",
                fontSize: "18px",
                padding: "12px 20px",
              }}
            >
              View all Jobs
            </Button>
            <Button
              href="https://wecodeni.com/login?ref=newsletter"
              style={{
                backgroundColor: "#4DC0B5",
                margin: "0 auto",
                color: "#ffffff",
                borderRadius: "4px",
                fontSize: "18px",
                padding: "12px 20px",
              }}
            >
              Post a Job
            </Button>
          </Column>
        </Section>
      </Container>
    </Html>
  );
}

export function getHtml(jobs: EmailJob[]) {
  return render(<Email jobs={jobs} />);
}
