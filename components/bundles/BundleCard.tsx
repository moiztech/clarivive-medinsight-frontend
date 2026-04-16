import Link from "next/link";
import { BookOpen, CalendarRange } from "lucide-react";
import BundleStatusBadge from "./BundleStatusBadge";
import { Bundle } from "@/lib/types/bundle";

interface BundleCardProps {
  bundle: Bundle;
  isAdmin?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const BundleCard = ({ bundle, isAdmin = false, onEdit, onDelete }: BundleCardProps) => {
  const courseCount = bundle.courses?.length || 0;
  const scheduleCount = bundle.schedules?.length || 0;
  const formattedPrice = bundle.is_free ? "FREE" : `$${Number(bundle.price).toFixed(2)}`;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {bundle.banner_url ? (
          <img
            src={bundle.banner_url}
            alt={bundle.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-sm font-medium text-gray-500">
            Bundle Preview
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <BundleStatusBadge status={bundle.status} />
          <div className="space-y-1 text-right text-sm text-gray-500">
            <div className="flex items-center justify-end gap-1">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span>{courseCount} {courseCount === 1 ? "Course" : "Courses"}</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <CalendarRange className="h-4 w-4 text-emerald-500" />
              <span>{scheduleCount} {scheduleCount === 1 ? "Session" : "Sessions"}</span>
            </div>
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {bundle.title}
        </h3>

        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {bundle.description || "No description available"}
        </p>

        <div className="mt-auto text-2xl font-bold text-gray-900">{formattedPrice}</div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
        {isAdmin ? (
          <div className="flex w-full gap-2">
            <button
              onClick={() => onEdit?.(bundle.id)}
              className="flex-1 rounded-lg bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(bundle.id)}
              className="flex-1 rounded-lg bg-red-50 px-4 py-2 text-center text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        ) : (
          <Link
            href={`/bundles/${bundle.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default BundleCard;
