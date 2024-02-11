import AdminLayout from "app/layouts/admin";
import { redirect } from "next/navigation";
import { getUser } from "utils/auth-config";
import { NotificationProvider } from "utils/client/notification-context";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user || !user.admin) {
    return redirect("/login");
  }

  return (
    <AdminLayout user={user}>
      <NotificationProvider>{children}</NotificationProvider>
    </AdminLayout>
  );
}
