"use client";

import React from "react";

interface BlogStatusBadgeProps {
  status: "published" | "draft" | "archived";
}

const statusStyles: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  archived: "bg-gray-100 text-gray-600 border-gray-200",
};

const statusLabels: Record<string, string> = {
  published: "Published",
  draft: "Draft",
  archived: "Archived",
};

export default function BlogStatusBadge({ status }: BlogStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "published"
            ? "bg-emerald-500"
            : status === "draft"
            ? "bg-amber-500"
            : "bg-gray-400"
        }`}
      />
      {statusLabels[status]}
    </span>
  );
}
