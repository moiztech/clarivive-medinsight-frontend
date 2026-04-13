"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Heart,
  Edit2,
  Loader2,
} from "lucide-react";
import { getAdminBlogById } from "@/lib/axios/blogs";
import type { Blog } from "@/lib/types/blog";
import BlogStatusBadge from "@/components/blogs/BlogStatusBadge";
import DOMPurify from "dompurify";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const STORAGE_BASE = API_BASE.replace(/\/api$/, "") + "/storage/";

export default function AdminBlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        setNotFound(false);
        const blogData = await getAdminBlogById(blogId);
        if (!blogData) {
          setNotFound(true);
          return;
        }
        setBlog(blogData);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  const getImageUrl = (b: Blog) => {
    if (!b.featured_image) return "/placeholder.jpg";
    if (b.featured_image.startsWith("http")) return b.featured_image;
    return STORAGE_BASE + b.featured_image;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog not found</h1>
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

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/super-admin/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog Management
          </Link>
          <Link
            href={`/super-admin/blogs/edit/${blog.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit Blog
          </Link>
        </div>

        {/* Blog Content Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Featured Image */}
          <div className="relative aspect-[16/7] overflow-hidden bg-gray-100">
            <Image
              src={getImageUrl(blog)}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 md:p-8">
            {/* Status & Category */}
            <div className="flex items-center gap-3 mb-4">
              <BlogStatusBadge status={blog.status} />
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>

            {/* Short Description */}
            <p className="mt-3 text-gray-500 leading-relaxed">
              {blog.short_description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-100">
              {blog.author && (
                <div className="flex items-center gap-3">
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
                  <span className="text-sm font-medium text-gray-900">
                    {blog.author.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
              {blog.views > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  {blog.views.toLocaleString()} views
                </div>
              )}
              {blog.likes > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Heart className="w-4 h-4" />
                  {blog.likes}
                </div>
              )}
            </div>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Full Content */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Full Content
              </h3>
              <div
                className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-indigo-600"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.content),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
