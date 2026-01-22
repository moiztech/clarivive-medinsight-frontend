import BreadCrumb from "@/components/BreadCrumb";
import ServicesGrid from "@/components/courses/services-grid";
import SignupCTASection from "@/components/home/signup-cta-section";
import { LogoBar } from "@/components/logo-bar";

export type Branch = {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  icon: string;
};

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`, {
    next: { revalidate: 60 },
  });
  const branches: Branch[] = await res.json().then((res) => res.data);
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "Branches", href: "/branches" },
          //   { label: "Face to Face Courses", href: "/branches" },
        ]}
        title="Our Branches"
      />
      <ServicesGrid services={branches} />
      <LogoBar />
      <SignupCTASection />
    </div>
  );
}

export default page;
