import React from "react";
import { CourseData, DetailCourse } from "@/lib/types";
import BreadCrumb from "@/components/BreadCrumb";
import CourseDetailSection from "@/components/courses/CourseDetailSection";
import { buildApiUrl } from "@/lib/api-url";

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
  try {
    const [faceToFaceRes, onlineRes] = await Promise.all([
      fetch(buildApiUrl("/courses/type/face-to-face")),
      fetch(buildApiUrl("/courses/type/online")),
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
  params: { slug: string };
}) {
  const { slug } = params;
  let courseData: DetailCourse = fallbackCourse;

  try {
    const course = await fetch(buildApiUrl(`/courses/${slug}`), {
      next: { revalidate: 60 },
    });

    const json = await course.json();
    courseData = json?.data || fallbackCourse;
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
  params: { type: string; slug: string };
}) => {
  const { slug, type } = params;

  let courseData: DetailCourse = {
    ...fallbackCourse,
    slug,
    title: slug,
  };

  try {
    const course = await fetch(buildApiUrl(`/courses/${slug}`), {
      next: { revalidate: 60 },
    });

    const json = await course.json();
    courseData = json?.data || courseData;
  } catch (error) {
    console.error(`Failed to load course page for ${slug}`, error);
  }

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