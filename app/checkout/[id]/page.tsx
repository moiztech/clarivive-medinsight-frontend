"use client";

import CheckoutPageContent from "@/components/checkout/CheckoutPageContent";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { user } = useAuth();
  const searchParams = new URLSearchParams(window.location.search);
  const callbackUrl = searchParams.get("callBackUrl") || "/";

  if (user?.company_id && user?.role.name === "employee") {
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
