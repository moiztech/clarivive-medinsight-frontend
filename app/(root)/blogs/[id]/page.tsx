"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { mockBlogs } from "@/data/blogData";
import DOMPurify from "dompurify";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;

  const blog = mockBlogs.find((b) => b.id === blogId);

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    return mockBlogs
      .filter(
        (b) =>
          b.id !== blog.id &&
          b.status === "published" &&
          (b.category === blog.category ||
            b.tags.some((tag) => blog.tags.includes(tag)))
      )
      .slice(0, 2);
  }, [blog]);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Title Section — Centered */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] md:leading-[1.2] font-bold text-gray-900">
          {blog.title}
        </h1>
        <p className="mt-4 text-gray-400 text-sm">
          {formattedDate}
        </p>
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

      {/* Other News Section */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
              Other News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {relatedBlogs.map((related) => {
                const relatedDate = new Date(
                  related.createdAt
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.id}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        {/* Title with arrow */}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {related.title}
                          </h3>
                          <div className="shrink-0 mt-0.5">
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                          </div>
                        </div>

                        {/* Meta: Author + Date */}
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                          <Image
                            src={related.authorAvatar}
                            alt={related.author}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <span className="text-gray-600 font-medium">
                            {related.author}
                          </span>
                          <span>·</span>
                          <span>{relatedDate}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
