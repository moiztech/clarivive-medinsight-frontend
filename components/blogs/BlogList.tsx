"use client";

import React from "react";
import type { Blog } from "@/data/blogData";
import BlogCard from "./BlogCard";

interface BlogListProps {
  blogs: Blog[];
  variant?: "public" | "compact";
  emptyMessage?: string;
}

export default function BlogList({
  blogs,
  variant = "public",
  emptyMessage = "No blogs found.",
}: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} variant="public" />
      ))}
    </div>
  );
}
