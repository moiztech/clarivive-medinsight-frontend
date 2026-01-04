import { Service } from "@/lib/types";
import Link from "next/link";
import React from "react";

const ServicesGridCard = ({ service, index } : { service: Service; index: number }) => {
  return (
    <div
      key={index}
      className="bg-white cursor-pointer px-10 py-8 flex flex-col items-center text-center space-y-6 transition-all duration-300 hover:z-10 hover:shadow-2xl hover:bg-slate-50 group"
    >
      <div className="w-20 h-20 rounded-2xl bg-blue-400 /5 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-400  group-hover:-translate-y-2 group-hover:rotate-3 shadow-inner">
        <service.icon className="w-10 h-10 text-blue-400 transition-colors group-hover:text-white" strokeWidth={1.5} />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-medical-navy">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">There are many variations of passages of Lorem Ipsum available.</p>
      </div>
      <Link href={`/branches/${index}`} className="text-secondary py-2 font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn">
        READ MORE <span className="transition-transform group-hover/btn:translate-x-1">+</span>
      </Link>
    </div>
  );
};

export default ServicesGridCard;
