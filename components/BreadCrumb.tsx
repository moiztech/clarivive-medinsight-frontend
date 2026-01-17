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
    <div className="relative w-full h-[300px] md:h-[400px] md:rounded-b-4xl overflow-hidden flex items-center">
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
      <div className="container mx-auto ps-6 xl:ps-20 relative z-10">
        <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* Breadcrumb Tab */}
      <div className="absolute -bottom-1 left-6 xl:left-20 z-20">
        <div className="bg-white rounded-t-[20px] px-4 py-3 flex items-center gap-3 shadow-lg">
          <div className="bg-[#1321F1] p-1.5 rounded text-white">
            <Home className="w-4 h-4" />
          </div>
          <div className="flex items-center text-[13px] font-bold tracking-wider text-[#001D3D]">
            <Link href="/">
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
