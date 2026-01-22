import { Service } from "@/lib/types";
import { Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServicesGridCard = ({
  service,
  index,
  showReadMore = true,
  linkPrefix = "branches",
}: {
  service: Service;
  index: number;
  showReadMore?: boolean;
  linkPrefix?: string;
}) => {
  return (
    <div
      key={index}
      className="bg-white cursor-pointer px-10 py-8 flex flex-col items-center text-center space-y-6 transition-all duration-300 hover:z-10 hover:shadow-2xl hover:bg-slate-50 group"
    >
      <div className="w-20 h-20 rounded-2xl bg-blue-400 /5 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-400  group-hover:-translate-y-2 group-hover:rotate-3 shadow-inner">
        {service.icon ? (
          <Image
            src={service.icon}
            alt={service.title}
            width={40}
            height={40}
          />
        ) : (
          <Building
            className="w-10 h-10 text-blue-400 transition-colors group-hover:text-white"
            strokeWidth={1.5}
          />
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-medical-navy">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {service?.description}
        </p>
      </div>
      {showReadMore && (
        <Link
          href={`/${linkPrefix}/${service.slug ? service.slug : index}`}
          className="text-secondary py-2 font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn"
        >
          READ MORE{" "}
          <span className="transition-transform group-hover/btn:translate-x-1">
            +
          </span>
        </Link>
      )}
    </div>
  );
};

export default ServicesGridCard;
