"use client";

import React, { useState, useMemo } from "react";
import { mockBlogs } from "@/data/blogData";
import BlogCard from "@/components/blogs/BlogCard";
import BlogSearch from "@/components/blogs/BlogSearch";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Only show published blogs on public page
  const publishedBlogs = useMemo(
    () => mockBlogs.filter((blog) => blog.status === "published"),
    []
  );

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return publishedBlogs;
    const query = searchQuery.toLowerCase();
    return publishedBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.shortDescription.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query)
    );
  }, [searchQuery, publishedBlogs]);

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-sm font-semibold text-indigo-600 mb-3 tracking-wide">
            Pricing plans
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Resources and insights
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            The latest industry news, interviews, technologies, and resources.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto">
            <BlogSearch
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setVisibleCount(INITIAL_COUNT);
              }}
              placeholder="Search"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {visibleBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visibleBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="opacity-0 animate-[fadeInUp_0.5s_ease_forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard blog={blog} variant="public" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500">
              No blogs found for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-sm font-medium text-indigo-600 bg-white border border-gray-200 rounded-full hover:border-indigo-300 hover:shadow-md transition-all duration-300"
            >
              <svg
                className="w-5 h-5 text-indigo-600 group-hover:rotate-180 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Load more
            </button>
          </div>
        )}
      </section>

      {/* Inline keyframes for fade-in animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
