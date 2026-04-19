import { redirect } from "next/navigation";

export default function SuperAdminDashboard() {
  // Currently, the main feature for Super Admin is the blogs management.
  // Redirect them automatically so they don't see a 404.
  redirect("/super-admin/blogs");
}
