import React from "react";

function SectionBadge({ title }: { title: string }) {
  return (
    <span className="inline-block px-4 py-1 bg-primary-blue/10 text-primary-blue text-sm font-semibold rounded-md tracking-wider uppercase">
      {title}
    </span>
  );
}

export default SectionBadge;
