import config from "config";
import Prismic from "prismic-javascript";
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import Link from "next/link";
import Image from "next/legacy/image";
import { RichText } from "prismic-reactjs";
import { Newsletter } from "components/sidebar/newsletter";
import { WhyPost } from "components/sidebar/why-post";
import { buildMetadata } from "app/shared-metadata";

export const revalidate = 60;

export const generateMetadata = buildMetadata({
  title: `Blog Posts and News Articles | ${config.title}`,
  description:
    "Interested in hiring developers or finding a new job in Northern Ireland? On the WeCode NI blog we'll share our thoughts on the local industry.",
});

export default async function BlogPage() {
  const apiEndpoint = config.prismicUrl;
  const api = await Prismic.getApi(apiEndpoint);
  const data = await api.query(
    Prismic.Predicates.at("document.type", "blog_post"),
    {
      orderings: "[document.last_publication_date desc]",
      fetchLinks: ["author.name", "author.avatar"],
    }
  );

  function renderPosts() {
    const posts = data.results;

    return posts.map((post, index) => {
      const author = post.data.author.data;
      if (index === 0) {
        return (
          <Link
            key={post.uid}
            as={`/blog/${post.uid}`}
            href={`/blog/[slug]`}
            className="block rounded no-underline overflow-hidden shadow bg-white mb-6"
          >
            <Image
              className="w-full"
              src={post.data.featured_image["16x9"].url}
              alt={post.data.featured_image["16x9"].alt}
              width={post.data.featured_image["16x9"].dimensions.width}
              height={post.data.featured_image["16x9"].dimensions.height}
            />
            <div className="px-6 py-4 leading-normal">
              <h2 className="font-bold text-gray-800 text-3xl mb-2">
                {RichText.asText(post.data.title)}
              </h2>
              <p className="text-gray-700 text-base mb-6">
                {post.data.excerpt}
              </p>
              <div className="flex items-center">
                {author && (
                  <div className="mr-4">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={author.avatar.url}
                      alt={author.avatar.alt}
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <div className="text-sm">
                  {author && (
                    <p className="text-black leading-none">
                      {RichText.asText(author.name)}
                    </p>
                  )}
                  <p className="text-gray-600">
                    {format(parse(post.first_publication_date), "do MMMM yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      }

      return (
        <Link
          key={post.uid}
          as={`/blog/${post.uid}`}
          href={`/blog/[slug]`}
          className="block lg:flex rounded no-underline overflow-hidden shadow bg-white mb-6"
        >
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url('${post.data.featured_image["16x9"].url}')`,
            }}
            title={post.data.featured_image["16x9"].alt}
          />
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-6">
              <h2 className="text-gray-800 font-bold text-2xl mb-2">
                {RichText.asText(post.data.title)}
              </h2>
              <p className="text-gray-700 text-base">{post.data.excerpt}</p>
            </div>
            <div className="flex items-center">
              {author && (
                <div className="mr-4">
                  <Image
                    className="w-10 h-10 rounded-full mr-4"
                    src={author.avatar.url}
                    alt={author.avatar.alt}
                    width={40}
                    height={40}
                  />
                </div>
              )}
              <div className="text-sm">
                {author && (
                  <p className="text-black leading-none">
                    {RichText.asText(author.name)}
                  </p>
                )}
                <p className="text-gray-600">
                  {format(parse(post.first_publication_date), "do MMMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <main className="flex-1">
      <div
        id="jobs"
        className="container mx-auto flex flex-col lg:flex-row py-6"
      >
        <div className="jobs lg:w-2/3 mx-4">{renderPosts()}</div>
        <div className="sidebar lg:w-1/3 mx-4">
          <Newsletter />
          <WhyPost />
        </div>
      </div>
    </main>
  );
}
