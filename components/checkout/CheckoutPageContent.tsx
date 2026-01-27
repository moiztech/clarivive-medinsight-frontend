"use client";

import React, { useState } from "react";
import { Course, CourseData, DetailCourse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingBag, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/_contexts/AuthProvider";
interface CheckoutPageContentProps {
  course: CourseData | DetailCourse | Course;
}

const CheckoutPageContent = ({ course }: CheckoutPageContentProps) => {
  const { user } = useAuth();
  const [discountCode, setDiscountCode] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            CLARIVIVE
          </Link>
          <button className="text-slate-600 hover:text-slate-900 transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[calc(100-80px)]">
        {/* Left Column: Form */}
        <div className="p-4 md:p-8 lg:p-12 space-y-10 border-r border-slate-100">
          {/* Contact */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Contact</h2>
              {/* <Link href="/login" className="text-blue-600 text-sm underline">
                Log in
              </Link> */}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Email or mobile phone number"
                readOnly
                disabled
                value={user?.email}
                className="h-12 border-slate-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
              />
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <label
                  htmlFor="marketing"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  Email me with news and offers
                </label>
              </div> */}
            </div>
          </section>

          {/* Payment */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Payment</h2>
              <p className="text-sm text-slate-500">
                All transactions are secure and encrypted.
              </p>
            </div>
            <RadioGroup
              defaultValue="cod"
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center space-x-3 p-4 border-b border-slate-200 bg-blue-50/20">
                <RadioGroupItem
                  value="cod"
                  id="cod"
                  className="text-primary-blue border-primary-blue"
                />
                <Label
                  htmlFor="cod"
                  className="flex-1 cursor-pointer font-medium"
                >
                  Cash on Delivery (COD)
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4">
                <RadioGroupItem
                  value="bank"
                  id="bank"
                  className="text-primary-blue"
                />
                <Label
                  htmlFor="bank"
                  className="flex-1 cursor-pointer font-medium"
                >
                  Bank Deposit
                </Label>
              </div>
            </RadioGroup>
          </section>

          {/* Billing Address */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Billing address</h2>
            <RadioGroup
              defaultValue="same"
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center space-x-3 p-4 border-b border-slate-200 bg-blue-50/20">
                <RadioGroupItem
                  value="same"
                  id="same"
                  className="text-primary-blue border-primary-blue"
                />
                <Label
                  htmlFor="same"
                  className="flex-1 cursor-pointer font-medium"
                >
                  Same as shipping address
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4">
                <RadioGroupItem
                  value="different"
                  id="different"
                  className="text-primary-blue"
                />
                <Label
                  htmlFor="different"
                  className="flex-1 cursor-pointer font-medium"
                >
                  Use a different billing address
                </Label>
              </div>
            </RadioGroup>
          </section>

          <Button className="w-full h-14 text-lg font-semibold bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg shadow-sm transition-all uppercase tracking-wide">
            Complete order
          </Button>

          {/* Footer Links */}
          <footer className="pt-8 border-t border-slate-100 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-blue-600 uppercase tracking-wider font-medium">
            <Link href="/refund-policy" className="hover:underline">
              Refund policy
            </Link>
            <Link href="/shipping-policy" className="hover:underline">
              Shipping policy
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of service
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </footer>
        </div>

        {/* Right Column: Summary */}
        <div className="bg-slate-50/50 p-4 md:p-8 lg:p-12 space-y-8">
          {/* Course Info */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl border border-slate-200 overflow-hidden bg-white shrink-0">
                <img
                  src={(course as any).thumbnail || (course as any).image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium leading-tight">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">One-time purchase</p>
            </div>
            <div className="text-sm font-medium">
              £{course.price.toFixed(2)}
            </div>
          </div>

          {/* Discount Code */}
          <div className="flex gap-2">
            <Input
              placeholder="Discount code or gift card"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="h-12 border-slate-300 bg-white rounded-lg focus-visible:ring-primary-blue"
            />
            <Button
              variant="outline"
              className="h-12 px-6 bg-slate-100 border-slate-200 text-slate-500 font-semibold hover:bg-slate-200 transition-colors"
              disabled={!discountCode}
            >
              Apply
            </Button>
          </div>

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium text-slate-900">
                £{course.price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-slate-600">Shipping</span>
                <Info className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-slate-900 text-xs font-semibold uppercase">
                Free
              </span>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-500 font-medium tracking-tight">
                  GBP
                </span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  £{course.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPageContent;
