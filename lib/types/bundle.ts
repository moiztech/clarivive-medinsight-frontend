export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  price: string | number;
}

export interface BundleSchedule {
  id: number;
  title: string;
  location?: string | null;
  description?: string | null;
  image?: string | null;
  course?: {
    id: number;
    title: string;
  } | null;
}

export interface Bundle {
  id: number;
  title: string;
  description: string | null;
  banner_path?: string | null;
  banner_url?: string | null;
  price: string | number;
  is_free: boolean;
  status: 'published' | 'draft' | 'archived' | 'active';
  created_by: number;
  courses?: Course[];
  schedules?: BundleSchedule[];
  creator?: User;
  analytics?: {
    enrollments: number;
    revenue: number;
  };
  created_at: string;
  updated_at: string;
}

export interface BundleEnrollment {
  id: number;
  bundle_id: number;
  user_id: number;
  status: 'active' | 'completed' | 'cancelled';
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  bundle?: Bundle;
}

export interface PaginatedBundles {
  data: Bundle[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedEnrollments {
  data: BundleEnrollment[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const BUNDLE_STATUSES = ['published', 'draft', 'archived', 'active'] as const;

export const BUNDLE_STATUS_LABELS = {
  published: 'Published',
  active: 'Active',
  draft: 'Draft',
  archived: 'Archived',
} as const;

export const BUNDLE_STATUS_COLORS = {
  published: 'green',
  active: 'blue',
  draft: 'amber',
  archived: 'gray',
} as const;
