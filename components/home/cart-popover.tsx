"use client";

import React, { useId } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/app/_contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CartPopover() {
  const { items, removeItem, totalItems, totalPrice } = useCart();
  const pathname = usePathname();
  const id = useId();

  // Close popover when navigating (optional, but good UX)
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold animate-in fade-in zoom-in duration-300">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">My Cart</h3>
          <span className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "course" : "courses"}
          </span>
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-slate-900">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some courses to get started!
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex gap-3 group relative">
                  <Link href={item?.link ?? "/"}>
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-sm font-medium text-slate-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm font-bold text-blue-600 mt-1">
                      £{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-slate-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 font-medium">Subtotal</span>
              <span className="text-lg font-bold">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="grid gap-2">
              <Link
                href={`/checkout/${id}?callBackUrl=${pathname || "/"}`}
                className="w-full"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Checkout Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
