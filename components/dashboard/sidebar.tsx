"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SidebarGroup, { NavItem } from "./sidebar-group";
import React from "react";

export interface SidebarProps {
  navItems: NavItem[];
  header?: (isExpanded: boolean) => React.ReactNode;
  footer?: (isExpanded: boolean) => React.ReactNode;
}

export function Sidebar({ navItems, header, footer }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const pathname = usePathname();
  // const pathname = usePathname();

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 h-screen overflow-hidden sticky top-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {header ? header(isExpanded) : null}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${isExpanded ? "ml-auto" : "mx-auto"}`}
        >
          {isExpanded ? (
            <ArrowLeftFromLine className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 overflow-x-hidden">
        {navItems.map((item) =>
          item.children ? (
            <SidebarGroup
              key={item.label}
              item={item}
              isExpanded={isExpanded}
              onClick={() => setIsExpanded(isExpanded ? true : true)}
            />
          ) : (
            <Link
              key={item.label}
              href={item.href || "#"}
              className="block mb-2"
            >
              <Button
                variant={pathname === item.href ? "primary" : "ghost"}
                className={`w-full h-auto ${
                  isExpanded
                    ? "ps-4! justify-start py-3!"
                    : "px-2! justify-center"
                } h-full! flex items-center gap-3 ${
                  pathname === item.href
                    ? "bg-primary-blue text-muted"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isExpanded && (
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
              </Button>
            </Link>
          ),
        )}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="border-t border-sidebar-border p-4">
          {footer(isExpanded)}
        </div>
      )}
    </aside>
  );
}
