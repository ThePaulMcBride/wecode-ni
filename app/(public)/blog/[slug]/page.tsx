import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { Newsletter } from "components/sidebar/newsletter";
import Image from "next/legacy/image";
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import config from "config";
import { notFound } from "next/navigation";
import { buildMetadata } from "app/shared-metadata";

export const revalidate = 60;

export const generateMetadata = async (props, parent) => {
  const slug = props.params.slug;
  const apiEndpoint = config.prismicUrl;

  const api = await Prismic.getApi(apiEndpoint);
  const article = await api.getByUID("blog_post", slug, {
    fetchLinks: ["author.name", "author.avatar", "author.bio"],
  });

  if (!article) {
    notFound();
  }

  const getMetadata = await buildMetadata({
    title: `${RichText.asText(article.data.title)}`,
    description: article.data.excerpt,
    images: [
      {
        url: article.data.featured_image["16x9"].url,
        width: article.data.featured_image["16x9"].dimensions.width,
        height: article.data.featured_image["16x9"].dimensions.height,
      },
    ],
  });

  return getMetadata(props, parent);
};

export default async function BlogPost(props) {
  const slug = props.params.slug;
  const apiEndpoint = config.prismicUrl;

  const api = await Prismic.getApi(apiEndpoint);
  const article = await api.getByUID("blog_post", slug, {
    fetchLinks: ["author.name", "author.avatar", "author.bio"],
  });

  if (!article) {
    notFound();
  }

  const author = article.data.author.data;

  return (
    <div className="flex-1 mx-auto flex flex-col lg:flex-row py-6 w-full md:w-5/6 lg:w-5/6">
      <div className="lg:w-1/4" />
      <div className="lg:w-1/2 mx-4 mb-8 lg:mb-0">
        <div className="block no-underline overflow-hidden mb-6">
          <Image
            className="w-full"
            src={article.data.featured_image["16x9"].url}
            alt={article.data.featured_image["16x9"].alt}
            width={1637}
            height={921}
          />
          <div className="py-4 leading-none">
            <h1 className="text-gray-800 mb-2 font-semibold leading-tight text-2xl">
              {RichText.asText(article.data.title)}
            </h1>
            <span className="block text-gray-600 mb-8 lg:mb-12">
              <span className="text-gray-600 no-underline">
                {format(parse(article.first_publication_date), "do MMMM yyyy")}
              </span>
            </span>

            <article className="text-gray-800 prose max-w-none md:prose-lg prose-a:text-primary-500 prose-a:no-underline mb-8">
              <RichText render={article.data.content} />
            </article>

            <div className="flex p-6 border-t border-b border-gray-light">
              <div className="w-24 h-24 mr-4 items-center">
                <Image
                  className="rounded-full border shadow"
                  src={author.avatar.url}
                  alt={author.avatar.alt}
                  width={1637}
                  height={1637}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-gray-700 text-xl mb-2 font-semibold">
                  {RichText.asText(author.name)}
                </h4>
                <p className="text-gray-600">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar lg:w-1/4 mx-4">
        <Newsletter />
      </div>
    </div>
  );
}
