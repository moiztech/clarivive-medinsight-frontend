import { Home } from "lucide-react";
import Link from "next/link";

interface BreadCrumbProps {
  title: string;
  paths: { label: string; href: string }[];
  coverImg?: string;
}

export default function BreadCrumb({
  title,
  paths,
  coverImg = "/breadcrumb-default.jpg",
}: BreadCrumbProps) {
  return (
    <div className="relative w-full h-[260px] md:h-[400px] md:rounded-b-4xl overflow-hidden flex items-end md:items-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('${coverImg}')`,
          filter: "brightness(0.8)",
        }}
      />
      <div className="absolute inset-0 w-1/2 bg-linear-to-r from-black/70 0 to-transparent z-1"></div>

      {/* Content Container */}
      <div className="container mx-auto ps-4 md:ps-10 xl:ps-20 relative z-10">
        <h1 className="text-3xl mb-16 md:mb-0 md:text-6xl font-semibold text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* Breadcrumb Tab */}
      <div className="absolute -bottom-1 left-0 xl:left-20 z-20 overflow-hidden">
        <div className="bg-white rounded-tl-none xl:rounded-tl-[20px] rounded-t-[20px] px-3 xl:px-4 py-3 flex items-center gap-1 xl:gap-3 shadow-lg">
          <div className="bg-[#1321F1] p-1.5 rounded text-white">
            <Link href="/">
              <Home className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center text-[10px] md:text-[13px] font-bold tracking-wider text-[#001D3D]">
            <Link href="/" className="hidden xl:block">
              <span className="uppercase">Home</span>
            </Link>
            {paths.map((path, index) => (
              <div key={index} className="flex items-center">
                <span className="mx-2 text-gray-300 font-normal">/</span>
                <span className="uppercase">
                  <Link href={path.href}>{path.label}</Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
