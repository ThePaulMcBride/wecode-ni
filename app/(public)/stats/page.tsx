import { buildMetadata } from "app/shared-metadata";
import Script from "next/script";

export const dynamic = "force-dynamic";
export const generateMetadata = buildMetadata({ title: "Stats" });

export default function StatsPage({ searchParams }) {
  const page = searchParams.page;
  let embedUrl =
    "https://plausible.io/share/wecodeni.com?auth=FSqLpLV8Bn2g76r750E3_&embed=true&theme=light&background=transparent";

  if (page) {
    embedUrl += `&page=${page}`;
  }

  return (
    <main className="flex-1 px-6">
      <iframe
        plausible-embed=""
        src={embedUrl}
        // loading="lazy"
        style={{
          width: "1px",
          minWidth: "100%",
          height: "1900px",
        }}
      ></iframe>
      <Script async src="https://plausible.io/js/embed.host.js" />
    </main>
  );
}
