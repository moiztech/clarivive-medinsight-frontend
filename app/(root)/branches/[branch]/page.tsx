import TimetableSection from "@/components/branches/TimeTableSection";
import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`);
  const branches = await res.json();

  return branches.data.map((b: any) => ({
    branch: b.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ branch: string }> }) => {
  const { branch } = await params;
  return (
    <>
      <BreadCrumb
        title={`Branch ${branch}`}
        paths={[
          { label: "Branches", href: "/branches" },
          { label: `Branch ${branch}`, href: `/branches/${branch}` },
        ]}
      />
      {/* <div className="text-center">{branch}</div> */}
      <TimetableSection />
    </>
  );
};

export default page;
