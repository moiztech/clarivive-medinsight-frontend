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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Menu, ArrowUpIcon, ChevronDown, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
  { label: "BUNDLES", href: "/bundles" },
  {
    label: "BRANCHES",
    href: "/branches",
    // submenu: [
    //   { label: "Branch 1", href: "/services/1" },
    //   { label: "Branch 2", href: "/services/2" },
    // ],
  },

  { label: "ABOUT US", href: "/about-us" },
  { label: "BLOGS", href: "/blogs" },
  { label: "CONTACT US", href: "/contact-us" },
  {
    label: "ORGANIZATIONS",
    href: "/organizations",
  },
];

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses/online?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null,
  );
  const { user, loading } = useAuth();
  const { logout } = useAuth();
  let dashboardLink = "/dashboard/lms";
  let isLearner = true;

  let roleName = "";
  if (user?.role && typeof user.role === "string") {
    roleName = user?.role;
  } else if (user?.role?.name) {
    roleName = typeof user?.role?.name === "string" ? user.role.name.toLowerCase() : "";
  } else if (user?.role?.name) {
    roleName = String(user?.role?.name).toLowerCase();
  }

  if (roleName === "trainer") {
    dashboardLink = "/dashboard/trainer";
    isLearner = false;
  } else if (roleName === "company_admin" || roleName === "companyadmin") {
    dashboardLink = "/company";
    isLearner = false;
  } else if (roleName === "super_admin" || roleName === "superadmin" || roleName === "super-admin" || roleName === "admin") {
    dashboardLink = "/super-admin";
    isLearner = false;
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
                          className="text-sm font-medium text-foreground hover:text-primary-blue transition-colors cursor-pointer"
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
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex cursor-pointer">
                  <Search className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] top-[20%] translate-y-0">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold mb-4">Search Courses</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Type to search for courses, bundles, or topics..."
                    className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg outline-none focus:ring-2 focus:ring-primary-blue transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/10 rounded-full"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </form>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground px-1">Press Enter to search</p>
                </div>
              </DialogContent>
            </Dialog>

            <CartPopover />
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user?.logo} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-start flex-col gap-2">
                      <span className="font-semibold">{user?.name}</span>
                      <span className="text-xs">{user?.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <Link href={dashboardLink}>
                    <DropdownMenuItem className="cursor-pointer">
                      Go to Dashboard
                    </DropdownMenuItem>
                  </Link>
                  {(typeof user.role === "string" ? user.role : user.role?.name) === "learner" && (
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
                  {loading ? "Loading..." : "Login / Signup"}
                  {/* <span className="ml-1 bg-white p-2 before:absolute relative group-hover:text-white before:inset-0 overflow-hidden before:duration-200 before:z-1 before:-translate-x-full before:bg-indigo-600 group-hover:before:translate-x-0 rounded-sm text-secondary"><Diamond className="w-5 h-5 relative z-2" /></span> */}
                </Button>
              </Link>
            )}
            {isLearner || !user ? (
              <>
                {/* <Link href={"/dashboard/lms"}>
                  <Button
                    size={"lg"}
                    className="bg-[#1321F1] py-4! hover:bg-[#1321F1]/80 px-4 text-md group rounded-md text-secondary-foreground hidden md:flex"
                  >
                    LMS
                  </Button>
                </Link> */}
                <div className="hidden md:flex">
                  <NavOffcanvas />
                </div>
              </>
            ) : (
              <div className="hidden md:flex">
                <NavOffcanvas />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
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
