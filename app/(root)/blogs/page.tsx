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
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #eef2f7, #ffffff)" }}
    >
      {/* ── Decorative background shapes ── */}

      {/* Primary diagonal wave band – crosses from left to right */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "700px" }}
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle shadow filter for layered depth */}
          <filter id="waveShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#b0c4de" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Back layer – wider, softer, lower opacity */}
        <path
          d="M-100 220 C 200 120, 500 350, 800 240 S 1200 100, 1540 260 L 1540 380 C 1200 240, 800 420, 500 340 S 180 260, -100 360 Z"
          fill="rgba(180, 200, 230, 0.28)"
          filter="url(#waveShadow)"
        />

        {/* Main wave band – muted blue, smooth curves */}
        <path
          d="M-80 260 C 220 160, 520 370, 820 260 S 1200 140, 1520 280 L 1520 360 C 1200 210, 820 400, 520 320 S 200 240, -80 350 Z"
          fill="rgba(160, 190, 230, 0.32)"
        />
      </svg>

      {/* Secondary lighter semi-transparent shape on the right */}
      <svg
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: "55%", height: "500px" }}
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M300 0 C 450 60, 600 180, 700 80 S 800 20, 800 0 Z"
          fill="rgba(195, 215, 245, 0.22)"
        />
        <path
          d="M400 0 C 520 90, 650 200, 750 120 S 810 50, 800 0 Z"
          fill="rgba(185, 210, 240, 0.16)"
        />
        <ellipse
          cx="650"
          cy="160"
          rx="220"
          ry="120"
          fill="rgba(200, 220, 250, 0.12)"
          style={{ filter: "blur(40px)" }}
        />
      </svg>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span
            className="inline-block text-sm font-semibold mb-3 tracking-wide"
            style={{ color: "#6941C6" }}
          >
            Our blog
          </span>
          <h1
            className="text-3xl md:text-[46px] font-bold leading-tight tracking-tight"
            style={{ color: "#42307D" }}
          >
            Resources and insights
          </h1>
          <p
            className="mt-4 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#6941C6" }}
          >
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
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
            <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8"
                style={{ color: "#667085" }}
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
            <p style={{ color: "#667085" }}>
              No blogs found for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-sm font-medium bg-white border rounded-full hover:shadow-md transition-all duration-300"
              style={{ color: "#6941C6", borderColor: "#D0D5DD" }}
            >
              <svg
                className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                style={{ color: "#6941C6" }}
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
