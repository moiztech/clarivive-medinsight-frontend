"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getBundleById, enrollInBundle, getUserBundleEnrollments } from "@/lib/axios/bundles";
import { Bundle, BundleEnrollment } from "@/lib/types/bundle";
import { useAuth } from "@/app/_contexts/AuthProvider";
import BundleStatusBadge from "@/components/bundles/BundleStatusBadge";
import {
  BookOpen,
  Calendar,
  CalendarRange,
  CheckCircle,
  MapPin,
  User,
} from "lucide-react";

interface BundleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BundleDetailPage({ params }: BundleDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const bundleId = Number.parseInt(id, 10);
  const { user } = useAuth();

  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        setLoading(true);
        const data = await getBundleById(bundleId);
        setBundle(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load bundle details");
        router.push("/bundles");
      } finally {
        setLoading(false);
      }
    };

    fetchBundle();
  }, [bundleId, router]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !bundleId) {
        return;
      }

      try {
        setCheckingEnrollment(true);
        const enrollments = await getUserBundleEnrollments();
        const enrolled = enrollments.data.some(
          (enrollment: BundleEnrollment) => enrollment.bundle_id === bundleId,
        );
        setIsEnrolled(enrolled);
      } catch (error) {
        console.error("Failed to check enrollment", error);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [user, bundleId]);

  const handleEnroll = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setEnrolling(true);
      await enrollInBundle(bundleId);
      toast.success("Successfully enrolled in bundle");
      setIsEnrolled(true);
      setTimeout(() => router.push("/orders"), 1500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to enroll in bundle");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-12">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="text-gray-500">Loading bundle details...</p>
      </div>
    );
  }

  if (!bundle) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="border-b border-gray-200 bg-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {bundle.banner_url ? (
            <div className="mb-8 overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
              <img src={bundle.banner_url} alt={bundle.title} className="h-72 w-full object-cover" />
            </div>
          ) : null}

          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <BundleStatusBadge status={bundle.status} />
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  Added on {new Date(bundle.created_at).toLocaleDateString()}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{bundle.title}</h1>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="mr-1.5 h-5 w-5 text-gray-400" />
                  Created by {bundle.creator?.name || "Admin"}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="mr-1.5 h-5 w-5 text-gray-400" />
                  {bundle.courses?.length || 0} courses included
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarRange className="mr-1.5 h-5 w-5 text-gray-400" />
                  {bundle.schedules?.length || 0} sessions included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-12 lg:col-span-2">
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">About this Bundle</h2>
            <div className="prose max-w-none rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
              {bundle.description ? (
                <p className="whitespace-pre-wrap text-gray-700">{bundle.description}</p>
              ) : (
                <p className="italic text-gray-500">No description provided for this bundle.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Included Courses ({bundle.courses?.length || 0})
            </h2>
            <div className="space-y-4">
              {bundle.courses?.map((course) => (
                <div
                  key={course.id}
                  className="group flex items-center gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:border-blue-200"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <BookOpen className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {course.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">{course.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-lg font-bold text-gray-900">
                      ${Number(course.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Included Sessions ({bundle.schedules?.length || 0})
            </h2>
            <div className="space-y-4">
              {bundle.schedules?.length ? (
                bundle.schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{schedule.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {schedule.course?.title || "Standalone session"}
                        </p>
                      </div>
                      {schedule.location ? (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1 h-4 w-4" />
                          {schedule.location}
                        </div>
                      ) : null}
                    </div>
                    {schedule.description ? (
                      <p className="mt-4 text-sm text-gray-600">{schedule.description}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500 shadow-sm">
                  This bundle does not include any face-to-face sessions.
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="sticky top-32 rounded-2xl border-2 border-blue-100 bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Bundle Price
              </span>
              <div className="mt-2 text-5xl font-extrabold text-gray-900">
                {bundle.is_free ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `$${Number(bundle.price).toFixed(2)}`
                )}
              </div>
            </div>

            <div className="space-y-4">
              {isEnrolled ? (
                <button
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-4 font-bold text-gray-500"
                >
                  <CheckCircle className="h-6 w-6" />
                  Already Enrolled
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || checkingEnrollment}
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-95 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {enrolling ? "Enrolling..." : "Enroll in Bundle"}
                </button>
              )}

              <p className="px-4 text-center text-xs leading-relaxed text-gray-400">
                By enrolling, you agree to our Terms of Service. One-time payment for lifetime access.
              </p>
            </div>

            <div className="mt-8 space-y-4 border-t border-gray-100 pt-8">
              <h4 className="px-1 text-sm font-bold uppercase text-gray-900">What&apos;s included</h4>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                  <span>{bundle.courses?.length || 0} courses inside the bundle</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                  <span>{bundle.schedules?.length || 0} face-to-face sessions</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                  <span>Bundle analytics currently show {bundle.analytics?.enrollments || 0} enrollments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
