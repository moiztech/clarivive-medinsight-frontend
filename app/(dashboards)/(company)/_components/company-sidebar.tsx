"use client";

import { useCompany } from "@/app/_contexts/CompanyContext";
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
import { ChevronRight, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface CompanySidebarProps {
  navItems: NavItem[];
}

export function CompanySidebar({ navItems }: CompanySidebarProps) {
  const { company, loading } = useCompany();
  const { logout } = useAuth();

  const Header = (isExpanded: boolean) => (
    <>
      {isExpanded && (
        <Link href={"/company"}>
          {loading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ) : company?.logo ? (
            <div className="relative h-11 w-full flex items-center gap-2">
              {/* Use a valid image component or just standard img if the token/auth is needed */}
              <Image
                src={company.logo} // Ensure this is a full URL or proxy
                alt={company.name}
                width={150}
                height={50}
                className="object-contain h-10 rounded-full w-auto"
                priority
              />
              <span className="font-bold text-base truncate flex flex-col">
                {company?.name || "Company"}
                <span className="text-xs text-muted-foreground">
                  {company?.email}
                </span>
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg truncate block">
              {company?.name || "Company"}
            </span>
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
            <Avatar className="h-8 w-8 border border-primary">
              {/* Fallback to user initials or default */}
              {company?.logo ? (
                <AvatarImage src={company.logo} />
              ) : (
                <AvatarFallback>
                  {company?.name?.slice(0, 2).toUpperCase() || "CN"}
                </AvatarFallback>
              )}
            </Avatar>

            {isExpanded && (
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {company?.name ?? "Company"}
                </p>
                <p className="text-xs text-sidebar-accent-foreground truncate">
                  {company?.email ?? "Company Admin"}
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
