"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { useCart } from "@/app/_contexts/CartContext";
import Image from "next/image";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { serverApi } from "@/lib/axios";
import { Branch } from "@/lib/types";

const CheckoutPageContent = ({ callbackUrl }: { callbackUrl: string }) => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<
    Record<number, number | null>
  >({});

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await serverApi.get("/branches");
      if (res?.data?.status === true) {
        setBranches(res?.data?.data);
      }
    };
    fetchBranches();
  }, []);
  const router = useRouter();
  const handleCompleteOrder = async () => {
    setLoading(true);
    try {
      const res = await protectedApi.post("/checkout", {
        courses: items.map((item) => ({
          id: item.id,
          branch_id:
            item.type === "face-to-face"
              ? (selectedBranches[item.id] ?? null)
              : null,
        })),
        // payment_method: "cod",
      });
      if (res?.data?.status === 200) {
        toast.success(
          "Order placed successfully ID#" + res?.data?.data?.order_id,
        );
        setLoading(false);
        clearCart();
        router.push(`/dashboard/lms`);
      } else {
        toast.error(res?.data?.message ?? "Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  const [discountCode, setDiscountCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">
          Add some courses to your cart before checking out.
        </p>
        <Link href={callbackUrl}>
          <Button className="bg-primary-blue">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href={callbackUrl}
            className="text-2xl font-bold tracking-tight text-primary-blue"
          >
            CLARIVIVE
          </Link>
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-900 transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {items.length}
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Column: Form */}
        <div className="p-4 md:p-8 lg:p-12 space-y-10 border-r relative border-slate-100">
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
              <Loader2 className="w-12 h-12 animate-spin text-primary-blue" />
            </div>
          )}
          {/* Contact */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Contact Details</h2>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="Email address"
                  readOnly
                  disabled
                  value={user?.email || ""}
                  className="h-12 border-slate-300 bg-slate-50 rounded-lg cursor-not-allowed"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  readOnly
                  disabled
                  value={user?.name || ""}
                  className="h-12 border-slate-300 bg-slate-50 rounded-lg cursor-not-allowed"
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Payment Method</h2>
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

          <Button
            onClick={handleCompleteOrder}
            className="w-full h-14 text-lg font-semibold bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg shadow-sm transition-all uppercase tracking-wide"
          >
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
        <div className="bg-slate-50/50 p-4 pb-32 lg:pb-0 md:p-8 lg:p-12 space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          {/* Cart Items */}
          <div className="space-y-2 md:max-h-[400px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 mt-5 flex-col md:flex-row md:items-center animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <div className="relative">
                  <div className="w-full md:w-26 h-50 md:h-16 rounded-xl border border-slate-200 overflow-hidden bg-white shrink-0">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={104}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] z-3 font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="flex-1 text-start min-w-0">
                  <h3 className="text-sm font-medium leading-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">
                    Course
                  </p>
                </div>
                <div className="text-sm text-end font-semibold">
                  £{item.price.toFixed(2)}
                  {item.type === "face-to-face" && (
                    <div className="grid gap-2 mt-2">
                      {/* filter branches based on item.branches */}
                      <Combobox
                        required
                        items={branches.filter((branch) =>
                          item.branches?.includes(branch?.id),
                        )}
                        autoHighlight
                      >
                        <ComboboxInput
                          onChange={(e) => {
                            const selected = branches.find(
                              (b) => b.title === e.target.value,
                            );
                            setSelectedBranches((prev) => ({
                              ...prev,
                              [item.id]: selected?.id ?? null,
                            }));
                          }}
                          placeholder="Select a Branch"
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>No branches found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item.id} value={item.title}>
                                <Image
                                  width={80}
                                  height={70}
                                  src={item.icon}
                                  alt={item.title}
                                />
                                {item.title}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            {/* Discount Code */}
            <div className="flex gap-2">
              <Input
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="h-12 border-slate-300 bg-white rounded-lg focus-visible:ring-primary-blue"
              />
              <Button
                variant="outline"
                className="h-12 px-6 bg-white border-slate-200 font-semibold hover:bg-slate-50 transition-colors"
                disabled={!discountCode}
              >
                Apply
              </Button>
            </div>

            {/* Totals */}
            <div className="fixed md:static bottom-0 left-0 right-0 md:bottom-auto space-y-2 pt-4 px-4 md:px-0 pb-4 md:pb-0 bg-white md:bg-transparent border-t md:border-t-0 border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:shadow-none z-50">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
              {/* <div className="flex justify-between text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <span>Shipping</span>
                  <Info className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-green-600 text-xs font-bold uppercase">
                  Free
                </span>
              </div> */}

              <div className="pt-4 mt-4 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    GBP
                  </span>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">
                    £{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPageContent;
