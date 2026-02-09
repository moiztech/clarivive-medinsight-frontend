"use client";

import { CourseData, DetailCourse } from "@/lib/types";
import { Button } from "../ui/button";
import { Clock, Grid3x2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cartItem, useCart } from "@/app/_contexts/CartContext";
import { toast } from "sonner";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useId } from "react";

interface Props {
  course: DetailCourse;
}

const CourseDetailSection = ({ course }: Props) => {
  const { addItem, removeItem, items } = useCart();
  const isInCart = items.some((it) => it.id === course.id);
  const link = usePathname();
  const id = useId();
  const handleToggleCart = () => {
    if (isInCart) {
      removeItem(course.id);
      toast.success("Removed from cart");
    } else {
      // Convert DetailCourse to CourseData
      const courseData: cartItem = {
        id: course.id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        description: course.description,
        price: course.price,
        topics: course.topics,
        link: link,
      };
      addItem(courseData);
      toast.success("Added to cart!");
    }
  };

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
          <div className="relative rounded-xl overflow-hidden w-full h-[240px] md:h-[300px]! lg:h-[360px]!">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
            <a
              href={`${course?.video?.url || course?.video?.file}`}
              target="_blank"
              className="absolute bottom-4 left-4 bg-orange-500 text-white px-4 py-2 text-sm rounded-md z-10"
            >
              Watch Trailer
            </a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: course.content || "" }} />

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
          <div className="flex flex-col gap-3">
            <Button
              size={"lg"}
              onClick={handleToggleCart}
              className="bg-primary-blue rounded-md w-full text-lg hover:bg-primary-blue/80 font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
            <Link href={`/checkout/${id}`} className="w-full">
              <Button
                size={"lg"}
                variant="outline"
                className="rounded-md w-full text-lg font-medium"
              >
                Buy Now
              </Button>
            </Link>
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
        </aside>
      </div>
    </section>
  );
};

export default CourseDetailSection;
