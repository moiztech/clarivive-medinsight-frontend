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
import { ChevronRight, LogOut, User, BookOpen, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LmsSidebarProps {
  navItems: NavItem[];
}

export function LmsSidebar({ navItems }: LmsSidebarProps) {
  const { user, logout } = useAuth();

  const Header = (isExpanded: boolean) => (
    <>
      {isExpanded && (
        <Link href={"/dashboard/lms"}>
          {user?.role.name == "learner" ? (
            <Image
              src="/Clarivive medinsight logo-01.png"
              alt="Clarivive Medinsight"
              width={180}
              height={72}
              priority
              className="object-contain h-13 w-auto"
            />
          ) : (
            <div className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-primary-blue/10 cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.company?.logo} />
                <AvatarFallback>
                  {user?.company?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm max-w-36 font-semibold text-sidebar-foreground truncate">
                {user?.company?.name ?? "Company"} <br />
                {/* <span className="text-xs font-semibold text-muted-foreground">
                  {user?.company?.email}
                </span> */}
              </p>
            </div>
          )}
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
            <User2 className="h-4 w-4" />

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
          <Link href={"/dashboard/lms/profile"}>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/lms/courses"}>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <BookOpen className="h-4 w-4" />
              My Courses
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem className="gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem> */}
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
