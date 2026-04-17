import BreadCrumb from "@/components/BreadCrumb";
import SignupCTASection from "@/components/home/signup-cta-section";
import { LogoBar } from "@/components/logo-bar";
import BranchesGrid from "./_components/branches-grid";

export type Branch = {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  icon: string;
};

async function page() {
  let branches: Branch[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`, {
      next: { revalidate: 60 },
    });

    branches = await res.json().then((json) => json.data || []);
  } catch (error) {
    console.error("Failed to load branches page data", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Branches", href: "/branches" },
          //   { label: "Face to Face Courses", href: "/branches" },
        ]}
        title="Our Branches"
      />
      <BranchesGrid branches={branches} />
      <LogoBar />
      <SignupCTASection />
    </div>
  );
}

export default page;
