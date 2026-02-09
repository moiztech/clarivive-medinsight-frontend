"use client";

import React, { createContext, useContext, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DashboardLayoutContentProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

interface SidebarContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebarToggle() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarToggle must be used within DashboardLayoutContent",
    );
  }
  return context;
}

export function DashboardLayoutContent({
  sidebar,
  header,
  children,
}: DashboardLayoutContentProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">{sidebar}</div>

        {/* Mobile Sidebar - Sheet/Offcanvas */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            {sidebar}
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          {header}

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
