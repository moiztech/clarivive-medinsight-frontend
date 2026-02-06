"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { NavItem } from "@/components/dashboard/sidebar-group";
import { useAuth } from "@/app/_contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, LogOut, Settings, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

interface LmsSidebarProps {
  navItems: NavItem[];
}

export function LmsSidebar({ navItems }: LmsSidebarProps) {
  const { user, logout } = useAuth();

  const Header = (isExpanded: boolean) => (
    <>
      {isExpanded && (
        <Link href={"/dashboard/lms"}>
          <Image
            src="/Clarivive medinsight logo-01.png"
            alt="Clarivive Medinsight"
            width={180}
            height={72}
            priority
            className="object-contain h-12 w-auto"
          />
        </Link>
      )}
    </>
  );

  const Footer = (isExpanded: boolean) => (
    <div className="mt-auto">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className={`w-full ${isExpanded ? "ps-2! justify-between " : "px-0! justify-center"} h-full! flex items-center gap-3`}
          >
            <Avatar className="h-8 w-8 border border-primary">
              {/* Use user avatar if available, else fallback */}
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase() || "ST"}
              </AvatarFallback>
            </Avatar>

            {isExpanded && (
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {user?.name ?? "Student"}
                </p>
                <p className="text-xs text-sidebar-accent-foreground truncate">
                  {user?.role.name ?? "Learner"}
                </p>
              </div>
            )}
            {isExpanded && (
              <ChevronRight className="h-4 w-4 text-sidebar-accent-foreground shrink-0" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 mb-2">
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4" />
            <span>My Courses</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-destructive"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return <Sidebar navItems={navItems} header={Header} footer={Footer} />;
}
