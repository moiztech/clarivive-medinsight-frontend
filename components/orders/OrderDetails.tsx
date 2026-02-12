import React from "react";
import { Order } from "./OrdersTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Orders</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.order_id}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Placed on {format(new Date(order.created_at), "PPP p")}
                </CardDescription>
              </div>
              <Badge
                variant={
                  order.status === "paid"
                    ? "default"
                    : order.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
                className="text-sm capitalize px-3 py-1"
              >
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Items</h3>
              <div className="rounded-lg border">
                {order.courses.map((course, index) => (
                  <div key={course.id}>
                    <div className="flex items-center gap-4 p-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                        <Image
                          src={course.icon}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium leading-none">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Course ID: {course.id}
                        </p>
                      </div>
                      <div className="font-medium">£{course.price}</div>
                    </div>
                    {index < order.courses.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-end gap-2 bg-muted/20 p-6">
            <div className="flex w-full max-w-xs items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>£{order.total_amount}</span>
            </div>
            <div className="flex w-full max-w-xs items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>£0.00</span>
            </div>
            <Separator className="my-2 max-w-xs" />
            <div className="flex w-full max-w-xs items-center justify-between font-bold">
              <span>Total</span>
              <span className="text-xl">£{order.total_amount}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
