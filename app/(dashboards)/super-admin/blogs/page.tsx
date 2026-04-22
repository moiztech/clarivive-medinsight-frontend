"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FakeAdminBlogsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the real Laravel backend
    window.location.href = "http://admin.localhost:8000/blogs";
  }, []);

  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Redirecting to Admin Dashboard...</p>
      </div>
    </div>
  );
}
