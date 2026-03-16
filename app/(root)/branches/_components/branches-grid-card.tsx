import { Branch } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BranchesGridCard = ({ branch }: { branch: Branch }) => {
  return (
    <div className="bg-white relative cursor-pointer flex flex-col items-center text-center space-y-6 border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:z-10 hover:shadow-2xl hover:bg-slate-50 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-2rem)]">
      <Link href={`/branches/${branch.slug}`}>
        <div className="w-full h-48 lg:w-full lg:h-70 overflow-hidden rounded-t-2xl flex items-center justify-center shadow-inner">
          <Image
            src={branch.icon ? branch.icon : "/placeholder.jpg"}
            alt={branch.title}
            width={300}
            height={100}
            className="w-full h-full object-cover hover:scale-110 duration-300"
          />
        </div>
      </Link>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-medical-navy">{branch.title}</h3>
        {branch?.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {branch.description}
          </p>
        )}
      </div>
      <Link
        href={`/branches/${branch.slug}`}
        className="text-secondary pt-2 pb-6 font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn"
      >
        READ MORE{" "}
        <span className="transition-transform group-hover/btn:translate-x-1">
          +
        </span>
      </Link>
    </div>
  );
};

export default BranchesGridCard;
