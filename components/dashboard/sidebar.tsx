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
  ChevronRight,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SidebarGroup, { NavItem } from "./sidebar-group";
import { useAuth } from "@/app/_contexts/AuthProvider";

export interface SidebarProps {
  navItems: NavItem[];
}

export function Sidebar({ navItems }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 h-screen overflow-hidden sticky top-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {isExpanded && (
          <Link href={"/"}>
            <Image
              src="/Clarivive medinsight logo-01.png"
              alt="Logo"
              width={180}
              height={72}
              priority
              loading="eager"
            />
          </Link>
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
                    {user?.name}
                  </p>
                  <p className="text-xs text-start text-sidebar-accent-foreground">
                    {user?.role}
                  </p>
                </div>
              )}
              {isExpanded && (
                <ChevronRight className="h-4 w-4 text-sidebar-accent-foreground ml-auto shrink-0" />
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
      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="h-5 w-5 shrink-0" />
          {isExpanded && <span className="ml-3 truncate">Settings</span>}
        </Button>
      </div>
    </aside>
  );
}
