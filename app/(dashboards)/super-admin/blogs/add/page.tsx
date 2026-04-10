"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlogForm from "@/components/blogs/BlogForm";
import type { Blog } from "@/data/blogData";

export default function AddBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: Partial<Blog>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("New blog data:", data);
      setIsLoading(false);
      router.push("/super-admin/blogs");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/super-admin/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog Management
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new blog post. Fill in the details below.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <BlogForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
