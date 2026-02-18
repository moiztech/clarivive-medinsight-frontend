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
}

export function useTrainerCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCourses = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await protectedApi.get("/courses-list");
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

  return {
    courses,
    loading,
    error,
    getCourses,
  };
}
