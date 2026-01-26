// components/CourseDetailSection.tsx
import { Course, CourseData, DetailCourse } from "@/lib/types";
import { Button } from "../ui/button";
import { Clock, Grid3x2 } from "lucide-react";
import { parse } from "path";
import DOMPurify from "dompurify";

interface Props {
  course: DetailCourse;
}

const CourseDetailSection = ({ course }: Props) => {
  // const sanitizedHtml = DOMPurify.sanitize(course.content || "");
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">
              {course.title}
            </h1>
            <p className="mt-3 text-slate-600">{course?.description}</p>
          </div>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-[360px] object-cover"
            />
            <a
              href={`${course?.video?.url || course?.video?.file}`}
              target="_blank"
              className="absolute bottom-4 left-4 bg-orange-500 text-white px-4 py-2 text-sm rounded-md"
            >
              Watch Trailer
            </a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: course.content || "" }} />
          {/* About */}
          {/* <div>
            <h2 className="text-xl font-semibold text-slate-800">
              About the course
            </h2>
            <p className="mt-2 text-slate-600">{course?.about}</p>
          </div> */}

          {/* Who is this for */}
          {/* <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Who is this course for?
            </h2>
            <p className="mt-2 text-slate-600">{course.whoIsFor}</p>
          </div> */}

          {/* Coverage */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              What does the course cover?
            </h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-x-10 gap-y-2">
              {course?.topics?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2 text-slate-600"
                >
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="p-6 space-y-5 h-fit lg:sticky lg:top-20">
          <div className="text-center">
            <p className="text-sm text-slate-500">From only</p>
            <p className="text-4xl mt-2 font-bold text-primary-blue">
              £{course.price}
            </p>
          </div>
          <div className="text-center">
            <Button
              size={"lg"}
              className="bg-primary-blue mx-auto rounded-sm w-2/4 text-lg hover:bg-primary-blue/80 font-medium"
            >
              Buy Course
            </Button>
          </div>

          <div className="border-t border-b font-medium py-4 flex items-center justify-center gap-6 xl:gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Clock size={35} />{" "}
              <p>
                Duration: <br />
                {course.duration}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Grid3x2 size={35} />{" "}
              <p>
                Modules: <br />
                {course.modules}
              </p>
            </div>
          </div>

          {/* <ul className="space-y-2 text-sm text-slate-600">
            {course.features.map((feature, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-green-600">✓</span>
                {feature}
              </li>
            ))}
          </ul> */}
        </aside>
      </div>
    </section>
  );
};

export default CourseDetailSection;
