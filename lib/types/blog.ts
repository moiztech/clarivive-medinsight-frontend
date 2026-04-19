export interface Blog {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  featured_image: string | null;
  category: string;
  tags: string[];
  status: "published" | "draft" | "archived";
  views: number;
  likes: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface BlogPagination {
  data: Blog[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const BLOG_CATEGORIES = [
  "Health",
  "Training",
  "Nutrition",
  "Medical",
  "General",
] as const;

export const BLOG_STATUSES = ["published", "draft", "archived"] as const;
