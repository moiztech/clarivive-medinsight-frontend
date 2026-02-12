"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface EmployeeCourse {
  id: number;
  title: string;
  slug: string;
  icon: string;
  price: string;
  duration: string;
  modules: number;
  description: string;
  video_type: string | null;
  video_url: string | null;
  created_at: string;
  course_type: {
    id: number;
    name: string;
    slug: string;
  };
}

interface EmployeeCourseCardProps {
  course: EmployeeCourse;
}

const EmployeeCourseCard: React.FC<EmployeeCourseCardProps> = ({ course }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={course.icon}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant="outline" className="w-fit">
            Course
          </Badge>
          <span className="font-bold text-primary text-lg">
            £{course.price}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight line-clamp-2">
          {course.title}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-2 flex-1">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary/70" />
            <span>{course.duration} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-primary/70" />
            <span>{course.modules} Modules</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t">
          {/* We might want to link to course details or something, for now just a button */}
          <Button className="w-full" variant="primary" asChild>
            <Link
              target="_blank"
              href={`/course/${course.course_type.slug}/${course.slug}`}
            >
              View Course
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCourseCard;
