// app/courses/online/client-courses-grid.tsx

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ServicesGrid from "@/components/courses/services-grid";

export default function ClientCoursesGrid({
  initialData,
  initialMeta,
  type,
}: {
  initialData: any[];
  initialMeta: any;
  type: "online" | "face-to-face";
}) {
  const query = useInfiniteQuery({
    queryKey: ["courses", type],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/type/${type}?page=${pageParam}`,
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
      <ServicesGrid
        services={courses}
        title="Our Courses"
        description="We provide various courses"
        cardLinkPrefix={`course/${type}`}
      />

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
    </>
  );
}
