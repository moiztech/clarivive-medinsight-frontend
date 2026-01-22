import ServicesGridCard from "../cards/services-grid-card";
import { Branch } from "@/app/(root)/branches/page";

export default function ServicesGrid({
  branches = [],
  title = "Our Services",
  description = "We provide various directions",
  cardLinkPrefix = "branches",
}: {
  branches?: Branch[];
  title?: string;
  description?: string;
  cardLinkPrefix?: string;
}) {
  return (
    <section className="py-24 bg-white lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <span className="inline-block px-4 py-1 bg-blue-400/10 text-blue-400 text-sm font-semibold rounded-md tracking-wider uppercase">
            {title}
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-medical-navy">
            {description}
          </h2>
        </div>
        <div
          className={`grid gap-x-px gap-y-px border border-slate-100 
              overflow-hidden rounded-2xl shadow-sm
              ${branches.length < 4 ? "grid-cols-1 md:grid-cols-2 justify-center" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}
        >
          {branches.map((branch, index) => (
            <ServicesGridCard
              linkPrefix={cardLinkPrefix}
              service={{
                title: branch.title,
                icon: branch.icon,
                description: branch.description,
                slug: branch.slug,
              }}
              key={index}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
