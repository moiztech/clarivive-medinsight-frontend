"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftFromLine,
  BarChart3,
  Book,
  Building2,
  Calendar,
  BriefcaseIcon as CertificateIcon,
  ChevronRight,
  Clipboard,
  DollarSign,
  Home,
  LogOut,
  type LucideIcon,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SidebarGroup, { NavItem } from "./sidebar-group";

const navItems: NavItem[] = [
  {
    icon: Home,
    label: "Dashboard",
    children: [
      {
        label: "Company",
        href: "/company",
      },
      {
        label: "LMS",
        href: "/lms",
      },
      {
        label: "Employee",
        href: "/employee",
      },
    ],
  },
  // { icon: Building2, label: "School" },
  // { icon: Users, label: "Student" },
  // { icon: Users2, label: "Teacher" },
  // { icon: Users2, label: "Parent" },
  // { icon: Book, label: "LMS" },
  // { icon: Users, label: "Students" },
  // { icon: Users2, label: "Teachers" },
  // { icon: MessageSquare, label: "Announcements" },
  // { icon: Users, label: "Guardian" },
  // { icon: Clipboard, label: "Classes" },
  // { icon: BarChart3, label: "Examinations" },
  // { icon: DollarSign, label: "Fees Collection" },
  // { icon: Calendar, label: "Attendance" },
  // { icon: Calendar, label: "Leaves" },
  // { icon: CertificateIcon, label: "Certificate" },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 h-screen overflow-hidden sticky top-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {isExpanded && (
          <Image
            src="/Clarivive medinsight logo-01.png"
            alt="Logo"
            width={180}
            height={72}
            priority
            loading="eager"
          />
        )}
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

      {/* User Profile */}
      <div className="px-3 py-2 border-b border-sidebar-border">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className={`w-full ${isExpanded ? "ps-5! justify-between " : "px-2! justify-center"} h-full! flex  items-center gap-3`}
            >
              <Avatar className="h-8 w-8 border border-primary">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>

              {isExpanded && (
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">
                    Jone Copper
                  </p>
                  <p className="text-xs text-sidebar-accent-foreground">
                    Admin
                  </p>
                </div>
              )}
              {isExpanded && (
                <ChevronRight className="h-4 w-4 text-sidebar-accent-foreground ml-auto flex-shrink-0" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          ) : null,
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {isExpanded && <span className="ml-3 truncate">Settings</span>}
        </Button>
      </div>
    </aside>
  );
}
