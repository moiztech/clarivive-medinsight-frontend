import React from "react";
import { CourseData, DetailCourse } from "@/lib/types";
import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";

const fallbackCourse: DetailCourse = {
  id: 0,
  title: "Course",
  slug: "",
  thumbnail: "/placeholder.jpg",
  price: 0,
  description: "Course details are temporarily unavailable.",
  duration: "",
  modules: 0,
  branches: [],
};

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const [faceToFaceRes, onlineRes] = await Promise.all([
      fetch(`${baseUrl}/courses/type/face-to-face`),
      fetch(`${baseUrl}/courses/type/online`),
    ]);

    const ftf = await faceToFaceRes.json();
    const online = await onlineRes.json();

    const faceToFaceParams = (ftf.data || []).map((c: CourseData) => ({
      slug: c.slug,
      type: ftf.meta?.type?.slug || "face-to-face",
    }));

    const onlineParams = (online.data || []).map((c: CourseData) => ({
      slug: c.slug,
      type: online.meta?.type?.slug || "online",
    }));

    return [...faceToFaceParams, ...onlineParams];
  } catch (error) {
    console.error("Failed to prebuild course params", error);
    return [];
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let courseData: DetailCourse = fallbackCourse;

  try {
    const course = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${slug}`,
      {
        next: { revalidate: 60 },
      },
    );
    courseData = (await course.json()).data || fallbackCourse;
  } catch (error) {
    console.error(`Failed to build metadata for course ${slug}`, error);
  }

  return {
    title: courseData.title,
    description: courseData.description,
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) => {
  const { slug, type } = await params;
  let courseData: DetailCourse = {
    ...fallbackCourse,
    slug,
    title: slug,
  };

  try {
    const course = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${slug}`,
      {
        next: { revalidate: 60 },
      },
    );
    courseData = (await course.json()).data || courseData;
  } catch (error) {
    console.error(`Failed to load course page for ${slug}`, error);
  }

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
      <CourseDetailSection course={courseData} type={type} />
    </>
  );
};

export default page;
