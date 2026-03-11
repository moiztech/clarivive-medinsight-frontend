import { useState, useCallback } from "react";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";

export interface Course {
  id: number;
  course_type_id: number;
  icon: string;
  title: string;
  slug: string;
  price: string;
  duration: string;
  modules: number;
  video_type: string | null;
  video_url: string | null;
  video_path: string | null;
  created_at: string;
  updated_at: string;
  description: string;
  content: string;
  pivot?: {
    company_id: number;
    course_id: number;
    created_at: string;
    updated_at: string;
  };
  course_type: {
    id: number;
    name: string;
    slug: string;
  };
  branches?: {
    id: number;
    title: string;
    slug: string;
    icon: string;
    pivot: {
      course_id: number;
      branch_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
}

export function useCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCourses = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await protectedApi.get("/company/company-courses");
      const data = response.data.data || response.data;
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setError(true);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const assignCourses = useCallback(
    async (payload: { employee_id: number; course_ids: number[] }) => {
      setLoading(true);
      setError(false);
      try {
        const res = await protectedApi.post("/company/assign-courses", payload);
        toast.success(res.data?.message || "Courses assigned successfully");
        return res.data;
      } catch (error) {
        console.error("Failed to assign courses:", error);
        setError(true);
        toast.error("Failed to assign courses");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    courses,
    loading,
    error,
    getCourses,
    assignCourses,
  };
}
