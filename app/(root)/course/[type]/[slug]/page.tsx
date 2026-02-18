import React from "react";
import { DetailCourse } from "@/lib/types";
import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch both types of courses in parallel
  const [faceToFaceRes, onlineRes] = await Promise.all([
    fetch(`${baseUrl}/courses/type/face-to-face`),
    fetch(`${baseUrl}/courses/type/online`),
  ]);

  const faceToFaceData = await faceToFaceRes.json();
  const onlineData = await onlineRes.json();

  // Combine both lists
  const allCourses = [
    ...(faceToFaceData.data || []),
    ...(onlineData.data || []),
  ];

  return allCourses.map((c: any) => ({
    slug: c.slug,
    type: String(c.type).toLowerCase().trim(),
  }));
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
    </>
  );
};

export default page;
