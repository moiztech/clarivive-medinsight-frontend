"use client";

import React, { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { mockBlogs } from "@/data/blogData";
import DOMPurify from "dompurify";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;
  const [currentPage, setCurrentPage] = useState(0);

  const blog = mockBlogs.find((b) => b.id === blogId);

  // Get all other published blogs (not just related by category)
  const otherBlogs = useMemo(() => {
    if (!blog) return [];
    return mockBlogs.filter(
      (b) => b.id !== blog.id && b.status === "published"
    );
  }, [blog]);

  // Paginate: show 2 cards per page
  const CARDS_PER_PAGE = 2;
  const totalPages = Math.ceil(otherBlogs.length / CARDS_PER_PAGE);
  const visibleOtherBlogs = otherBlogs.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const handleDotClick = useCallback((pageIndex: number) => {
    setCurrentPage(pageIndex);
  }, []);

  if (!blog) {
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

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Estimate reading time (~200 words per minute)
  const wordCount = blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-white">
      {/* Title Section — Centered */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] md:leading-[1.2] font-bold text-gray-900">
          {blog.title}
        </h1>
        <p className="mt-4 text-gray-400 text-sm">{formattedDate}</p>
      </section>

      {/* Hero Image — Full width within container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-xl overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Content */}
        <div
          className="prose prose-base md:prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-500 prose-p:leading-[1.8] prose-a:text-indigo-600 prose-strong:text-gray-800 prose-ul:text-gray-500 prose-li:text-gray-500 prose-li:leading-[1.8]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
        />
      </article>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* Other News Section — Matching Figma design exactly    */}
      {/* ═══════════════════════════════════════════════════════ */}
      {otherBlogs.length > 0 && (
        <section
          style={{ background: "#FAF6F1" }}
          className="relative"
        >
          {/* Blue top border */}


          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14">
            {/* Heading */}
            <h2
              className="text-2xl md:text-[32px] font-bold mb-10"
              style={{
                color: "#1A1A2E",
                fontFamily:
                  "Georgia, 'Times New Roman', 'Noto Serif', serif",
              }}
            >
              Other News
            </h2>

            {/* Card Grid — 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {visibleOtherBlogs.map((related) => {
                const relatedDate = new Date(
                  related.createdAt
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                // Estimate reading time for related blog
                const relWordCount = related.content
                  .replace(/<[^>]*>/g, "")
                  .split(/\s+/).length;
                const relReadTime = Math.max(
                  1,
                  Math.ceil(relWordCount / 200)
                );

                return (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.id}`}
                    className="group block"
                  >
                    <article>
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="pt-5">
                        {/* Title */}
                        <h3
                          className="text-base md:text-lg font-semibold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity"
                          style={{ color: "#1A1A2E" }}
                        >
                          {related.title}
                        </h3>

                        {/* Meta: Reading time + Date */}
                        <p
                          className="mt-2 text-sm"
                          style={{ color: "#98A2B3" }}
                        >
                          {relReadTime} Min &bull; {relatedDate}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Dots */}
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
                      background:
                        currentPage === i
                          ? "#8B7355"
                          : "#D5CCBF",
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
