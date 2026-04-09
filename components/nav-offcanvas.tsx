"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Diamond,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

export default function NavOffcanvas() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="inline-flex h-11 cursor-pointer items-center justify-center rounded-md bg-[#1321F1] px-3 text-white transition-colors hover:bg-[#1321F1]/80">
          <span className="rounded-sm bg-white p-1.5 text-[#0B6B75]">
            <Diamond className="size-5" />
          </span>
        </span>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-gradient-to-b from-[#08152f] to-[#050d23] px-10 py-8 text-white border-none w-[360px]"
      >
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>
        {/* Close button is auto handled by Sheet */}

        {/* Brand */}
        <div>
          <div className="relative h-20 w-[300px] overflow-hidden">
            <Image
              src={"/logo/brand-logo-white.png"}
              alt="Clarivive Medinsight Logo"
              fill
              className="object-contain object-[left_54%] scale-[3.15] origin-left"
            />
          </div>
          {/* <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center font-bold text-xl">
            M
          </div>
          <h2 className="text-2xl font-semibold">Mednix</h2> */}
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-3 leading-relaxed text-sm">
          &ldquo;Our vision is to provide organizations of all sizes with
          accessible,
          practical, and easy-to-understand health, safety, and care training,
          helping your team stay skilled, confident, and compliant in everyday
          practice.&rdquo;
        </p>

        {/* Contact Info */}
        <div className="mt-4 space-y-3">
          <h3 className="text-2xl font-light">Contact Info</h3>

          <div className="flex gap-4 p-2 items-start duration-100 rounded-2xl hover:shadow-2xl hover:bg-blue-900/30 cursor-pointer">
            <div className="p-2 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-300">
              No: 02 Block no : 146, Street 29, Sector G-9-4, Islamabad, ISB, PK
              44000
            </p>
          </div>

          <div className="flex gap-4 p-2 items-center duration-100 rounded-2xl hover:shadow-2xl hover:bg-blue-900/30 cursor-pointer">
            <div className="p-2 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-300">info@clarivive.co.uk</p>
          </div>

          <div className="flex gap-4 p-2 items-center duration-100 rounded-2xl hover:shadow-2xl hover:bg-blue-900/30 cursor-pointer">
            <div className="p-2 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-300">+44 (07345 052986)</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-10">
          {[Facebook, Twitter, Linkedin].map((Icon, i) => (
            <Button
              key={i}
              size="icon"
              variant="ghost"
              className="rounded-full duration-150 hover:scale-115 bg-white text-[#08152f] hover:bg-blue-400 hover:text-white"
            >
              <Icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
