"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { serverApi } from "@/lib/axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    password_confirmation: "",
  });

  const handleSendOTP = async () => {
    if (!form.email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await serverApi.post("/auth/forgot-password", {
        email: form.email,
      });
      if (res.data?.status === 200) {
        toast.success(res.data?.message);
      }
      setStep(2);
    } catch (error) {
      const err = error as ApiError;
      console.error("Forgot password error:", err);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!form.otp || form.otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    if (form.password !== form.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await serverApi.post("/auth/reset-password", {
        otp: form.otp,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      if (res.status === 400) {
        toast.error(res.data?.message || "Invalid OTP");
      }
      if (res.data?.status === 200) {
        toast.success(res.data?.message || "Password reset successful!");
        router.push("/login");
      }
      // Redirect to login or allow them to click back
    } catch (error) {
      const err = error as ApiError;
      console.error("Reset password error:", err);
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthCard>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {step === 1
              ? "Enter your email to receive a password reset OTP"
              : "Enter the OTP sent to your email and your new password"}
          </p>
        </div>

        <div className="space-y-4">
          {step === 1 ? (
            <>
              <Input
                placeholder="Enter your email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Button
                className="w-full rounded-xl"
                variant={"primary"}
                disabled={loading}
                onClick={handleSendOTP}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium">Reset OTP</p>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={form.otp}
                    onChange={(otp) => setForm({ ...form, otp })}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">New Password</p>
                <div className="relative">
                  <Input
                    placeholder="New password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
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

              <div className="space-y-1">
                <p className="text-sm font-medium">Confirm Password</p>
                <div className="relative">
                  <Input
                    placeholder="Confirm new password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.password_confirmation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password_confirmation: e.target.value,
                      })
                    }
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                className="w-full rounded-xl"
                variant={"primary"}
                disabled={loading}
                onClick={handleResetPassword}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/login" className="text-primary underline">
              Log In
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
