import { AxiosError } from "axios";
import { serverApi, protectedApi } from "./index";
import {
  Bundle,
  BundleSchedule,
  Course,
  PaginatedBundles,
  PaginatedEnrollments,
} from "../types/bundle";

type BundleFormData = {
  title: string;
  description: string | null;
  price: number;
  is_free: boolean;
  status: string;
  course_ids: number[];
  schedule_ids?: number[];
  banner_image?: File | null;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function buildBundlePayload(data: BundleFormData) {
  const payload = new FormData();
  payload.append("title", data.title);
  payload.append("description", data.description ?? "");
  payload.append("price", String(data.price));
  payload.append("is_free", String(data.is_free));
  payload.append("status", data.status);

  data.course_ids.forEach((courseId) => {
    payload.append("course_ids[]", String(courseId));
  });

  (data.schedule_ids ?? []).forEach((scheduleId) => {
    payload.append("schedule_ids[]", String(scheduleId));
  });

  if (data.banner_image) {
    payload.append("banner_image", data.banner_image);
  }

  return payload;
}

export const getBundles = async (params?: {
  search?: string;
  page?: number;
}): Promise<PaginatedBundles> => {
  try {
    const response = await serverApi.get("/bundles", { params });
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching bundles:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch bundles"));
  }
};

export const getBundleById = async (id: number): Promise<Bundle> => {
  try {
    const response = await serverApi.get(`/bundles/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    console.error(`Error fetching bundle ${id}:`, error);
    throw new Error(getErrorMessage(error, "Failed to fetch bundle details"));
  }
};

export const getAdminBundles = async (params?: {
  search?: string;
  status?: string;
  page?: number;
}): Promise<PaginatedBundles> => {
  try {
    const response = await protectedApi.get("/admin/bundles", { params });
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching admin bundles:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch admin bundles"));
  }
};

export const getAdminBundleById = async (id: number): Promise<Bundle> => {
  try {
    const response = await protectedApi.get(`/admin/bundles/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    console.error(`Error fetching admin bundle ${id}:`, error);
    throw new Error(getErrorMessage(error, "Failed to fetch admin bundle details"));
  }
};

export const createBundle = async (data: BundleFormData): Promise<Bundle> => {
  try {
    const response = await protectedApi.post("/admin/bundles", buildBundlePayload(data));
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error creating bundle:", error);
    throw new Error(getErrorMessage(error, "Failed to create bundle"));
  }
};

export const updateBundle = async (
  id: number,
  data: Partial<BundleFormData>,
): Promise<Bundle> => {
  try {
    const payload = new FormData();

    if (data.title !== undefined) payload.append("title", data.title);
    if (data.description !== undefined) payload.append("description", data.description ?? "");
    if (data.price !== undefined) payload.append("price", String(data.price));
    if (data.is_free !== undefined) payload.append("is_free", String(data.is_free));
    if (data.status !== undefined) payload.append("status", data.status);

    if (data.course_ids !== undefined) {
      data.course_ids.forEach((courseId) => payload.append("course_ids[]", String(courseId)));
    }

    if (data.schedule_ids !== undefined) {
      data.schedule_ids.forEach((scheduleId) =>
        payload.append("schedule_ids[]", String(scheduleId)),
      );
    }

    if (data.banner_image) {
      payload.append("banner_image", data.banner_image);
    }

    payload.append("_method", "PUT");

    const response = await protectedApi.post(`/admin/bundles/${id}`, payload);
    return response.data.data;
  } catch (error: unknown) {
    console.error(`Error updating bundle ${id}:`, error);
    throw new Error(getErrorMessage(error, "Failed to update bundle"));
  }
};

export const deleteBundle = async (id: number) => {
  try {
    const response = await protectedApi.delete(`/admin/bundles/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error(`Error deleting bundle ${id}:`, error);
    throw new Error(getErrorMessage(error, "Failed to delete bundle"));
  }
};

export const updateBundleStatus = async (
  id: number,
  status: "published" | "draft" | "archived",
): Promise<Bundle> => {
  try {
    const response = await protectedApi.patch(`/admin/bundles/${id}/status`, {
      status,
    });
    return response.data.data;
  } catch (error: unknown) {
    console.error(`Error updating bundle status ${id}:`, error);
    throw new Error(getErrorMessage(error, "Failed to update bundle status"));
  }
};

export const enrollInBundle = async (bundleId: number) => {
  try {
    const response = await protectedApi.post(`/bundles/${bundleId}/enroll`);
    return response.data.data;
  } catch (error: unknown) {
    console.error(`Error enrolling in bundle ${bundleId}:`, error);
    throw new Error(getErrorMessage(error, "Failed to enroll in bundle"));
  }
};

export const getUserBundleEnrollments = async (params?: {
  page?: number;
}): Promise<PaginatedEnrollments> => {
  try {
    const response = await protectedApi.get("/my-bundle-enrollments", { params });
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching user enrollments:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch enrollments"));
  }
};

export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await serverApi.get("/courses");
    return response.data.data?.data || response.data.data || [];
  } catch (error: unknown) {
    console.error("Error fetching courses:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch courses"));
  }
};

export const getAllSchedules = async (): Promise<BundleSchedule[]> => {
  try {
    const response = await protectedApi.get("/admin/bundle-schedules");
    return response.data.data || [];
  } catch (error: unknown) {
    console.error("Error fetching schedules:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch schedules"));
  }
};
