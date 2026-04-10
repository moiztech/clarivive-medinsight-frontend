"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { mockBlogs } from "@/data/blogData";
import type { Blog } from "@/data/blogData";
import BlogSearch from "@/components/blogs/BlogSearch";
import BlogFilters from "@/components/blogs/BlogFilters";
import BlogStatusBadge from "@/components/blogs/BlogStatusBadge";
import DeleteConfirmModal from "@/components/blogs/DeleteConfirmModal";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blogId: string | null }>({
    isOpen: false,
    blogId: null,
  });

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.shortDescription.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== "All") {
      result = result.filter(
        (blog) => blog.status === selectedStatus.toLowerCase()
      );
    }

    return result;
  }, [blogs, searchQuery, selectedCategory, selectedStatus]);

  const handleDelete = (blogId: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Blog Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all blog posts, create new ones, or edit existing content.
            </p>
          </div>
          <Link
            href="/super-admin/blogs/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            Add New Blog
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 max-w-md">
              <BlogSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search blogs by title..."
              />
            </div>
            <BlogFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredBlogs.length}</span> blog{filteredBlogs.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredBlogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Blog
                    </th>
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Tags
                    </th>
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBlogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Blog Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[250px]">
                              {blog.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[250px] mt-0.5">
                              {blog.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-600">
                          {blog.category}
                        </span>
                      </td>

                      {/* Tags */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <BlogStatusBadge status={blog.status} />
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-gray-500">
                          {formatDate(blog.createdAt)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/super-admin/blogs/${blog.id}`}
                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/super-admin/blogs/edit/${blog.id}`}
                            className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() =>
                              setDeleteModal({ isOpen: true, blogId: blog.id })
                            }
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No blogs found</p>
              <p className="text-gray-400 text-xs mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
        onConfirm={() => {
          if (deleteModal.blogId) {
            handleDelete(deleteModal.blogId);
          }
        }}
      />
    </div>
  );
}
