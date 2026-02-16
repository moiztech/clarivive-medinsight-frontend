"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, ArrowUpIcon, ChevronDown, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavOffcanvas from "../nav-offcanvas";
import { useAuth } from "@/app/_contexts/AuthProvider";
import CartPopover from "./cart-popover";
// import { useAuthActions } from "@/app/_hooks/useAuthActions";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  submenu?: NavItem[];
}

const navigationItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "COURSES",
    href: "#",
    // badge: "New",
    submenu: [
      { label: "Online", href: "/courses/online" },
      { label: "Face to Face", href: "/courses/face-to-face" },
    ],
  },
  {
    label: "BRANCHES",
    href: "/branches",
    // submenu: [
    //   { label: "Branch 1", href: "/services/1" },
    //   { label: "Branch 2", href: "/services/2" },
    // ],
  },

  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT US", href: "/contact-us" },
  {
    label: "ORGANIZATIONS",
    href: "/organizations",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null,
  );
  const { user } = useAuth();
  const { logout } = useAuth();
  let dashboardLink = "/dashboard/lms";

  if (user?.role.name === "trainer") {
    dashboardLink = "/dashboard/trainer";
  } else if (user?.role.name === "company_admin") {
    dashboardLink = "/company";
  }

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="rounded flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/Clarivive medinsight logo-01.png"
                  alt="Logo"
                  width={210}
                  height={82}
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex-wrap">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.submenu && item.submenu.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="text-sm font-medium">
                          {item.label}
                          {item.badge && (
                            <Badge className="ml-2 bg-primary text-secondary-foreground rounded-none text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="p-3">
                          <ul className="grid gap-2 w-[240px]">
                            {item.submenu.map((sub) => (
                              <li key={sub.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={sub.href}
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-muted! transition"
                                  >
                                    {sub.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-foreground hover:text-secondary transition-colors cursor-pointer"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>

              {/* Important for dropdown positioning/animation in many shadcn setups */}
              {/* <NavigationMenuViewport /> */}
            </NavigationMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>

            <CartPopover />

            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="cursor-pointer">
                  <User className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-start flex-col gap-2">
                      <span className="font-semibold">{user?.name}</span>
                      <span className="text-xs">{user?.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={dashboardLink}>Go to Dashboard</Link>
                  </DropdownMenuItem>
                  {user.role.name === "learner" && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href={"/orders"}>My Orders</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={async () => await logout()}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"}>
                <Button
                  size={"lg"}
                  className="bg-[#1321F1] py-4! hover:bg-[#1321F1]/80 px-4 text-md group rounded-md text-secondary-foreground hidden md:flex"
                >
                  Login
                  {/* <span className="ml-1 bg-white p-2 before:absolute relative group-hover:text-white before:inset-0 overflow-hidden before:duration-200 before:z-1 before:-translate-x-full before:bg-indigo-600 group-hover:before:translate-x-0 rounded-sm text-secondary"><Diamond className="w-5 h-5 relative z-2" /></span> */}
                </Button>
              </Link>
            )}
            <Button
              size={"lg"}
              className="bg-[#1321F1] py-0! hover:bg-[#1321F1]/80 ps-0! pe-2! text-md group rounded-md text-secondary-foreground hidden md:flex"
            >
              <Link className="ps-4! py-2!" href={"/dashboard/lms"}>
                LMS
              </Link>
              <NavOffcanvas />
              {/* <span className="ml-1 bg-white p-2 before:absolute relative group-hover:text-white before:inset-0 overflow-hidden before:duration-200 before:z-1 before:-translate-x-full before:bg-indigo-600 group-hover:before:translate-x-0 rounded-sm text-secondary"><Diamond className="w-5 h-5 relative z-2" /></span> */}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? (
                <ArrowUpIcon className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
            {/* <NavOffcanvas/> */}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden border-t overflow-hidden transition-all duration-700 ease-out ${
            mobileMenuOpen
              ? "max-h-96 py-4 opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="flex flex-col gap-4 px-2">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.submenu && item.submenu.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSubmenuOpen(
                          mobileSubmenuOpen === item.label ? null : item.label,
                        )
                      }
                      className="text-sm font-medium flex items-center gap-2 w-full"
                    >
                      {item.label}
                      {item.badge && (
                        <Badge className="bg-secondary text-secondary-foreground text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 ml-auto transition-transform ${
                          mobileSubmenuOpen === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileSubmenuOpen === item.label && (
                      <div className="flex flex-col gap-2 ml-4 mt-2 border-l">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.label}
                            href={subitem.href}
                            className="text-sm font-medium pl-4 py-1 hover:text-blue-500 transition-colors"
                            onClick={() => {
                              // Optional: close menus after click
                              setMobileMenuOpen(false);
                              setMobileSubmenuOpen(null);
                            }}
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            {user ? (
              <div className="flex md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <span className="font-bold">{user?.email}</span> <br />
                      {user?.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => logout()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href={"/login"}>
                <Button
                  size={"lg"}
                  className="bg-[#1321F1] py-4! hover:bg-[#1321F1]/80 px-4 text-md group rounded-md text-secondary-foreground flex md:hidden"
                >
                  Login / Signup
                  {/* <span className="ml-1 bg-white p-2 before:absolute relative group-hover:text-white before:inset-0 overflow-hidden before:duration-200 before:z-1 before:-translate-x-full before:bg-indigo-600 group-hover:before:translate-x-0 rounded-sm text-secondary"><Diamond className="w-5 h-5 relative z-2" /></span> */}
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
