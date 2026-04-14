"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone } from "lucide-react";

type CourseAnnouncement = {
  id: number;
  title: string;
  slug: string;
  type?: {
    name: string;
  };
};

export function AnnouncementBar() {
  const [courses, setCourses] = useState<CourseAnnouncement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses?page=1`,
        );

        const json = await res.json();
        setCourses((json?.data ?? []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch dashboard announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);

  if (!courses.length) return null;

  return (
    <div className="mb-6 rounded-2xl border border-primary-blue/10 bg-primary-blue/5 px-4 py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Megaphone className="mt-0.5 size-5 text-primary-blue" />
          <div>
            <p className="text-sm font-semibold text-primary-blue">
              New courses are live on the website
            </p>
            <p className="text-xs text-slate-600">
              Explore the latest training launches and book early to reserve a
              place.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.type?.name === "online" ? "online" : "face-to-face"}/${course.slug}`}
              className="rounded-full border border-primary-blue/15 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-primary-blue hover:text-primary-blue"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
