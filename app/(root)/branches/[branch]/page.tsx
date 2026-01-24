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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/branches/${branch}`,
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
      {/* <div className="text-center">{data.data.title}</div> */}
      <TimetableSection />
    </>
  );
};

export default page;
