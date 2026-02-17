"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import protectedApi from "@/lib/axios/protected";
import OrdersTable, { Order } from "@/components/orders/OrdersTable";
import { Loader2 } from "lucide-react";

interface ApiResponse {
  status: number;
  message: string;
  data: Order[];
}

const fetchOrders = async (): Promise<Order[]> => {
  const response = await protectedApi.get<ApiResponse>("/orders");
  return response.data.data;
};

const Page = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-destructive">
        <p className="text-lg font-medium">Failed to load order history</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm underline hover:text-destructive/80"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-10 px-5 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground">
            View details of your past orders and enrolled courses.
          </p>
        </div>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default Page;
