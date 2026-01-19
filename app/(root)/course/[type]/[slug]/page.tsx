import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";
import { dummyCourse } from "@/data/dummyCourse";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) => {
  const { slug, type } = await params;
  const course = dummyCourse; // Replace with actual data fetching logic using slug
  return (
    <>
      <BreadCrumb
        title={course.title}
        paths={[
          { label: `${type} Courses`, href: `/courses/${type}` },
          { label: course.title, href: `/course/${type}/${slug}` },
        ]}
      />
      <CourseDetailSection course={course} />
    </>
  );
};

export default page;
