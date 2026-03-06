"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Login successful");

      // Get callbackUrl from query params
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const message =
        err.response?.data?.message || err.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthCard>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground mb-8">
          Enter your credentials to access your account
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Password</span>
              <Link
                href="/forgot-password"
                title="Forgot Password"
                className="text-primary"
              >
                forgot password
              </Link>
            </div>

            <div className="relative">
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Checkbox
              id="remember-me"
              checked={form.remember}
              onCheckedChange={(v) =>
                setForm({ ...form, remember: Boolean(v) })
              }
            />
            <Label htmlFor="remember-me">Remember for 30 days</Label>
          </div>

          <Button
            className="w-full rounded-xl"
            variant={"primary"}
            disabled={loading}
            onClick={handleSubmit}
          >
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

      <div className="h-screen hidden lg:block lg:w-1/2 overflow-hidden rounded-l-4xl">
        <Image
          src={"/images/login.jpeg"}
          alt="Auth page side image"
          height={100}
          width={400}
          className="w-full! h-full! object-cover object-center"
        />
      </div>
    </>
  );
}
