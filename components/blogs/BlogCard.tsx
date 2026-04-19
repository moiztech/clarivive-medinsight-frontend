"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Blog } from "@/lib/types/blog";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const STORAGE_BASE = API_BASE.replace(/\/api$/, "") + "/storage/";

interface BlogCardProps {
  blog: Blog;
  variant?: "public" | "compact";
}

const categoryColors: Record<string, string> = {
  Health: "#027A48",
  Training: "#6941C6",
  Nutrition: "#C11574",
  Medical: "#3538CD",
  General: "#026AA2",
};

function getImageUrl(blog: Blog) {
  if (!blog.featured_image) return "/placeholder.jpg";
  if (blog.featured_image.startsWith("http")) return blog.featured_image;
  return STORAGE_BASE + blog.featured_image;
}

export default function BlogCard({ blog, variant = "public" }: BlogCardProps) {
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (variant === "compact") {
    return (
      <Link href={`/blogs/${blog.slug || blog.id}`} className="group block">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={getImageUrl(blog)}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <span
              className="text-sm font-semibold"
              style={{ color: categoryColors[blog.category] || "#6941C6" }}
            >
              {blog.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {blog.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {blog.short_description}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {blog.author?.avatar ? (
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  {blog.author?.name?.charAt(0) || "?"}
                </div>
              )}
              <span className="text-xs text-gray-600">
                {blog.author?.name || "Unknown"} &middot; {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
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
          {/* Category */}
          <span
            className="text-sm font-semibold"
            style={{ color: categoryColors[blog.category] || "#6941C6" }}
          >
            {blog.category}
          </span>

          {/* Title with arrow */}
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

          {/* Description */}
          <p
            className="mt-2 text-sm leading-relaxed line-clamp-2 flex-1"
            style={{ color: "#667085" }}
          >
            {blog.short_description}
          </p>

          {/* Author */}
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
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
