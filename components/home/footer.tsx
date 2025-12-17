"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded" />
              </div>
              <span className="text-2xl font-bold">Medik</span>
            </div>

            <div className="space-y-3 text-gray-400 text-sm">
              <p className="flex items-start gap-2">
                <span className="mt-1">🏠</span>
                <span>
                  No: 58 A, East Madison Street,
                  <br />
                  Baltimore, MD, USA 4508
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 12345678</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@somemail.com</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 w-9 h-9">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 w-9 h-9">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 w-9 h-9">
                <span className="text-sm font-bold">G+</span>
              </Button>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 w-9 h-9">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 w-9 h-9">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Help</h3>
            <ul className="space-y-3">
              {["Scissors", "Glucometer", "Disposable Gloves", "Cleaning Scissor", "Smart Mask"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {["Plaster machine", "Pedometer", "Cleaning Scissor", "Smart Mask", "Pedometer"].map((item, index) => (
                <li key={`${item}-${index}`}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Information</h3>
            <ul className="space-y-3">
              {["Scissors", "Glucometer", "Disposable Gloves", "Cleaning Scissor", "Smart Mask"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          Copyright Powered by Designthemes
        </div>
      </div>

      {/* Back to Top Button */}
      <Button
        size="icon"
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="text-xl">↑</span>
      </Button>
    </footer>
  )
}
