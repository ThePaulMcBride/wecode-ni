import { MetadataRoute } from "next";
import config from "../config";
import { getLiveJobs } from "utils/server/jobs";
import Prismic from "prismic-javascript";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rootUrl = config.url;

  const tags = config.tags.map(({ value }) => {
    return {
      url: `${rootUrl}/search/${encodeURI(value)}`,
      lastModified: new Date(),
    };
  });

  const jobsArray = await getLiveJobs();

  const jobs = jobsArray.map((job) => {
    return {
      url: `${rootUrl}/jobs/${job.slug}`,
      lastModified: job.publishedAt,
    };
  });

  const apiEndpoint = config.prismicUrl;

  const api = await Prismic.getApi(apiEndpoint);
  const data = await api.query(
    Prismic.Predicates.at("document.type", "blog_post"),
    {
      orderings: "[document.last_publication_date desc]",
    }
  );

  const blogPosts = data.results.map((post) => {
    return {
      url: `${rootUrl}/blog/${post.uid}`,
      lastModified: new Date(post.last_publication_date),
    };
  });

  return [
    {
      url: rootUrl,
      lastModified: new Date(),
    },
    {
      url: `${rootUrl}/blog`,
    },
    {
      url: `${rootUrl}/pricing`,
    },
    {
      url: `${rootUrl}/login`,
    },
  ]
    .concat(tags)
    .concat(jobs)
    .concat(blogPosts);
}
