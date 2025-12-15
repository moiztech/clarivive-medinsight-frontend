"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="rounded flex items-center justify-center">
              <Image src="/Clarivive medinsight logo-01.png" alt="Logo" width={200} height={72} />
            </div>
            {/* <span className="text-xl font-bold text-foreground">Clarivive medinsight</span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium text-foreground hover:text-secondary transition-colors cursor-pointer">
                    HOME
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    PAGES
                    <Badge className="ml-2 bg-blue-500 text-secondary-foreground text-xs">New</Badge>
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">SERVICES</NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">PROJECTS</NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">BLOG</NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium text-foreground hover:text-secondary transition-colors cursor-pointer">
                    CONTACT US
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
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
            <Button className="bg-blue-500 hover:bg-blue-500/90 px-7 rounded-none text-secondary-foreground hidden md:flex">
              LMS
              <span className="ml-2">+</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-sm font-medium">
                HOME
              </a>
              <a href="#" className="text-sm font-medium flex items-center gap-2">
                PAGES
                <Badge className="bg-secondary text-secondary-foreground text-xs">New</Badge>
              </a>
              <a href="#" className="text-sm font-medium">
                SERVICES
              </a>
              <a href="#" className="text-sm font-medium">
                PROJECTS
              </a>
              <a href="#" className="text-sm font-medium">
                BLOG
              </a>
              <a href="#" className="text-sm font-medium">
                CONTACT US
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
