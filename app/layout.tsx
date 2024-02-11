import "styles/styles.css";
import config from "config";
import { opengraphMetadata } from "./shared-metadata";
import PlausibleProvider from "next-plausible";
import { Providers } from "components/Providers";

export const metadata = {
  metadataBase: new URL(config.url),
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
  twitter: {
    card: "summary",
    title: config.title,
    description: config.description,
    creator: config.twitterHandle,
  },
  openGraph: {
    ...opengraphMetadata,
  },
};

const jsonLd = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  url: config.url,
  name: config.title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <PlausibleProvider domain="wecodeni.com" exclude="/admin**" />
      </head>
      <body className="bg-gray-100 h-full">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
