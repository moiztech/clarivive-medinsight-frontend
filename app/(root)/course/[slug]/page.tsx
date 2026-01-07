import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";
import {dummyCourse} from "@/data/dummyCourse";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const course = dummyCourse; // Replace with actual data fetching logic using slug
  return (
    <>
      <BreadCrumb title={course.title} paths={[
        { label: "Courses", href: "/courses" },
        { label: course.title, href: `/course/${slug}` },
      ]} />
      <CourseDetailSection course={course} />
    </>
  );
};

export default page;
