"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import protectedApi from "@/lib/axios/protected";
import OrderDetails from "@/components/orders/OrderDetails"; // Ensure this path is correct
import { Order } from "@/components/orders/OrdersTable"; // Import type
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const fetchOrder = async (id: string): Promise<Order> => {
  const { data } = await protectedApi.get(`/orders/${id}`);
  return data.data;
};

const OrderPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-destructive">
        <p className="text-lg font-medium">Failed to load order details</p>
        <Link href="/orders">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10 px-5 max-w-7xl mx-auto">
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderPage;
