"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import protectedApi from "@/lib/axios/protected";
import {
  Loader2,
  PlayCircle,
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
  duration: string;
  modules: number;
  video_url: string;
  content: string;
}

function CourseDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const res = await protectedApi.get(`/course-detail/${id}`);
        setCourse(res.data.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-blue" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="text-gray-500">
            The course you are looking for might have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ContentWrapper
      heading="Course Details"
      subHeading="View in-depth information and start learning"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Hero & Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="relative h-64 sm:h-80 w-full">
              <Image
                src={course.icon}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <Badge className="bg-primary-blue hover:bg-primary-blue/90 text-white border-none py-1 px-3">
                    Course Preview
                  </Badge>
                  <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                    {course.title}
                  </h1>
                </div>
                <Button
                  asChild
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-6 py-6 h-auto font-bold flex gap-2 w-fit shrink-0"
                >
                  <a
                    href={course.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PlayCircle className="w-6 h-6" />
                    Start/Resume Learning
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Modules</p>
                  <p className="text-sm font-bold">{course.modules} Units</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-bold">{course.duration} Min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <Card className="rounded-3xl border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
              <CardTitle className="text-xl">About this Course</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="prose prose-blue dark:prose-invert max-w-none overflow-hidden break-words">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {course.description}
                </p>
                <div
                  className="mt-3 rich-text-content overflow-hidden break-words"
                  dangerouslySetInnerHTML={{ __html: course.content }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Modules List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Course Content</h3>
            <span className="text-sm font-medium text-gray-500">
              {course.modules} Modules
            </span>
          </div>

          <div className="space-y-3">
            {Array.from({ length: course.modules }).map((_, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary-blue hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 group-hover:bg-primary-blue/10 rounded-xl text-gray-500 group-hover:text-primary-blue font-bold text-sm transition-colors">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate group-hover:text-primary-blue transition-colors">
                    Module {index + 1}: Introduction
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Placeholder title for {course.title}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-blue transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default CourseDetailPage;
