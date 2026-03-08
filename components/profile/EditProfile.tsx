"use client";
import { useAuth } from "@/app/_contexts/AuthProvider";
import React, { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  UploadCloud,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";

function EditProfile({ role }: { role: string }) {
  const { user, setUser } = useAuth();
  const [preview, setPreview] = useState<string | null>(user?.logo || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Profile fields state
  const [name, setName] = useState(user?.name || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [primaryContactName, setPrimaryContactName] = useState(
    user?.primary_contact_name || "",
  );
  const [address, setAddress] = useState(user?.address || "");

  // Loading states
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const setAndMatchPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  // toggle fields based on role
  const fields =
    role === "learner" || role === "trainer"
      ? [
          { label: "Name", value: user?.name, type: "text", icon: User },
          { label: "Email", value: user?.email, type: "email", icon: Mail },
          { label: "Phone", value: user?.contact, type: "tel", icon: Phone },
          {
            label: "Address",
            value: user?.address,
            type: "text",
            icon: MapPin,
          },
        ]
      : [
          { label: "Name", value: user?.name, type: "text", icon: User },
          { label: "Email", value: user?.email, type: "email", icon: Mail },
          { label: "Phone", value: user?.contact, type: "tel", icon: Phone },
          {
            label: "Address",
            value: user?.address,
            type: "text",
            icon: MapPin,
          },
          {
            label: "Primary contact name",
            value: primaryContactName,
            setter: setPrimaryContactName,
            type: "text",
            icon: BadgeCheck,
          },
        ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("primary_contact_name", primaryContactName);
      formData.append("address", address);

      if (imageFile) {
        formData.append("logo", imageFile);
      }

      const res = await protectedApi.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === 200) {
        toast.success(res.data.message || "Profile updated successfully");
        if (user) {
          const updatedUser = {
            ...user,
            name,
            contact,
            primary_contact_name: primaryContactName,
            address,
            logo: preview || undefined,
          };
          setUser(updatedUser);
        }
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      const axiosError = error as any;
      const errorData = axiosError.response?.data;

      if (errorData?.errors) {
        // Handle Laravel style validation errors
        Object.values(errorData.errors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          } else {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorData?.message || "An error occurred updating profile");
      }
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setIsPasswordLoading(true);
    try {
      const res = await protectedApi.post("/update-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      if (res.data.status === 200) {
        toast.success(res.data.message || "Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);
      const axiosError = error as any;
      if (axiosError.response?.status === 401) {
        toast.error("Current password is incorrect");
      } else {
        toast.error(
          axiosError.response?.data?.message ||
            "An error occurred updating password",
        );
      }
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="container py-5 px-5 max-w-7xl mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              Edit Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your personal information and profile settings.
            </p>
          </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Profile Picture */}
          <div className="lg:col-span-1">
            <div className="bg-card/60 backdrop-blur-md border border-border/50 p-8 rounded-2xl shadow-xl ring-1 ring-border/50 flex flex-col items-center text-center space-y-6 sticky top-24">
              <div className="relative group">
                <Avatar className="size-40 border-4 border-background shadow-2xl ring-2 ring-primary-blue/20">
                  <AvatarImage src={preview || ""} className="object-cover" />
                  <AvatarFallback className="bg-primary-blue text-white text-4xl">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile_picture"
                  className="absolute bottom-1 right-1 bg-primary-blue text-white p-3 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform active:scale-95 z-10"
                >
                  <Camera className="size-5" />
                  <input
                    id="profile_picture"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div>
                <h3 className="text-xl font-bold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {role}
                </p>
              </div>
              <div className="w-full pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-4">
                  Allowed JPG, GIF or PNG. Max size of 800kB
                </p>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full cursor-pointer"
                  asChild
                >
                  <label htmlFor="profile_picture">
                    <UploadCloud className="mr-2 size-4" /> Change Photo
                  </label>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card/60 backdrop-blur-md border border-border/50 p-8 rounded-2xl shadow-xl ring-1 ring-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field, index) => {
                  const Icon = field.icon;
                  // Map field labels to state values/setters for the basic fields
                  let value = field.value;
                  let onChange: (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => void = () => {};

                  if (field.label === "Name") {
                    value = name;
                    onChange = (e) => setName(e.target.value);
                  } else if (field.label === "Phone") {
                    value = contact;
                    onChange = (e) => setContact(e.target.value);
                  } else if (field.label === "Address") {
                    value = address;
                    onChange = (e) => setAddress(e.target.value);
                  } else if (field.label === "Primary contact name") {
                    value = primaryContactName;
                    onChange = (e) => setPrimaryContactName(e.target.value);
                  }

                  return (
                    <Field key={index} className="flex flex-col gap-2">
                      <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                        {Icon && <Icon className="size-4 text-primary-blue" />}
                        {field.label}
                      </FieldLabel>
                      <Input
                        type={field.type}
                        value={(value as string) || ""}
                        onChange={onChange}
                        disabled={field.label === "Email"} // Email is usually not editable this way
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        className="h-11 bg-background/50 focus-visible:ring-primary-blue/30"
                      />
                    </Field>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center justify-end gap-4 border-t border-border/50 pt-8">
                <Button
                  variant="ghost"
                  type="button"
                  className="px-8 hover:bg-accent/10"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  size="xl"
                  onClick={handleProfileUpdate}
                  disabled={isProfileLoading}
                  className="px-12 shadow-lg shadow-primary-blue/20"
                >
                  {isProfileLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save Changes
                </Button>
              </div>
            </div>
            <div className="bg-card/60 backdrop-blur-md border border-border/50 p-8 rounded-2xl shadow-xl ring-1 ring-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* current password, new password, confirm password fields */}
                <Field className="flex flex-col gap-2">
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <Lock className="size-4 text-primary-blue" />
                    Current Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="h-11 bg-background/50 focus-visible:ring-primary-blue/30"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>
                <Field className="flex flex-col gap-2">
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <Lock className="size-4 text-primary-blue" />
                    New Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="h-11 bg-background/50 focus-visible:ring-primary-blue/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>
                <Field className="flex flex-col gap-2">
                  <FieldLabel className="text-sm font-semibold flex items-center gap-2">
                    <Lock className="size-4 text-primary-blue" />
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setAndMatchPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className={`h-11 bg-background/50 focus-visible:ring-primary-blue/30 ${passwordMatch ? "border-green-500" : "border-red-500"}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <p
                      className={`text-sm ${passwordMatch ? "text-green-500" : "text-red-500"}`}
                    >
                      {passwordMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </Field>
              </div>

              <div className="mt-10 flex items-center justify-end gap-4 border-t border-border/50 pt-8">
                <Button
                  variant="ghost"
                  type="button"
                  className="px-8 hover:bg-accent/10"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  size="xl"
                  onClick={handlePasswordUpdate}
                  disabled={isPasswordLoading}
                  className="px-12 shadow-lg shadow-primary-blue/20"
                >
                  {isPasswordLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
