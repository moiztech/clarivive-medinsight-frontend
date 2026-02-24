import { CourseData } from "@/lib/types";
import CoursesGridCard from "./courses-grid-card";

export default function CoursesGrid({
  courses = [],
  cardLinkPrefix = "branches",
}: {
  courses?: CourseData[];
  cardLinkPrefix?: string;
}) {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div
          className={`grid gap-x-px gap-y-px border border-slate-100 
              overflow-hidden rounded-2xl shadow-sm
              ${courses.length < 3 ? "grid-cols-1 md:grid-cols-3 justify-center" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3  3xl:grid-cols-4"}`}
        >
          {courses.map((course, index) => (
            <CoursesGridCard
              linkPrefix={cardLinkPrefix}
              course={course}
              key={index}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
