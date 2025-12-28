"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Diamond, MapPin, Mail, Phone, Facebook, Linkedin, Twitter } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

export default function NavOffcanvas() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="shadow shadow-blue-200">
          <Diamond className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-gradient-to-b from-[#08152f] to-[#050d23] p-15 text-white border-none w-[360px]">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>
        {/* Close button is auto handled by Sheet */}

        {/* Brand */}
        <div className="mt-4">
          <Image src={"/Clarivive medinsight logo-01.png"} alt="Clarivive Medinsight Logo" className="object-cover object-center" width={210} height={50} />
          {/* <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center font-bold text-xl">
            M
          </div>
          <h2 className="text-2xl font-semibold">Mednix</h2> */}
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-3 leading-relaxed text-sm">
          Clarivive Medinsight is a clean, modern, and fully responsive website solution designed specifically for medical, healthcare, and clinical services.
        </p>

        {/* Contact Info */}
        <div className="mt-4 space-y-3">
          <h3 className="text-2xl font-light">Contact Info</h3>

          <div className="flex gap-4 p-2 items-start duration-100 rounded-2xl hover:shadow-2xl hover:bg-blue-900/30 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-300">
              5th Street, 21st Floor,
              <br />
              New York, USA
            </p>
          </div>

          <div className="flex gap-4 p-2 items-center duration-100 rounded-2xl hover:shadow-2xl hover:bg-blue-900/30 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-300">info@example.com</p>
          </div>

          <div className="flex gap-4 p-2 items-center duration-100 rounded-2xl hover:shadow-2xl hover:bg-blue-900/30 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-300">(888) 456-7890</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-10">
          {[Facebook, Twitter, Linkedin].map((Icon, i) => (
            <Button key={i} size="icon" variant="ghost" className="rounded-full duration-150 hover:scale-115 bg-white text-[#08152f] hover:bg-blue-400 hover:text-white">
              <Icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
