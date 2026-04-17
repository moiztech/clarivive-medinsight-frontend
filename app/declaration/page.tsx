"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/app/_contexts/AuthProvider";
import protectedApi from "@/lib/axios/protected";

function DeclarationPageContent() {
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async () => {
    if (!accepted) {
      toast.error("Please confirm the declaration before continuing.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await protectedApi.post("/accept-declaration", {
        accepted: true,
      });

      setUser(res.data?.data ?? null);
      toast.success("Declaration accepted successfully.");
      router.push(callbackUrl);
    } catch (error) {
      console.error(error);
      toast.error("We could not save your declaration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Card className="border-border/60 shadow-xl">
          <CardHeader className="space-y-4 border-b bg-primary-blue/5">
            <div className="flex items-center gap-3 text-primary-blue">
              <ShieldCheck className="size-6" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Learner Declaration
              </span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              Please confirm this declaration before using your account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="space-y-4 text-sm leading-7 text-slate-700">
              <p>
                I understand that Clarivive Medinsight provides training and
                learning support. Any certificate issued confirms attendance and
                completion of the training only.
              </p>
              <p>
                I understand that training completion does not, by itself,
                confirm clinical competence, employment suitability, or
                authorization to perform regulated tasks.
              </p>
              <p>
                I agree to follow my employer&apos;s policies, local supervision
                requirements, and any legal or professional standards that apply
                to my role.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border bg-slate-50 p-4">
              <Checkbox
                id="declaration-accept"
                checked={accepted}
                onCheckedChange={(value) => setAccepted(Boolean(value))}
              />
              <Label
                htmlFor="declaration-accept"
                className="cursor-pointer text-sm leading-6"
              >
                I have read and understood the declaration above, and I agree to
                continue under these terms.
              </Label>
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                className="min-w-44"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Accept and Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DeclarationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <DeclarationPageContent />
    </Suspense>
  );
}
