import algoliasearch from "algoliasearch";
import { NextResponse } from "next/server";
import { getLiveJobs } from "utils/server/jobs";

const algoliaId = process.env.ALGOLIA_APP_ID;
const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY;
const client = algoliasearch(algoliaId, algoliaAdminKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const allJobs = await getLiveJobs();

  if (key !== process.env.CRON_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  // 1. Initialize the target and temporary indices
  const index = client.initIndex("jobs");
  const tmpIndex = client.initIndex("jobs_tmp");

  // 2. Copy the settings, synonyms and rules (but not the records)
  client.copyIndex(index.indexName, tmpIndex.indexName, {
    scope: ["settings", "synonyms", "rules"],
  });

  // 3. Fetch your data and push it to the temporary index
  const promises = allJobs.map((job) =>
    tmpIndex.saveObject({ ...job, objectID: job.slug })
  );
  await Promise.all(promises);

  // 4. Move the temporary index to the target index
  await client.moveIndex(tmpIndex.indexName, index.indexName);

  return NextResponse.json({ success: true, indexJobCount: allJobs.length });
}
