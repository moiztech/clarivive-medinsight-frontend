"use client";

import { useState, useEffect } from "react";
import CheckoutPageContent from "@/components/checkout/CheckoutPageContent";
import { useAuth } from "@/app/_contexts/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { user } = useAuth();
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCallbackUrl(searchParams.get("callBackUrl") || "/");
  }, []);

  if (user?.company_id && (typeof user?.role === "string" ? user.role : user?.role?.name) === "employee") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>
          You cannot purchase courses directly. Please login as an individual
          learner to buy courses.
        </p>
        <Link href={callbackUrl}>
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return <CheckoutPageContent callbackUrl={callbackUrl} />;
}
