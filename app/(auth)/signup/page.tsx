"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/_contexts/AuthProvider"; // ✅

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      toast.success("User registered successfully");
      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthCard>
        <h1 className="text-3xl font-bold mb-10">Get Started Now</h1>

        <div className="space-y-4">
          <Input
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={form.terms}
              onCheckedChange={(v) => setForm({ ...form, terms: Boolean(v) })}
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="underline">
                terms & policy
              </Link>
            </span>
          </div>

          <Button
            variant={"primary"}
            className="w-full rounded-xl"
            disabled={loading || !form.terms}
            onClick={handleSubmit}
          >
            {loading ? "Signing up..." : "Signup"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Sign In
            </Link>
          </div>
        </div>
      </AuthCard>

      <div className="h-screen hidden lg:block lg:w-1/2 overflow-hidden rounded-l-4xl">
        <Image
          src={"/images/signup.jpeg"}
          alt="Auth page side image"
          height={100}
          width={400}
          className="w-full! h-full! object-cover object-center"
        />
      </div>
    </>
  );
}
