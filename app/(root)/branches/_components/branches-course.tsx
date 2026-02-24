"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import CoursesGrid from "@/components/courses/courses-grid";
import { CategoryResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

export default function BranchCourse({
  initialData,
  initialMeta,
  categories,
  branch,
  type,
}: {
  initialData: any[];
  initialMeta: any;
  categories?: CategoryResponse[] | null;
  branch: string;
  type: "online" | "face-to-face";
}) {
  const [category, setCategory] = useState<number | null>(null);
  const changeCategory = (id: number | null) => {
    if (id === category) return;
    // setLoading(true);
    setCategory(id);
  };
  const query = useInfiniteQuery({
    queryKey: ["courses", branch, category],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/branch/${branch}?page=${pageParam}${category ? `&category=${category}` : ""}`,
      );
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.next_page_url
        ? lastPage.meta.current_page + 1
        : undefined;
    },
    initialData:
      category === null
        ? {
            pages: [
              {
                data: initialData,
                meta: initialMeta,
              },
            ],
            pageParams: [1],
          }
        : undefined,
  });

  const courses = query.data?.pages.flatMap((p) => p.data) || [];

  return (
    <>
      <div className="flex max-w-full lg:max-w-3/5 mx-auto gap-2 mb-10 justify-center items-center flex-wrap">
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
              variant={category === c.id ? "primary" : "outline"}
              className="capitalize rounded-full"
              onClick={() => changeCategory(c.id)}
              key={c.id}
            >
              {c.name}
            </Button>
          ))}
      </div>

      {courses.length > 0 ? (
        <CoursesGrid courses={courses} cardLinkPrefix={`course/${type}`} />
      ) : (
        <div className="text-center">
          <p className="text-medical-navy">No courses found</p>
        </div>
      )}

      {query.hasNextPage && (
        <div className="flex justify-center mt-10">
          <Button onClick={() => query.fetchNextPage()} variant="outline">
            Load more <ArrowDown />
          </Button>
        </div>
      )}
    </>
  );
}
