"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { createBundle, getAllCourses, getAllSchedules } from "@/lib/axios/bundles";
import { BUNDLE_STATUSES, BUNDLE_STATUS_LABELS, BundleSchedule, Course } from "@/lib/types/bundle";

export default function AddBundlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<BundleSchedule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    is_free: false,
    status: "draft",
    course_ids: [] as number[],
    schedule_ids: [] as number[],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [courseData, scheduleData] = await Promise.all([
          getAllCourses(),
          getAllSchedules(),
        ]);
        setCourses(courseData);
        setSchedules(scheduleData);
      } catch {
        toast.error("Failed to load bundle options");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const bannerPreview = useMemo(
    () => (bannerImage ? URL.createObjectURL(bannerImage) : null),
    [bannerImage],
  );

  useEffect(() => {
    return () => {
      if (bannerPreview) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [bannerPreview]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      is_free: checked,
      price: checked ? 0 : prev.price,
    }));
  };

  const toggleSelection = (key: "course_ids" | "schedule_ids", value: number) => {
    setFormData((prev) => {
      const selected = prev[key];
      return {
        ...prev,
        [key]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (formData.course_ids.length === 0 && formData.schedule_ids.length === 0) {
      toast.error("Select at least one course or session");
      return;
    }

    try {
      setLoading(true);
      await createBundle({
        ...formData,
        description: formData.description || null,
        banner_image: bannerImage,
      });
      toast.success("Bundle created successfully");
      router.push("/super-admin/bundles");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create bundle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Bundle</h1>
          <p className="text-sm text-gray-500">Create a bundle with courses, sessions, pricing, and a banner.</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="title" className="mb-1 block text-sm font-semibold text-gray-700">
              Bundle Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              maxLength={255}
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Ultimate Health & Safety Pack"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="status" className="mb-1 block text-sm font-semibold text-gray-700">
              Initial Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {BUNDLE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {BUNDLE_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="description" className="mb-1 block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what is included in this bundle..."
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="banner_image" className="mb-1 block text-sm font-semibold text-gray-700">
              Bundle Banner
            </label>
            <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50">
              {bannerPreview ? (
                <img src={bannerPreview} alt="Bundle banner preview" className="h-32 w-full rounded-lg object-cover" />
              ) : (
                <>
                  <ImagePlus className="mb-3 h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Upload banner image</span>
                  <span className="mt-1 text-xs text-gray-500">PNG, JPG, or WEBP up to 5MB</span>
                </>
              )}
              <input
                id="banner_image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) => setBannerImage(event.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="price" className="mb-1 block text-sm font-semibold text-gray-700">
              Price ($)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-sm text-gray-500">$</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                step="0.01"
                min="0"
                disabled={formData.is_free}
                value={formData.price}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 p-2.5 pl-7 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            <div className="mt-6 flex items-start gap-3">
              <input
                id="is_free"
                name="is_free"
                type="checkbox"
                checked={formData.is_free}
                onChange={handleCheckboxChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="text-sm">
                <label htmlFor="is_free" className="font-medium text-gray-700">
                  Mark as Free
                </label>
                <p className="text-gray-500">Enable this if the bundle does not cost anything.</p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Included Courses
            </label>
            {loadingOptions ? (
              <div className="py-8 text-center text-sm text-gray-500">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500">
                No courses available yet.
              </div>
            ) : (
              <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                {courses.map((course) => {
                  const selected = formData.course_ids.includes(course.id);
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => toggleSelection("course_ids", course.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-all ${
                        selected
                          ? "border-blue-200 bg-blue-50 ring-1 ring-blue-200"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        ${Number(course.price || 0).toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Selected: {formData.course_ids.length} course(s)
            </p>
          </div>

          <div className="sm:col-span-3">
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Included Sessions
            </label>
            {loadingOptions ? (
              <div className="py-8 text-center text-sm text-gray-500">Loading sessions...</div>
            ) : schedules.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500">
                No sessions available yet.
              </div>
            ) : (
              <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                {schedules.map((schedule) => {
                  const selected = formData.schedule_ids.includes(schedule.id);
                  return (
                    <button
                      key={schedule.id}
                      type="button"
                      onClick={() => toggleSelection("schedule_ids", schedule.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-all ${
                        selected
                          ? "border-emerald-200 bg-emerald-50 ring-1 ring-emerald-200"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">{schedule.title}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {schedule.course?.title || "Standalone session"}
                      </div>
                      {schedule.location ? (
                        <div className="mt-1 text-xs text-gray-400">{schedule.location}</div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Selected: {formData.schedule_ids.length} session(s)
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Bundle"}
          </button>
        </div>
      </form>
    </div>
  );
}
