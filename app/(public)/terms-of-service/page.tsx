import config from "config";
import Prismic from "prismic-javascript";
import PrismicPage from "components/prismic-page";
import { buildMetadata } from "app/shared-metadata";

export const generateMetadata = buildMetadata({ title: "Terms of Service" });

export default async function PrivacyPolicyPage() {
  const api = await Prismic.getApi(config.prismicUrl);
  const document = await api.getSingle("terms_of_service");

  return <PrismicPage document={document} />;
}
