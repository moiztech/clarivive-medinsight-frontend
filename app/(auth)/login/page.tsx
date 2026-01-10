"use client";

import { useState } from "react";
import api from "@/lib/axios";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@/app/_hooks/useAuthActions";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const { login } = useAuthActions();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/learner/login", form);
      toast.success(res.data.message);
      login({
        user: res.data.user,
        token: res.data.token,
      });
      router.push("/");
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.response?.data?.errors?.email?.[0] || "Signup failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      <p className="text-muted-foreground mb-8">Enter your credentials to access your account</p>

      <div className="space-y-4">
        <Input placeholder="Enter your email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Password</span>
            <Link href="#" className="text-primary">
              forgot password
            </Link>
          </div>

          <Input placeholder="Enter your password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Checkbox id="remember-me" checked={form.remember} onCheckedChange={(v) => setForm({ ...form, remember: Boolean(v) })} />
          <Label htmlFor="remember-me">Remember for 30 days</Label>
        </div>

        <Button className="w-full rounded-xl" variant={"primary"} disabled={loading} onClick={handleSubmit}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary underline">
            Sign Up
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
