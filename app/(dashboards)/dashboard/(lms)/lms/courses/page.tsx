"use client";
import ContentWrapper from "@/components/dashboard/content-wrapper";
import protectedApi from "@/lib/axios/protected";
import { Loader2, PlayCircle } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CoursesPage() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const res = await protectedApi.get("/courses-list");
        setCourses(res.data.data);
        setProgress(res.data.progress);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  return (
    <ContentWrapper
      heading="My courses"
      subHeading="View all your courses and progress"
      rightContent={
        <Field className="w-full max-w-sm mx-auto lg:me-0">
          <FieldLabel htmlFor="progress-upload">
            <span>Total Progress</span>
            <span className="ml-auto">{progress}%</span>
          </FieldLabel>
          <Progress value={progress} id="progress-upload" />
        </Field>
      }
    >
      {loading && (
        <div className="flex items-center justify-center h-full">
          <Loader2
            strokeWidth={1.5}
            className="animate-spin text-primary-blue w-24 h-24"
          />
        </div>
      )}
      <Suspense
        fallback={
          <Loader2 className="animate-spin text-primary-blue w-24 h-24" />
        }
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: any) => {
            // Generate a fake progress between 0-100 based on course ID for consistency
            const fakeProgress = (course.id * 17) % 100;

            return (
              <div
                key={course.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Link href={`/dashboard/lms/courses/${course.id}`}>
                    <Image
                      src={course.icon}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Progress Overlay (Sleek Bottom Bar) */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200/30 backdrop-blur-sm overflow-hidden">
                    <div
                      className="h-full bg-primary-blue transition-all duration-700 ease-out"
                      style={{ width: `${fakeProgress}%` }}
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 scale-90 origin-top-right">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-blue shadow-sm">
                      {course.modules} Modules
                    </div>
                    {fakeProgress > 0 && (
                      <div className="bg-primary-blue text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {fakeProgress}% Done
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <Link href={`/dashboard/lms/courses/${course.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-blue transition-colors leading-tight">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 italic">
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center gap-4 mb-5 text-[11px] font-medium text-gray-400 uppercase tracking-tighter">
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{course.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span>{course.modules} lessons</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="pt-2">
                    <Link
                      href={`/dashboard/lms/courses/${course.id}`}
                      className="block"
                    >
                      <Button className="w-full bg-slate-50 dark:bg-gray-700/50 hover:bg-primary-blue hover:text-white text-gray-700 dark:text-white border border-gray-100 dark:border-gray-600 transition-all duration-300 font-bold py-5 rounded-xl flex items-center justify-center gap-2 group-hover:border-primary-blue/50">
                        <PlayCircle className="w-5 h-5" />
                        {fakeProgress > 0
                          ? "Resume Learning"
                          : "Start Learning"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Suspense>
    </ContentWrapper>
  );
}

export default CoursesPage;
