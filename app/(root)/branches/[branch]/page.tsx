import BreadCrumb from "@/components/BreadCrumb";
import CoursesGrid from "@/components/courses/courses-grid";
import SectionBadge from "@/components/SectionBadge";
import { Branch } from "@/lib/types";
import React from "react";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`);
  const branches = await res.json();

  return branches.data.map((b: Branch) => ({
    branch: b.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ branch: string }> }) => {
  const { branch } = await params;

  const [courseRes, branchRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/type/face-to-face?page=1`,
      {
        next: { revalidate: 60 },
      },
    ),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches/${branch}`, {
      next: { revalidate: 90 },
    }),
  ]);

  const courseJson = await courseRes.json();
  const courses = courseJson.data;
  const branchData: Branch = await branchRes.json().then((res) => res.data);
  // console.log(data);
  return (
    <>
      <BreadCrumb
        title={`${branchData.title}`}
        paths={[
          { label: "Branches", href: "/branches" },
          {
            label: `${branchData.title}`,
            href: `/branches/${branchData.slug}`,
          },
        ]}
        coverImg={branchData.icon ? branchData.icon : "/placeholder.jpg"}
      />
      <section className="py-24 bg-white lg:px-15 2xl:px-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <SectionBadge title="Our Branch" />
            <h2 className="text-4xl md:text-5xl font-medium text-medical-navy">
              We provide various courses in {branchData.title}
            </h2>
          </div>
          {courses.length > 0 ? (
            <CoursesGrid
              courses={courses}
              cardLinkPrefix={`course/face-to-face`}
            />
          ) : (
            <div className="text-center">
              <p className="text-medical-navy">No courses found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
