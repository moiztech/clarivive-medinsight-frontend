"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { clientApi } from "@/lib/axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function RefundRequestForm() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    requestType: "",
    fullName: "",
    email: "",
    phone: "",
    organisation: "",
    courseName: "",
    trainingType: "",
    trainingDate: "",
    bookingRef: "",
    reason: "",
    acceptedPolicy: false,
  });

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.requestType ||
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.courseName.trim() ||
      !form.trainingType ||
      !form.reason.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!form.acceptedPolicy) {
      toast.error("You must accept the policy before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        requestType: form.requestType,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        organisation: form.organisation.trim(),
        courseName: form.courseName.trim(),
        trainingType: form.trainingType,
        trainingDate: form.trainingDate || null,
        bookingRef: form.bookingRef.trim(),
        reason: form.reason.trim(),
      };

      const res = await clientApi.post("/refund-request", payload);

      if (res?.data?.status) {
        toast.success(res?.data?.message || "Request submitted successfully.");
        setForm({
          requestType: "",
          fullName: "",
          email: "",
          phone: "",
          organisation: "",
          courseName: "",
          trainingType: "",
          trainingDate: "",
          bookingRef: "",
          reason: "",
          acceptedPolicy: false,
        });
      } else {
        toast.error(res?.data?.message || "Unable to submit request.");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to submit request. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mt-16 p-10">
      <div className="mb-6">
        <span className="text-cyan-600 text-sm font-semibold uppercase tracking-wide">Contact Us</span>
        <h2 className="text-3xl font-normal text-slate-800 mt-2">Refund, Cancellation or Rescheduling Request</h2>
        <p className="text-slate-600">
          All requests must be submitted using this form. Requests are reviewed in line with our published Cancellation, Rescheduling & Refund Policy. Submission does not guarantee
          approval.
        </p>
      </div>

      {/* Request Type */}
      <div className="space-y-3">
        <Label>Request Type</Label>
        <RadioGroup
          className="ps-4"
          value={form.requestType}
          onValueChange={(v) => updateField("requestType", v)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cancellation" id="cancel" />
            <Label htmlFor="cancel">Cancellation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reschedule" id="reschedule" />
            <Label htmlFor="reschedule">Rescheduling</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="refund" id="refund" />
            <Label htmlFor="refund">Refund Request</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Learner Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <Label>Full Name</Label> */}
          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </div>

        <div>
          {/* <Label>Email Address</Label> */}
          <Input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div>
          {/* <Label>Contact Number</Label> */}
          <Input
            placeholder="Contact Number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <div>
          {/* <Label>Organisation Name (optional)</Label> */}
          <Input
            placeholder="Organisation Name (optional)"
            value={form.organisation}
            onChange={(e) => updateField("organisation", e.target.value)}
          />
        </div>
      </div>

      {/* Training Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <Label>Course Name</Label> */}
          <Input
            placeholder="Course Name"
            value={form.courseName}
            onChange={(e) => updateField("courseName", e.target.value)}
          />
        </div>

        <div className="space-x-3 flex">
          <Label>Training Type</Label>
          <RadioGroup
            className="ps-4 flex"
            value={form.trainingType}
            onValueChange={(v) => updateField("trainingType", v)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="face-to-face" id="ftf" />
              <Label htmlFor="ftf">Face-to-Face</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="elearning" id="elearning" />
              <Label htmlFor="elearning">E-Learning</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          {/* <Label>Scheduled Training Date</Label> */}
          <Input
            placeholder="Scheduled Training Date"
            type="date"
            value={form.trainingDate}
            onChange={(e) => updateField("trainingDate", e.target.value)}
          />
        </div>

        <div>
          {/* <Label>Booking Reference / Invoice Number</Label> */}
          <Input
            placeholder="Booking Reference / Invoice Number"
            value={form.bookingRef}
            onChange={(e) => updateField("bookingRef", e.target.value)}
          />
        </div>
      </div>

      {/* Reason */}
      <div>
        {/* <Label>Reason for Request</Label> */}
        <Textarea
          placeholder="Reason for Request"
          rows={4}
          value={form.reason}
          onChange={(e) => updateField("reason", e.target.value)}
        />
      </div>

      {/* Declaration */}
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={form.acceptedPolicy}
          onCheckedChange={(v) => updateField("acceptedPolicy", Boolean(v))}
        />
        <p className="text-sm">
          I confirm that I have read and understood the Cancellation, Rescheduling & Refund Policy and acknowledge that approval is subject to the terms outlined within it.
        </p>
      </div>

      <Button
        type="submit"
        variant={"primary"}
        className="w-full md:w-auto"
        disabled={submitting}
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </span>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  );
}
