import React from "react";
import { DetailCourse } from "@/lib/types";
import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`);
  const courses = await res.json();

  return courses.data.map((c: any) => ({
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
