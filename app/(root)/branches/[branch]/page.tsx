import TimetableSection from "@/components/branches/TimeTableSection";
import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

const page = async ({ params }: { params: Promise<{ branch: number }> }) => {
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
