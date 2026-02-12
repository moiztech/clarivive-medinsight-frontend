"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export interface Course {
  id: number;
  title: string;
  price: string;
  icon: string;
}

export interface Order {
  order_id: number;
  total_amount: string;
  status: string;
  created_at: string;
  courses: Course[];
}

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_id} className="hover:bg-muted/50">
              <TableCell className="font-medium">#{order.order_id}</TableCell>
              <TableCell>
                {format(new Date(order.created_at), "PPP p")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "paid"
                      ? "default"
                      : order.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                  className="capitalize"
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  {order.courses.map((course) => (
                    <div key={course.id} className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-md border">
                        <Image
                          src={course.icon}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">
                          {course.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          £{course.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right font-bold">
                £{order.total_amount}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/orders/${order.order_id}`}>
                  <Button variant="outline">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
