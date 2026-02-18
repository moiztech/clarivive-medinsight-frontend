import { CourseData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CoursesGridCard = ({
  course,
  index,
  showReadMore = true,
  linkPrefix = "branches",
}: {
  course: CourseData;
  index: number;
  showReadMore?: boolean;
  linkPrefix?: string;
}) => {
  return (
    <div
      key={index}
      className="bg-white cursor-pointer border rounded-2xl pb-8 flex flex-col text-center space-y-4 overflow-hidden transition-all duration-300 hover:z-10 hover:shadow-2xl hover:bg-slate-50 group"
    >
      <Link
        href={`/${linkPrefix}/${course.slug ? course.slug : index}`}
        className="d-block"
      >
        <div className="rounded-t-2xl overflow-hidden w-full">
          <Image
            quality={80}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            src={course.thumbnail}
            alt={course.title}
            width={16}
            height={10}
            className="w-full! h-60! object-cover object-center transition-all duration-300 group-hover:scale-104 origin-top shadow-inner"
          />
        </div>
      </Link>
      <div className="space-y-2 px-8">
        <h3 className="text-2xl font-bold text-medical-navy">{course.title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {course?.description}
        </p>
        <div className="flex gap-1 items-center justify-center mx-auto">
          {/* take first 2 topics only */}
          {course.topics?.slice(0, 2).map((topic, index) => (
            <span
              key={index}
              className="border border-gray-400 text-secondary rounded-lg px-2 py-1 text-xs"
            >
              {topic.name}
            </span>
          ))}
        </div>
        {/* <span className="text-muted-foreground text-sm">Price:</span> */}
        <span className="text-secondary inline-block mt-3 font-bold text-xl">
          € {course.price}
        </span>
      </div>
      {showReadMore && (
        <div className="">
          <Link
            href={`/${linkPrefix}/${course.slug ? course.slug : index}`}
            className="text-secondary font-bold text-sm tracking-widest uppercase flex justify-center items-center gap-2 group/btn"
          >
            READ MORE{" "}
            <span className="transition-transform group-hover/btn:translate-x-1">
              +
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursesGridCard;
