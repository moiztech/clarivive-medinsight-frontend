import { Branch } from "@/lib/types";
import BranchesGridCard from "./branches-grid-card";
import SectionBadge from "@/components/SectionBadge";

export default function BranchesGrid({
  branches = [],
}: {
  branches?: Branch[];
}) {
  return (
    <section className="py-24 bg-white max-w-7xl mx-auto lg:px-10 2xl:px-15">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <SectionBadge title="Our Branches" />
          <h2 className="text-4xl md:text-5xl font-medium text-medical-navy">
            We provide various directions
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {branches.map((branch, index) => (
            <BranchesGridCard branch={branch} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
