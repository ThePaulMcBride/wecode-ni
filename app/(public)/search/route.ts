import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const baseUrl = new URL(request.url).origin;

  if (!search) {
    return redirect(baseUrl);
  }

  const safeSearch = encodeURIComponent(search as string);
  const url = `${baseUrl}/search/${safeSearch}`;

  return redirect(url);
}
