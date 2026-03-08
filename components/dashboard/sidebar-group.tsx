"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  children?: {
    label: string;
    href?: string;
  }[];
}

function SidebarGroup({
  item,
  isExpanded,
  onClick,
}: {
  item: NavItem;
  isExpanded: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  const pathname = usePathname();
  const isAnyChildActive = item.children?.some(
    (child) => child.href === pathname,
  );
  const [isOpen, setIsOpen] = useState(isAnyChildActive || false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant={isAnyChildActive ? "primary" : "ghost"}
          className={cn(
            "w-full justify-between h-auto",
            isExpanded && "px-4! py-3!",
            isAnyChildActive
              ? "bg-primary-blue text-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            <Icon className="size-5" />
            {isExpanded && <span>{item.label}</span>}
          </div>

          {isExpanded && (
            <ChevronDown
              className={cn(
                "h-4 w-4 opacity-70 transition-transform duration-200",
                isOpen ? "rotate-0" : "-rotate-90",
              )}
            />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="transition-all duration-200">
        <div className="relative ml-6 mt-2 space-y-1">
          <span className="absolute left-3 -top-1 h-[85%] w-px bg-border" />

          {item.children?.map((child) => {
            const href = child.href ?? "#";
            const isActive = child.href === pathname;

            return (
              <Link key={child.label} href={href}>
                <Button
                  variant="link"
                  className={cn(
                    "w-full justify-start group hover:text-primary-blue hover:no-underline pl-6 py-2 h-auto relative",
                    isActive && "text-primary-blue",
                  )}
                  onClick={onClick}
                >
                  <span
                    className={cn(
                      "absolute left-2 h-2 w-2 rounded-full group-hover:bg-primary-blue",
                      isActive ? "bg-primary-blue" : "bg-muted",
                    )}
                  />
                  {child.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default SidebarGroup;
