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
import { 
  ChevronRight, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Package, 
  Building, 
  Users, 
  GraduationCap, 
  Mail, 
  ShieldCheck, 
  MessageSquare,
  Building2,
  Undo2,
  UserPlus,
  GitBranch,
  Settings,
  MessageCircle,
  BookOpen,
  CalendarDays,
  Hash,
  List,
  MessageSquareText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

const superAdminNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "http://admin.localhost:8000/dashboard",
  },
  {
    icon: Building,
    label: "Companies",
    href: "http://admin.localhost:8000/companies",
  },
  {
    icon: Users,
    label: "Trainers",
    href: "http://admin.localhost:8000/trainers",
  },
  {
    icon: FileText,
    label: "Blog Management",
    href: "http://admin.localhost:8000/blogs",
  },
  {
    icon: Package,
    label: "Bundle Management",
    href: "http://admin.localhost:8000/bundles",
  },
  {
    icon: GraduationCap,
    label: "Academic",
    children: [
      { label: "Categories", href: "http://admin.localhost:8000/categories" },
      { label: "Courses", href: "http://admin.localhost:8000/courses" },
      { label: "Course Schedules", href: "http://admin.localhost:8000/course-schedules" },
      { label: "Topics", href: "http://admin.localhost:8000/topics" },
    ],
  },
  {
    icon: Mail,
    label: "Inquiries",
    children: [
      { label: "Contact Messages", href: "http://admin.localhost:8000/contact-messages" },
      { label: "Org. Inquiries", href: "http://admin.localhost:8000/organizational-inquiry" },
      { label: "Refund Request", href: "http://admin.localhost:8000/refund-requests" },
      { label: "Sign-Up Inquiries", href: "http://admin.localhost:8000/cta-signups" },
    ],
  },
  {
    icon: ShieldCheck,
    label: "Administration",
    children: [
      { label: "Branches", href: "http://admin.localhost:8000/branches" },
      { label: "Settings", href: "http://admin.localhost:8000/settings" },
    ],
  },
  {
    icon: MessageSquare,
    label: "Chat",
    href: "http://admin.localhost:8000/chat",
  },
];

export function SuperAdminSidebar() {
  const { user, logout } = useAuth();

  const Header = (isExpanded: boolean) => (
    <div className="flex items-center justify-center w-full py-4">
      {isExpanded && (
        <Link href={"/super-admin"}>
          <Image
            src="/images/logo-main.png"
            alt="Clarivive Medinsight"
            width={180}
            height={60}
            priority
            className="object-contain brightness-0 invert"
          />
        </Link>
      )}
    </div>
  );

  const Footer = (isExpanded: boolean) => (
    <div className="mt-auto">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className={`w-full ${isExpanded ? "ps-2! justify-between " : "px-0! justify-center"} h-full! flex items-center gap-3 text-white!`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarFallback className="bg-white/10 text-white">
                  {user?.name?.[0] ?? "A"}
                </AvatarFallback>
              </Avatar>

              {isExpanded && (
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm font-semibold truncate">
                    {user?.name ?? "Admin"}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider opacity-70 truncate">
                    Super Admin
                  </p>
                </div>
              )}
            </div>
            {isExpanded && (
              <ChevronRight className="h-4 w-4 opacity-50 shrink-0" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 mb-2">
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

  return (
    <Sidebar 
      navItems={superAdminNavItems} 
      header={Header} 
      footer={Footer} 
      className="super-admin-sidebar-gradient" 
    />
  );
}
