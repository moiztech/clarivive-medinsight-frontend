"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Menu, ArrowUpIcon, ChevronDown, ArrowBigRight, ArrowRight } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface NavItem {
  label: string
  href: string
  badge?: string
  submenu?: NavItem[]
}

const navigationItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "PAGES",
    href: "#",
    badge: "New",
    submenu: [
      { label: "About Us", href: "/about-us" },
      { label: "Page 2", href: "/pages/2" },
    ],
  },
  {
    label: "SERVICES",
    href: "#",
    submenu: [
      { label: "Service 1", href: "/services/1" },
      { label: "Service 2", href: "/services/2" },
    ],
  },
  {
    label: "PROJECTS",
    href: "#",
    submenu: [
      { label: "Project 1", href: "/projects/1" },
      { label: "Project 2", href: "/projects/2" },
    ],
  },
  {
    label: "BLOG",
    href: "#",
    submenu: [
      { label: "Blog 1", href: "/blog/1" },
      { label: "Blog 2", href: "/blog/2" },
    ],
  },
  { label: "CONTACT US", href: "/contact-us" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)

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
                  width={200}
                  height={72}
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

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-secondary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </Button>

            <Button size={'lg'} className="bg-blue-500 py-4! hover:bg-blue-500/90 ps-3! pe-1! text-md group rounded-md text-secondary-foreground hidden md:flex">
              Appointment <span className="ml-1 bg-white p-2 before:absolute relative group-hover:text-white before:inset-0 overflow-hidden before:duration-200 before:z-1 before:-translate-x-full before:bg-indigo-600 group-hover:before:translate-x-0 rounded-sm text-secondary"><ArrowRight className="w-5 h-5 relative z-2" /></span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <ArrowUpIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
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
                        setMobileSubmenuOpen(mobileSubmenuOpen === item.label ? null : item.label)
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
                              setMobileMenuOpen(false)
                              setMobileSubmenuOpen(null)
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
          </nav>
        </div>
      </div>
    </header>
  )
}