import { redirect } from "next/navigation";

export default function SuperAdminDashboard() {
  // Redirect to the original Laravel Super Admin Dashboard
  redirect("http://admin.localhost:8000/dashboard");
}
