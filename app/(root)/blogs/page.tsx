"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2, Search } from "lucide-react";
import { getPublicBlogs, getBlogCategories } from "@/lib/axios/blogs";
import type { Blog } from "@/lib/types/blog";
import BlogSearch from "@/components/blogs/BlogSearch";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const STORAGE_BASE = API_BASE.replace(/\/api$/, "") + "/storage/";

const categoryColors: Record<string, string> = {
  Health: "#027A48",
  Training: "#6941C6",
  Nutrition: "#C11574",
  Medical: "#3538CD",
  General: "#026AA2",
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>(["Health", "Training", "Nutrition", "Medical", "General"]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBlogs = useCallback(
    async (page = 1, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const params: Record<string, string | number> = { page };
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (selectedCategory !== "All") params.category = selectedCategory;

        const res = await getPublicBlogs(params);
        const data = res.data || [];
        const pagination = res;

        if (append) {
          setBlogs((prev) => [...prev, ...data]);
        } else {
          setBlogs(data);
        }
        setLastPage(pagination.last_page || 1);
        setTotal(pagination.total || 0);
        setCurrentPage(pagination.current_page || page);
      } catch {
        setError("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchQuery, selectedCategory],
  );

  // Initial fetch + refetch on filter change
  useEffect(() => {
    fetchBlogs(1, false);
  }, [fetchBlogs]);

  // Fetch unique categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await getBlogCategories();
        if (cats && cats.length > 0) {
          setCategories(cats);
        }
      } catch (err) {
        console.error("Failed to fetch blog categories:", err);
      }
    };
    fetchCats();
  }, []);

  // Debounced search
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // fetchBlogs will re-trigger via the useEffect
    }, 500);
  };

  const handleLoadMore = () => {
    if (currentPage < lastPage) {
      fetchBlogs(currentPage + 1, true);
    }
  };

  const hasMore = currentPage < lastPage;

  const getImageUrl = (blog: Blog) => {
    if (!blog.featured_image) return "/placeholder.jpg";
    if (blog.featured_image.startsWith("http")) return blog.featured_image;
    return STORAGE_BASE + blog.featured_image;
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #eef2f7, #ffffff)" }}
    >
      {/* Decorative background shapes */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "700px" }}
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="waveShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#b0c4de" floodOpacity="0.18" />
          </filter>
        </defs>
        <path
          d="M-100 220 C 200 120, 500 350, 800 240 S 1200 100, 1540 260 L 1540 380 C 1200 240, 800 420, 500 340 S 180 260, -100 360 Z"
          fill="rgba(180, 200, 230, 0.28)"
          filter="url(#waveShadow)"
        />
        <path
          d="M-80 260 C 220 160, 520 370, 820 260 S 1200 140, 1520 280 L 1520 360 C 1200 210, 820 400, 520 320 S 200 240, -80 350 Z"
          fill="rgba(160, 190, 230, 0.32)"
        />
      </svg>

      <svg
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: "55%", height: "500px" }}
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M300 0 C 450 60, 600 180, 700 80 S 800 20, 800 0 Z" fill="rgba(195, 215, 245, 0.22)" />
        <path d="M400 0 C 520 90, 650 200, 750 120 S 810 50, 800 0 Z" fill="rgba(185, 210, 240, 0.16)" />
        <ellipse cx="650" cy="160" rx="220" ry="120" fill="rgba(200, 220, 250, 0.12)" style={{ filter: "blur(40px)" }} />
      </svg>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-sm font-semibold mb-3 tracking-wide" style={{ color: "#6941C6" }}>
            Our blog
          </span>
          <h1 className="text-3xl md:text-[46px] font-bold leading-tight tracking-tight" style={{ color: "#42307D" }}>
            Resources and insights
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#6941C6" }}>
            The latest industry news, interviews, technologies, and resources.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto">
            <BlogSearch
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#6941C6" }} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-500 text-center">{error}</p>
            <button
              onClick={() => fetchBlogs(1, false)}
              className="mt-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : blogs.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-medium text-gray-900">{blogs.length}</span> of{" "}
              <span className="font-medium text-gray-900">{total}</span> blogs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="opacity-0 animate-[fadeInUp_0.5s_ease_forwards]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/blogs/${blog.slug || blog.id}`} className="group block h-full">
                    <article className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImageUrl(blog)}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: categoryColors[blog.category] || "#6941C6" }}
                        >
                          {blog.category}
                        </span>

                        <div className="mt-2 flex items-start justify-between gap-3">
                          <h3
                            className="text-lg font-semibold leading-snug group-hover:opacity-80 transition-opacity line-clamp-2"
                            style={{ color: "#101828" }}
                          >
                            {blog.title}
                          </h3>
                          <div className="shrink-0 mt-0.5">
                            <ArrowUpRight
                              className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                              style={{ color: "#101828" }}
                            />
                          </div>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: "#667085" }}>
                          {blog.short_description}
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                          {blog.author?.avatar ? (
                            <Image
                              src={blog.author.avatar}
                              alt={blog.author.name}
                              width={36}
                              height={36}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                              {blog.author?.name?.charAt(0) || "?"}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold" style={{ color: "#101828" }}>
                              {blog.author?.name || "Unknown"}
                            </span>
                            <span className="text-sm" style={{ color: "#667085" }}>
                              {new Date(blog.created_at).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="group inline-flex items-center gap-2.5 px-7 py-3 text-sm font-medium bg-white border rounded-full hover:shadow-md transition-all duration-300 disabled:opacity-50"
                  style={{ color: "#6941C6", borderColor: "#D0D5DD" }}
                >
                  {loadingMore ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
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
                  )}
                  Load more
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mb-4">
              <Search className="w-8 h-8" style={{ color: "#667085" }} />
            </div>
            <p className="text-lg font-medium" style={{ color: "#101828" }}>
              No blogs found
            </p>
            {searchQuery && (
              <p style={{ color: "#667085" }}>
                No results for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>
        )}
      </section>

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
