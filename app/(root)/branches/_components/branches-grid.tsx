import { Branch } from "@/lib/types";
import BranchesGridCard from "./branches-grid-card";
import SectionBadge from "@/components/SectionBadge";

export default function BranchesGrid({
  branches = [],
}: {
  branches?: Branch[];
}) {
  return (
    <section className="py-24 bg-white lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <SectionBadge title="Our Branches" />
          <h2 className="text-4xl md:text-5xl font-medium text-medical-navy">
            We provide various directions
          </h2>
        </div>
        <div
          className={`grid gap-x-px gap-y-px border border-slate-100 
              overflow-hidden rounded-2xl shadow-sm
              ${branches.length < 4 ? "grid-cols-1 md:grid-cols-2 justify-center" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}
        >
          {branches.map((branch, index) => (
            <BranchesGridCard branch={branch} key={index} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
