"use client";

import React from "react";
import { Search } from "lucide-react";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function BlogSearch({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: BlogSearchProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5" style={{ color: "#98A2B3" }} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-sm placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#6941C6]/20 focus:border-[#6941C6]/40 transition-all duration-200"
        style={{
          border: "1px solid #D0D5DD",
          color: "#101828",
          boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
        }}
      />
    </div>
  );
}
