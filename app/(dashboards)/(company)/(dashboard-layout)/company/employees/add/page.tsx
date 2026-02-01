"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  Briefcase,
  UserSquare2,
  Calendar,
  ShieldCheck,
  Camera,
  CheckCircle2,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AddEmployeePage() {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ContentWrapper
      heading="Add New Employee"
      subHeading="Management / Employees / Add"
    >
      <form className="max-w-7xl mx-auto space-y-8 pb-10 mt-4">
        <div className="grid grid-cols-1 gap-8">
          {/* Section 1: Personal Information */}
          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <UserSquare2 className="size-5" />
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </div>
              <CardDescription>Basic details of the employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center pb-4">
                <div className="relative group cursor-pointer">
                  <Avatar className="size-28 border-4 border-primary-blue/10 group-hover:border-primary-blue/30 transition-all duration-300 overflow-hidden shadow-inner">
                    <AvatarImage
                      src={profilePreview || ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-muted/50">
                      <Camera className="size-8 opacity-20" />
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-upload"
                    className="absolute inset-0 cursor-pointer"
                  >
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <div className="absolute -bottom-1 -right-1 bg-primary-blue text-white p-2 rounded-full shadow-lg border-2 border-background transform transition-transform group-hover:scale-110">
                    <Camera className="size-4" />
                  </div>
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-3">
                  Upload Profile Picture
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="pl-10 h-11 bg-background/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="pl-10 h-11 bg-background/50"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">
                    Phone Number
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 h-11 bg-background/50"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Organization Details */}
          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <Building2 className="size-5" />
                <CardTitle className="text-xl">Organization Details</CardTitle>
              </div>
              <CardDescription>Workspace and role assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="empId" className="text-sm font-semibold">
                  Employee ID / Code
                </Label>
                <div className="relative group">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                  <Input
                    id="empId"
                    placeholder="EMP-2024-001"
                    className="pl-10 h-11 bg-background/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="designation"
                    className="text-sm font-semibold"
                  >
                    Designation / Role
                  </Label>
                  <div className="relative group">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                    <Input
                      id="designation"
                      placeholder="e.g. Senior Developer"
                      className="pl-10 h-11 bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="joiningDate"
                    className="text-sm font-semibold"
                  >
                    Joining Date
                  </Label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                    <Input
                      id="joiningDate"
                      type="date"
                      className="pl-10 h-11 bg-background/50"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Credentials & Access */}
          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <Lock className="size-5" />
                <CardTitle className="text-xl">Login & Security</CardTitle>
              </div>
              <CardDescription>
                Authentication and account status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 items-start">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Initial Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 h-11 bg-background/50 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary-blue transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground italic mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-primary-blue" />
                    Employee will be prompted to change this on first login.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Account Status
                  </Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="w-full h-11! bg-background/50 border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-green-500" />
                          <span>Active</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-red-500" />
                          <span>Inactive</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Permissions & Settings */}
          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <ShieldCheck className="size-5" />
                <CardTitle className="text-xl">
                  Access & Notifications
                </CardTitle>
              </div>
              <CardDescription>Control permissions and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Platform Role</Label>
                <Select defaultValue="employee">
                  <SelectTrigger className="w-full h-11 bg-background/50 border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    {/* <SelectItem value="supervisor">Supervisor</SelectItem> */}
                    <SelectItem value="manager">Manager / Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-5">
                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox id="eligibility" defaultChecked className="mt-1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="eligibility"
                      className="text-sm font-semibold leading-none cursor-pointer"
                    >
                      Course Assignment Eligibility
                    </label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Allow this employee to be assigned to learning courses and
                      track their progress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="notifications"
                    defaultChecked
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="notifications"
                      className="text-sm font-semibold leading-none cursor-pointer"
                    >
                      Send activation email
                    </label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Send an automatic welcome email with login credentials and
                      account instructions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-semibold">
                  Internal Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about the employee, background, or internal records..."
                  className="min-h-[100px] bg-background/50"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 border-t border-border/50 pt-8 mt-4">
          <Button
            variant="ghost"
            type="button"
            size="lg"
            className="px-8 hover:bg-accent/10"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            size="xl"
            className="px-12 shadow-lg shadow-primary-blue/20"
          >
            Create Employee Account
          </Button>
        </div>
      </form>
    </ContentWrapper>
  );
}

export default AddEmployeePage;
