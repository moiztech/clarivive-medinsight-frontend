import { useState, useCallback } from "react";
import protectedApi from "@/lib/axios/protected";

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CourseType {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  icon: string;
  course_type_id: number;
  course_type: CourseType;
}

export interface Branch {
  id: number;
  title: string;
  slug: string;
  icon: string;
}

export interface Session {
  id: number;
  schedule_id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export interface Trainer {
  id: number;
  name: string;
  email: string;
  logo: string;
}

export interface ScheduleDetails {
  id: number;
  course_id: number;
  branch_id: number;
  trainer_id: number;
  sessions: Session[];
  trainer: Trainer;
}

export interface Booking {
  id: number;
  company_id: number;
  course_id: number;
  branch_id: number;
  schedule_id: number;
  created_at: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  logo: string;
  booking: Booking;
}

export interface CompanyBookingSchedule {
  schedule_id: number;
  course: Course;
  branch: Branch;
  schedule: ScheduleDetails;
  students: Student[];
}

export function useCompanyBookings() {
  const [data, setData] = useState<CompanyBookingSchedule[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getBookings = useCallback(async (page: number = 1, perPage: number = 10) => {
    setLoading(true);
    setError(false);
    try {
      const response = await protectedApi.get(`/company/bookings?page=${page}&per_page=${perPage}`);
      const resData = response.data;
      
      setData(resData.data || []);
      setPagination(resData.pagination || null);
    } catch (err) {
      console.error("Failed to fetch company bookings:", err);
      setError(true);
      setData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    pagination,
    loading,
    error,
    getBookings
  };
}
