import { MapPin } from "lucide-react";
import React from "react";

function BreadCrumb({ title, description, link, coverImg = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" }: { title: string; description: string; link: string; coverImg?: string }) {
  return (
    <div className="relative lg:h-85 bg-linear-to-r from-blue-600 to-blue-500 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${coverImg})` }}
      />
      <div className="container relative px-10 py-12 lg:px-20 lg:py-20 h-full flex items-center">
        <div>
          <div className="flex items-center mb-4 gap-2 text-gray-700">
            <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span>Home</span>
            <span>/</span>
            <span>{link}</span>
          </div>
          <h1 className="text-5xl font-bold text-white">{title}</h1>
          <hr className="w-10 mt-4 bg-accent" />
          <p className="mt-4 text-gray-100 md:max-w-2/3">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
