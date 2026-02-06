/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { clientApi } from "@/lib/axios";
import { tokenStore } from "@/lib/auth/tokenStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/app/_contexts/AuthProvider";

type VerifyState =
  | { status: "loading" }
  | { status: "invalid"; reason?: string }
  | { status: "valid"; org: OrgData };

type OrgData = {
  id: number;
  name: string;
  email: string;
  primary_contact_name: string;
  no_of_employees: string;
  logo: string;
  contact: string;
  address: string;
  company_token: string;
  created_at: string;
  updated_at: string;
};

export default function OnboardingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();

  const token = useMemo(() => params.get("token") || "", [params]);
  const [state, setState] = useState<VerifyState>({ status: "loading" });

  // form state
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orgName, setOrgName] = useState("");
  const [numEmployees, setNumEmployees] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoProgress, setLogoProgress] = useState<number>(0);

  async function urlToFile(url: string) {
    // 1. Fetch the image data from the URL
    const response = await fetch(url);

    // 2. Convert the response to a Blob object
    const blob = await response.blob();

    // 3. Create a File object from the Blob
    // The File constructor takes an array of blobs/buffers, a filename, and options (including type)
    const file = new File([blob], "logo.png", { type: blob.type });

    return file;
  }

  const validateImage = async (file: File): Promise<string | null> => {
    // Check size (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      return "File size must be less than 2MB";
    }

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }

    // Check aspect ratio (preferably square)
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const ratio = img.width / img.height;
        if (ratio < 0.9 || ratio > 1.1) {
          resolve("For best results, please use a square image (1:1 ratio)");
        }
        resolve(null);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve("Could not read image file");
      };
      img.src = objectUrl;
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setLogoError(null);
    setLogoProgress(0);

    const file = files[0];
    const validationError = await validateImage(file);

    // If it's just a ratio warning, we still set the logo but show the warning
    if (validationError && validationError.includes("square")) {
      setLogoError(validationError);
    } else if (validationError) {
      setLogoError(validationError);
      setLogo(null);
      return;
    }

    setLogo(file);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setLogoProgress(Math.min(progress, 100));
    }, 100);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = () => {
    setLogo(null);
    setLogoProgress(0);
    setLogoError(null);
  };

  useEffect(() => {
    setTheme("light"); // Force the desired theme on mount
  }, [setTheme]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!token) {
        setState({ status: "invalid", reason: "missing_token" });
        return;
      }

      try {
        const res = await clientApi.get(`/onboarding/verify/${token}`);
        if (cancelled) return;
        const data = res.data as {
          valid: boolean;
          reason: string;
          data: OrgData;
        };
        // console.log(res);

        if (!data.valid) {
          setState({ status: "invalid", reason: data?.reason });
          return;
        }

        const org = data.data;

        setState({
          status: "valid",
          org: org,
        });

        // Pre-fill form fields if data exists
        if (org.name) setOrgName(org.name);
        if (org.contact) setPhone(org.contact);
        if (org.address) setAddress(org.address);
        if (org.no_of_employees) setNumEmployees(org.no_of_employees);
        if (org.primary_contact_name) setContactName(org.primary_contact_name);
        if (org.logo) setLogo(await urlToFile(org.logo));
        if (org.logo) setLogoProgress(100);
      } catch (e: any) {
        if (cancelled) return;
        setState({
          status: "invalid",
          reason: e?.data?.reason || "verify_failed",
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.status !== "valid") return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Using FormData to handle file upload properly
      const formData = new FormData();
      formData.append("token", token);
      formData.append("org_name", orgName);
      formData.append("num_employees", numEmployees);
      formData.append("contact_name", contactName);
      formData.append("phone", phone);
      formData.append("address", address);
      if (logo) {
        formData.append("logo", logo);
      }

      const res = await clientApi.post("/onboarding/complete", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Onboarding completed successfully");
        tokenStore.set(res.data.token);
        setUser(res.data.data);
        router.push("/welcome");
      } else {
        setSubmitError(res.data?.message || "Could not complete onboarding.");
      }
    } catch (e: any) {
      console.error(e);
      const errorData = e?.response?.data;
      if (errorData?.errors) {
        // If there are field specific errors, we could show them.
        // For now, let's join them or show the main message.
        // Example: { message: "...", errors: { company_token: [...] } }
        const messages = Object.values(errorData.errors).flat().join(", ");
        setSubmitError(messages || errorData.message || "Validation failed.");
      } else {
        setSubmitError(
          errorData?.message || e?.message || "Something went wrong.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary-blue" />
          <p className="text-sm text-muted-foreground">Verifying invite…</p>
        </div>
      </div>
    );
  }

  if (state.status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-destructive">
              Link is not valid
            </CardTitle>
            <CardDescription>
              Reason: {state.reason || "unknown"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Please ask support to send a new invite link.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-sidebar/50">
      <Card className="max-w-4xl w-full shadow-2xl border-primary-blue/10">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-primary-blue">
            Complete your profile
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Please provide your details to finish setting up your organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="rounded-xl bg-primary-blue/5 border border-primary-blue/10 p-5 space-y-3 text-sm italic md:flex md:items-center md:justify-around md:space-y-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary-blue not-italic">
                Organization:
              </span>
              <span className="text-muted-foreground">{state.org?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary-blue not-italic">
                Email:
              </span>
              <span className="text-muted-foreground">{state.org?.email}</span>
            </div>
          </div>

          <form id="onboarding-form" onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {/* Left Column: Organization Details */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                    Organization Info
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organisation / Company Name</Label>
                    <Input
                      id="orgName"
                      placeholder="ABC Medical"
                      className="h-11"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numEmployees">Number of Employees</Label>
                    <Input
                      id="numEmployees"
                      type="number"
                      placeholder="e.g. 50"
                      className="h-11"
                      value={numEmployees}
                      onChange={(e) => setNumEmployees(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                    Primary Contact
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name</Label>
                    <Input
                      id="contactName"
                      placeholder="John Doe"
                      className="h-11"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="h-11"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Branding & Address */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                    Branding & Location
                  </h3>
                  <div className="space-y-2">
                    <Label>Organisation Logo</Label>
                    {!logo ? (
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-muted/50 h-[178px]",
                          logoError
                            ? "border-destructive/50 bg-destructive/5"
                            : "border-border hover:border-primary-blue/50",
                        )}
                        onClick={handleBoxClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <div className="mb-2 bg-primary-blue/10 rounded-full p-3 text-primary-blue">
                          <Upload className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium">Upload Logo</p>
                        <p className="text-[11px] text-muted-foreground mt-1 max-w-[150px]">
                          PNG, JPG or WebP (Max 2MB, 1:1 ratio)
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e.target.files)}
                        />
                      </div>
                    ) : (
                      <div className="border border-border rounded-xl p-4 flex flex-col gap-3 bg-muted/30 h-[178px] justify-center">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-background rounded-lg overflow-hidden shrink-0 border-2 border-primary-blue/10 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={URL.createObjectURL(logo)}
                              alt="Logo preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="truncate">
                                <p className="text-sm font-semibold truncate text-primary-blue">
                                  {logo.name}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">
                                  {(logo.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1"
                                onClick={removeFile}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="h-2 bg-background rounded-full flex-1 overflow-hidden border">
                                <div
                                  className="h-full bg-primary-blue transition-all duration-300"
                                  style={{ width: `${logoProgress}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-primary-blue">
                                {Math.round(logoProgress)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {logoError && (
                      <p
                        className={cn(
                          "text-xs font-medium",
                          logoError.includes("square")
                            ? "text-amber-500"
                            : "text-destructive",
                        )}
                      >
                        {logoError}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Official Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full business address"
                      className="min-h-[125px] resize-none"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm font-semibold text-destructive text-center">
                  {submitError}
                </p>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="pt-2 pb-8 px-6">
          <Button
            variant="primary"
            form="onboarding-form"
            type="submit"
            className="w-full h-12 text-lg font-bold shadow-lg shadow-primary-blue/20"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Onboarding"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
