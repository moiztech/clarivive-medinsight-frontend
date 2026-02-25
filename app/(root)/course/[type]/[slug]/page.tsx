import React from "react";
import { DetailCourse } from "@/lib/types";
import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";
import CourseSchedule from "@/components/courses/CourseSchedule";

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch both types of courses in parallel
  const [faceToFaceRes, onlineRes] = await Promise.all([
    fetch(`${baseUrl}/courses/type/face-to-face`),
    fetch(`${baseUrl}/courses/type/online`),
  ]);

  const ftf = await faceToFaceRes.json();
  const online = await onlineRes.json();

  // Map face-to-face courses using type from meta
  const faceToFaceParams = (ftf.data || []).map((c: any) => ({
    slug: c.slug,
    type: ftf.meta?.type?.slug || "face-to-face",
  }));

  // Map online courses using type from meta
  const onlineParams = (online.data || []).map((c: any) => ({
    slug: c.slug,
    type: online.meta?.type?.slug || "online",
  }));

  return [...faceToFaceParams, ...onlineParams];
}

const page = async ({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) => {
  const { slug, type } = await params;
  const course = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${slug}`,
    {
      next: { revalidate: 60 },
    },
  );
  const courseData: DetailCourse = (await course.json()).data;
  // console.log(courseData);
  return (
    <>
      <BreadCrumb
        title={courseData.title}
        paths={[
          { label: `${type} Courses`, href: `/courses/${type}` },
          { label: courseData.title, href: `/course/${type}/${slug}` },
        ]}
      />
      <CourseDetailSection course={courseData} />
      {(type == "face-to-face" || courseData.schedules) && (
        <CourseSchedule schedules={courseData?.schedules} />
      )}
    </>
  );
};

export default page;
