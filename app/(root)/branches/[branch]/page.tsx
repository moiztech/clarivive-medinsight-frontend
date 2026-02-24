import BreadCrumb from "@/components/BreadCrumb";
import SectionBadge from "@/components/SectionBadge";
import { Branch, CategoryResponse } from "@/lib/types";
import React from "react";
import BranchCourse from "../_components/branches-course";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`);
  const branches = await res.json();

  return branches.data.map((b: Branch) => ({
    branch: b.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ branch: string }> }) => {
  const { branch } = await params;

  const [courseRes, branchRes, categoryRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/branch/${branch}?page=1`,
      {
        next: { revalidate: 60 },
      },
    ),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches/${branch}`, {
      next: { revalidate: 90 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
      next: { revalidate: 300 },
    }),
  ]);

  const courseJson = await courseRes.json();
  const courses = courseJson.data;
  const branchData: Branch = await branchRes.json().then((res) => res.data);
  const { data: categoryJson }: { data: CategoryResponse[] } =
    await categoryRes.json();
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
            <BranchCourse
              initialData={courses}
              initialMeta={courseJson.meta}
              categories={categoryJson}
              branch={branchData.slug}
              type="face-to-face"
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
