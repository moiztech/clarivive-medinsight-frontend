"use client";

import CheckoutPageContent from "@/components/checkout/CheckoutPageContent";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user?.company_id && user?.role.name === "employee") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>
          You cannot purchase courses directly. Please login as an individual
          learner to buy courses.
        </p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return <CheckoutPageContent />;
}
