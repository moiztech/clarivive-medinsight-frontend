"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, X, Upload, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createBlog } from "@/lib/axios/blogs";
import { BLOG_CATEGORIES, BLOG_STATUSES } from "@/lib/types/blog";
import { toast } from "sonner";

export default function AddBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "archived">("draft");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Dynamic import for React Quill (client only)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [QuillEditor, setQuillEditor] = useState<any>(null);

  useEffect(() => {
    import("react-quill-new")
      .then((mod) => {
        setQuillEditor(() => mod.default);
      })
      .catch(() => {
        // react-quill not installed, fallback to textarea
      });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title || !shortDescription || !content || !category) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("short_description", shortDescription);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("status", status);
      tags.forEach((tag) => formData.append("tags[]", tag));
      if (imageFile) {
        formData.append("featured_image", imageFile);
      }

      await createBlog(formData);
      toast.success("Blog created successfully");
      router.push("/super-admin/blogs");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const msg = err.response?.data?.message || "Failed to create blog";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/super-admin/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog Management
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new blog post. Fill in the details below.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter blog title"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value.slice(0, 200))}
                required
                rows={3}
                maxLength={200}
                placeholder="Brief description of the blog post (max 200 characters)"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200 resize-none"
              />
              <p className="mt-1 text-xs text-gray-400 text-right">
                {shortDescription.length}/200
              </p>
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Content <span className="text-red-500">*</span>
              </label>
              {QuillEditor ? (
                <>
                  <QuillEditor
                    value={content}
                    onChange={setContent}
                    theme="snow"
                    modules={quillModules}
                    placeholder="Write your blog content here..."
                    className="blog-quill-editor"
                  />
                  <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css" />
                </>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
                  placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-200 resize-y min-h-[300px]"
                />
              )}
            </div>

            {/* Category and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 cursor-pointer transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <div className="flex items-center gap-4 mt-1">
                  {BLOG_STATUSES.map((s) => (
                    <label
                      key={s}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                        status === s
                          ? s === "published"
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                            : s === "draft"
                              ? "border-amber-400 bg-amber-50 text-amber-700"
                              : "border-gray-300 bg-gray-50 text-gray-600"
                          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={status === s}
                        onChange={() => setStatus(s)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                          status === s
                            ? s === "published"
                              ? "border-emerald-500"
                              : s === "draft"
                                ? "border-amber-500"
                                : "border-gray-400"
                            : "border-gray-300"
                        }`}
                      >
                        {status === s && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              s === "published" ? "bg-emerald-500" : s === "draft" ? "bg-amber-500" : "bg-gray-400"
                            }`}
                          />
                        )}
                      </span>
                      <span className="text-sm font-medium capitalize">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all duration-200">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-indigo-900 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={tags.length === 0 ? "Type a tag and press Enter" : "Add more..."}
                    className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="p-1 rounded hover:bg-indigo-100 text-indigo-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Featured Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden ${
                  imagePreview
                    ? "border-indigo-300 bg-indigo-50/30"
                    : "border-gray-200 hover:border-indigo-400 bg-gray-50"
                }`}
              >
                {imagePreview ? (
                  <div className="relative aspect-video">
                    <Image src={imagePreview} alt="Featured image preview" fill className="object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                      <span className="text-white text-sm font-medium">Click to change image</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                      <Upload className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Click to upload featured image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Blog
              </button>
              <button
                type="button"
                onClick={() => router.push("/super-admin/blogs")}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
