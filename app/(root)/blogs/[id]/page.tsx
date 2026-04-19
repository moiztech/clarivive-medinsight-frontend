"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, Heart, Calendar, Loader2 } from "lucide-react";
import { getPublicBlogById, getPublicBlogs } from "@/lib/axios/blogs";
import type { Blog } from "@/lib/types/blog";
import DOMPurify from "dompurify";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const STORAGE_BASE = API_BASE.replace(/\/api$/, "") + "/storage/";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        setNotFound(false);
        setError(null);
        const blogData = await getPublicBlogById(blogId);
        if (!blogData) {
          setNotFound(true);
          return;
        }
        setBlog(blogData);

        // Fetch related blogs (same category)
        if (blogData.category) {
          try {
            const relatedRes = await getPublicBlogs({ category: blogData.category, per_page: 4 });
            const related = (relatedRes.data || []).filter((b: Blog) => b.id !== blogData.id).slice(0, 3);
            setRelatedBlogs(related);
          } catch {
            // Silently fail - related blogs are nice-to-have
          }
        }
      } catch {
        setNotFound(true);
        setError("Blog not found or failed to load.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  // Auto-slide for related blogs
  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(relatedBlogs.length / CARDS_PER_PAGE);
  const visibleRelated = relatedBlogs.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  useEffect(() => {
    if (totalPages <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalPages]);

  const handleDotClick = useCallback((pageIndex: number) => {
    setCurrentPage(pageIndex);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
  }, [totalPages]);

  const getImageUrl = (b: Blog) => {
    if (!b.featured_image) return "/placeholder.jpg";
    if (b.featured_image.startsWith("http")) return b.featured_image;
    return STORAGE_BASE + b.featured_image;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog not found
          </h1>
          <p className="text-gray-500 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const wordCount = blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-white">
      {/* Title Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] md:leading-[1.2] font-bold text-gray-900">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          <span>{readingTime} min read</span>
          {blog.views > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {blog.views.toLocaleString()} views
            </span>
          )}
          {blog.likes > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {blog.likes}
            </span>
          )}
        </div>

        {/* Author */}
        {blog.author && (
          <div className="mt-4 flex items-center justify-center gap-3">
            {blog.author.avatar ? (
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                {blog.author.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700">{blog.author.name}</span>
          </div>
        )}

        {/* Category & Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
            {blog.category}
          </span>
          {(blog.tags || []).map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-xl overflow-hidden">
          <Image
            src={getImageUrl(blog)}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div
          className="prose prose-base md:prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-500 prose-p:leading-[1.8] prose-a:text-indigo-600 prose-strong:text-gray-800 prose-ul:text-gray-500 prose-li:text-gray-500 prose-li:leading-[1.8]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
        />
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section style={{ background: "#EFF6FF" }} className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14">
            <h2
              className="text-2xl md:text-[32px] font-bold mb-10"
              style={{
                color: "#1A1A2E",
                fontFamily: "Georgia, 'Times New Roman', 'Noto Serif', serif",
              }}
            >
              Related News
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visibleRelated.map((related) => {
                const relatedDate = new Date(related.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                const relWordCount = related.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
                const relReadTime = Math.max(1, Math.ceil(relWordCount / 200));

                return (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.slug || related.id}`}
                    className="group block"
                  >
                    <article>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={getImageUrl(related)}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="pt-5">
                        <h3
                          className="text-base md:text-lg font-semibold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity"
                          style={{ color: "#1A1A2E" }}
                        >
                          {related.title}
                        </h3>
                        <p className="mt-2 text-sm" style={{ color: "#98A2B3" }}>
                          {relReadTime} Min &bull; {relatedDate}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2.5 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: currentPage === i ? "12px" : "10px",
                      height: currentPage === i ? "12px" : "10px",
                      background: currentPage === i ? "#8B7355" : "#D5CCBF",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
