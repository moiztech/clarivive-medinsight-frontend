import BreadCrumb from "@/components/BreadCrumb";
import SectionBadge from "@/components/SectionBadge";
import { buildApiUrl } from "@/lib/api-url";
import { Branch, CategoryResponse } from "@/lib/types";
import React from "react";
import BranchCourse from "../_components/branches-course";

export async function generateStaticParams() {
  try {
    const res = await fetch(buildApiUrl("/branches"));
    const branches = await res.json();

    return (branches.data || []).map((b: Branch) => ({
      branch: b.slug,
    }));
  } catch (error) {
    console.error("Failed to prebuild branch params", error);
    return [];
  }
}

const page = async ({ params }: { params: Promise<{ branch: string }> }) => {
  const { branch } = await params;

  let courseJson: { data?: unknown[]; meta?: unknown } = {};
  let courses: unknown[] = [];
  let branchData: Branch = {
    id: 0,
    title: branch,
    slug: branch,
    description: null,
    location: "",
    icon: null,
  };
  let categoryJson: CategoryResponse[] = [];

  try {
    const [courseRes, branchRes, categoryRes] = await Promise.all([
      fetch(
        buildApiUrl(`/courses/branch/${branch}?page=1`),
        {
          next: { revalidate: 60 },
        },
      ),
      fetch(buildApiUrl(`/branches/${branch}`), {
        next: { revalidate: 90 },
      }),
      fetch(buildApiUrl("/categories"), {
        next: { revalidate: 300 },
      }),
    ]);

    courseJson = await courseRes.json();
    courses = courseJson.data || [];
    branchData = await branchRes.json().then((res) => res.data || branchData);
    categoryJson = await categoryRes.json().then((res) => res.data || []);
  } catch (error) {
    console.error(`Failed to load branch page data for ${branch}`, error);
  }
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
