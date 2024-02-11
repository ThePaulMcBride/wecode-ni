import { buildMetadata } from "app/shared-metadata";
import LoginForm from "./LoginForm";
import { getUser } from "utils/auth-config";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const generateMetadata = buildMetadata({ title: "Login" });

export default async function Login({ searchParams }) {
  const user = await getUser();

  if (user) {
    redirect("/api/verify");
  }

  const error = searchParams.error;
  return <LoginForm errorCode={error} />;
}
