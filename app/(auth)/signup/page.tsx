"use client";

import { useState } from "react";
import api from "@/lib/axios";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await api.post("/signup", form);

      await new Promise((res) => setTimeout(res, 1000)); // fake delay
      alert("Signup successful (fake)");
    } catch {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            onCheckedChange={(v) =>
              setForm({ ...form, terms: Boolean(v) })
            }
          />
          <span>
            I agree to the{" "}
            <Link href="#" className="underline">
              terms & policy
            </Link>
          </span>
        </div>

        <Button
            variant={'primary'}
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
  );
}
