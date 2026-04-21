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
import { ChevronRight, LogOut, User, LayoutDashboard, FileText, Package, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const superAdminNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/super-admin",
  },
  {
    icon: FileText,
    label: "Blog Management",
    href: "/super-admin/blogs",
  },
  {
    icon: Package,
    label: "Bundle Management",
    href: "/super-admin/bundles",
  },
  {
    icon: User,
    label: "Public Website",
    href: "/",
  },
];

export function SuperAdminSidebar() {
  const { user, logout } = useAuth();

  const Header = (isExpanded: boolean) => (
    <>
      {isExpanded && (
        <Link href={"/super-admin"}>
          <Image
            src="/Clarivive medinsight logo-01.png"
            alt="Clarivive Medinsight"
            width={180}
            height={72}
            priority
            className="object-contain h-13 w-auto"
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
            <User2 className="h-4 w-4" />

            {isExpanded && (
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-sidebar-accent-foreground truncate">
                  Super Admin
                </p>
              </div>
            )}
            {isExpanded && (
              <ChevronRight className="h-4 w-4 text-sidebar-accent-foreground shrink-0" />
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

  return <Sidebar navItems={superAdminNavItems} header={Header} footer={Footer} />;
}
