"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState } from "react";
import { User, Mail, Phone, UserSquare2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEmployee } from "@/app/(dashboards)/(company)/(dashboard-layout)/company/_hooks/useEmployee";

function AddEmployeePage() {
  const { storeEmployee } = useEmployee();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await storeEmployee({
      name: formData.name,
      email: formData.email,
      contact: formData.phone,
    });

    setLoading(false);

    if (success) {
      router.push("/company/employees");
    }
  };

  return (
    <ContentWrapper
      heading="Add New Employee"
      subHeading="Management / Employees / Add"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-8 pb-10 mt-8"
      >
        <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary-blue">
              <UserSquare2 className="size-5" />
              <CardTitle className="text-xl">Employee Details</CardTitle>
            </div>
            <CardDescription>
              Enter the basic information to add a new employee.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 h-11 bg-background/50"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  className="pl-10 h-11 bg-background/50"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="pl-10 h-11 bg-background/50"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="ghost"
            type="button"
            size="lg"
            className="px-8 hover:bg-accent/10"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            size="xl"
            className="px-12 shadow-lg shadow-primary-blue/20"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Employee"
            )}
          </Button>
        </div>
      </form>
    </ContentWrapper>
  );
}

export default AddEmployeePage;
