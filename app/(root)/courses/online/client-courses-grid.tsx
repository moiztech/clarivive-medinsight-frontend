// app/courses/online/client-courses-grid.tsx

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import CoursesGrid from "@/components/courses/courses-grid";
import { CategoryResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ClientCoursesGrid({
  initialData,
  initialMeta,
  categories,
  type,
}: {
  initialData: any[];
  initialMeta: any;
  categories?: CategoryResponse[] | null;
  type: "online" | "face-to-face";
}) {
  const [category, setCategory] = useState<string | null>(null);
  const query = useInfiniteQuery({
    queryKey: ["courses", type, category],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/type/${type}?page=${pageParam}${category ? `&category=${category}` : ""}`,
      );
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.next_page_url
        ? lastPage.meta.current_page + 1
        : undefined;
    },
    initialData: {
      pages: [
        {
          data: initialData,
          meta: initialMeta,
        },
      ],
      pageParams: [1],
    },
  });

  const courses = query.data?.pages.flatMap((p) => p.data) || [];

  return (
    <>
      <section className="pt-24 pb-30 bg-white lg:px-15 2xl:px-20">
        <div className="text-center mb-10 space-y-4">
          <span className="inline-block px-4 py-1 bg-blue-400/10 text-blue-400 text-sm font-semibold rounded-md tracking-wider uppercase">
            Our Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-medical-navy">
            We provide various courses
          </h2>
        </div>

        <div className="flex mx-2 gap-2 mb-10 justify-center items-center overflow-x-auto touch-pan-x">
          <Button
            variant={category === null ? "primary" : "outline"}
            className="capitalize rounded-full"
            onClick={() => setCategory(null)}
          >
            All
          </Button>
          {categories &&
            categories.map((c) => (
              <Button
                variant={category === c.slug ? "primary" : "outline"}
                className="capitalize rounded-full"
                onClick={() => setCategory(c.slug)}
                key={c.id}
              >
                {c.name}
              </Button>
            ))}
        </div>
        {courses.length > 0 && (
          <CoursesGrid courses={courses} cardLinkPrefix={`course/${type}`} />
        )}

        {query.hasNextPage && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => query.fetchNextPage()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
}
