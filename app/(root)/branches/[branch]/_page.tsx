import TimetableSection from "@/components/branches/TimeTableSection";
import BreadCrumb from "@/components/BreadCrumb";
import { buildApiUrl } from "@/lib/api-url";
import { Branch } from "@/lib/types";
import React from "react";

export async function generateStaticParams() {
  const res = await fetch(buildApiUrl("/branches"));
  const branches = await res.json();

  return branches.data.map((b: Branch) => ({
    branch: b.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ branch: string }> }) => {
  const { branch } = await params;
  const res = await fetch(
    buildApiUrl(`/branches/${branch}`),
    {
      next: { revalidate: 90 },
    },
  );
  const data = await res.json();
  // console.log(data);
  return (
    <>
      <BreadCrumb
        title={`${data.data.title}`}
        paths={[
          { label: "Branches", href: "/branches" },
          { label: `${data.data.title}`, href: `/branches/${data.data.slug}` },
        ]}
      />
      <TimetableSection />
    </>
  );
};

export default page;
