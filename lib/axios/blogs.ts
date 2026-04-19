import { serverApi } from "./server";
import protectedApi from "./protected";
import type { Blog, BlogPagination } from "@/lib/types/blog";

// ── Public routes (no auth) use serverApi (NEXT_PUBLIC_API_BASE_URL) ──

export async function getPublicBlogs(
  params?: Record<string, string | number>,
): Promise<BlogPagination> {
  const res = await serverApi.get("/blogs", { params });
  // Backend wraps: { success, message, data: { data: [...], current_page, ... } }
  return res.data.data;
}

export async function getPublicBlogById(id: string): Promise<Blog> {
  const res = await serverApi.get(`/blogs/${id}`);
  // Backend wraps: { success, message, data: Blog }
  return res.data.data;
}

// ── Admin routes (auth required) use protectedApi ──

export async function getAdminBlogs(
  params?: Record<string, string | number>,
): Promise<BlogPagination> {
  const res = await protectedApi.get("/admin/blogs", { params });
  return res.data.data;
}

export async function getAdminBlogById(id: string): Promise<Blog> {
  // Reuse public show endpoint — returns the blog regardless of status
  const res = await serverApi.get(`/blogs/${id}`);
  return res.data.data;
}

export async function createBlog(formData: FormData) {
  const res = await protectedApi.post("/admin/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function updateBlog(id: string, formData: FormData) {
  formData.append("_method", "PUT");
  const res = await protectedApi.post(`/admin/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function deleteBlog(id: string) {
  const res = await protectedApi.delete(`/admin/blogs/${id}`);
  return res.data;
}

export async function updateBlogStatus(
  id: string,
  status: "published" | "draft" | "archived",
) {
  const res = await protectedApi.patch(`/admin/blogs/${id}/status`, {
    status,
  });
  return res.data.data;
}
