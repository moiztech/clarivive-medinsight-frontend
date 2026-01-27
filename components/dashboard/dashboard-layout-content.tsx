"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { NavItem } from "./sidebar-group";

interface DashboardLayoutContentProps {
  navItems: NavItem[];
  children: React.ReactNode;
}

export function DashboardLayoutContent({
  navItems,
  children,
}: DashboardLayoutContentProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
