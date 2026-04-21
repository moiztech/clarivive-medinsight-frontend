"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Moon, Sun, Menu, Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { useSidebarToggle } from "@/components/dashboard/dashboard-layout-content";
import Link from "next/link";

export function SuperAdminHeader() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { setIsMobileOpen } = useSidebarToggle();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 border-b border-border bg-sidebar h-16" />
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-sidebar">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="text-xl font-semibold text-foreground">
            Super Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button
              variant="outline"
              className="gap-2 px-4 h-10 rounded-full text-xs font-bold text-gray-600 hover:text-indigo-600 border-gray-200"
            >
              <User className="w-4 h-4" />
              Public Site
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="gap-2 w-10 h-10 rounded-full border-gray-200"
            size="icon"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 w-auto h-12 rounded-2xl px-2"
              >
                <Avatar className="h-9 w-9 border border-primary">
                  <AvatarFallback>
                    {user?.name?.slice(0, 2).toUpperCase() || "SA"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "Super Admin"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
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
      </div>
    </header>
  );
}
