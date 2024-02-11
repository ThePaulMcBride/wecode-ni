import config from "config";
import { Metadata, ResolvingMetadata } from "next";

export const opengraphMetadata: Metadata["openGraph"] = {
  title: config.title,
  description: config.description,
};

type MetadataArgs = {
  description?: string;
  images?: (string | { url: string; width: number; height: number })[];
} & ({ title: string } | { absoluteTitle: string });

export function buildMetadata(args: MetadataArgs) {
  return async function generateMetadata(
    _props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const parentData = await parent;

    let pageTitle;
    let title;

    if ("title" in args) {
      pageTitle = `${args.title}`;
      title = args.title;
    } else {
      pageTitle = {
        absolute: `${args.absoluteTitle}`,
      };
      title = args.absoluteTitle;
    }

    return {
      title: pageTitle,
      description: args.description || config.description,
      twitter: {
        ...parentData.twitter,
        title: `${title} | ${config.title}`,
        description: args.description || config.description,
        images: [...parentData.twitter.images, ...(args.images ?? [])],
      },
      openGraph: {
        ...parentData.openGraph,
        title: `${title} | ${config.title}`,
        description: args.description || config.description,
        images: [...(args.images ?? []), ...parentData.openGraph.images],
      },
    };
  };
}
