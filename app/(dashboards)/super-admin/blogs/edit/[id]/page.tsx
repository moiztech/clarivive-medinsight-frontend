"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlogForm from "@/components/blogs/BlogForm";
import { mockBlogs } from "@/data/blogData";
import type { Blog } from "@/data/blogData";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);

  const blog = mockBlogs.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog not found
          </h1>
          <p className="text-gray-500 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/super-admin/blogs"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: Partial<Blog>) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Updated blog data:", { id: blogId, ...data });
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update the details of &quot;{blog.title}&quot;
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <BlogForm
            initialData={blog}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
