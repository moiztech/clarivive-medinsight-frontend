"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Blog } from "@/data/blogData";

interface BlogCardProps {
  blog: Blog;
  variant?: "public" | "compact";
}

const categoryColors: Record<string, string> = {
  Health: "text-emerald-600",
  Training: "text-indigo-600",
  Nutrition: "text-orange-600",
  Medical: "text-blue-600",
  General: "text-purple-600",
};

export default function BlogCard({ blog, variant = "public" }: BlogCardProps) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (variant === "compact") {
    return (
      <Link href={`/blogs/${blog.id}`} className="group block">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <span className={`text-sm font-semibold ${categoryColors[blog.category] || "text-indigo-600"}`}>
              {blog.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {blog.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {blog.shortDescription}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Image
                src={blog.authorAvatar}
                alt={blog.author}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-xs text-gray-600">
                {blog.author} · {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${blog.id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Category */}
          <span
            className={`text-sm font-semibold ${categoryColors[blog.category] || "text-indigo-600"}`}
          >
            {blog.category}
          </span>

          {/* Title with arrow */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <div className="shrink-0 mt-0.5">
              <ArrowUpRight className="w-5 h-5 text-gray-900 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-gray-500 text-sm leading-relaxed line-clamp-2">
            {blog.shortDescription}
          </p>

          {/* Author */}
          <div className="mt-4 flex items-center gap-3">
            <Image
              src={blog.authorAvatar}
              alt={blog.author}
              width={32}
              height={32}
              className="rounded-full ring-2 ring-white"
            />
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-medium text-gray-900">{blog.author}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{formattedDate}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
