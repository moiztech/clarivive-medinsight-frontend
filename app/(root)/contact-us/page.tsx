"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { FaWhatsapp, FaPinterestP } from "react-icons/fa";
import BreadCrumb from "@/components/BreadCrumb";
import { serverApi } from "@/lib/axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    doctor: "",
    training_type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      await serverApi.post("/contact-inquiry", formData).catch((error) => {
        console.error("Error sending message:", error);
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
        return;
      });
      setSubmitStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        doctor: "",
        training_type: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <BreadCrumb
        paths={[{ label: "Contact Us", href: "/contact-us" }]}
        title="Contact Us"
        coverImg="/CONTACT-US-IMG.png"
      />

      {/* Main Content */}
      <div className="container py-16 md:max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[420px_1fr] justify-center mx-auto gap-8">
          {/* Left Sidebar - Emergency Info */}
          <div>
            <div className="p-8 lg:border-r lg:border-slate-200 lg:sticky lg:top-16">
              <h2 className="text-3xl font-normal text-slate-800 mb-6">
                Learning Support & Assistance
              </h2>
              <p className="text-slate-600 mb-6">
                If you need help with your courses or platform access, please
                contact our support team. Our team is available to guide you
                with course enrollment, technical issues, and learning
                assistance.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      VISIT US
                    </h3>
                    <p className="text-slate-600 text-sm">
                      No: 02 Block no : 146, Street 29, Sector G-9-4, Islamabad,
                      ISB, PK 44000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      General Inquiries
                    </h3>
                    <p className="text-primary-blue text-sm">
                      info@clarivive.co.uk
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      Course Enrollment Support
                    </h3>
                    <a
                      href="tel:+4407345052986"
                      className="text-primary-blue text-sm"
                    >
                      +44 (07345 052986)
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Learner Assistance Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Mon – Sun</span>
                    <span className="font-semibold text-slate-800">
                      24 / 7 Access
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Student Support</span>
                    <span className="font-semibold text-slate-800">
                      9:00 – 18:00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Technical Assistance</span>
                    <span className="font-semibold text-primary-blue">
                      24 / 7 Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t mt-6 pt-6">
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <FaWhatsapp className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <Instagram className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <Youtube className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded text-primary-blue bg-blue-50 cursor-pointer hover:border-primary-blue/80 hover:text-white hover:bg-primary-blue flex items-center justify-center transition-colors">
                    <FaPinterestP className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Appointment Form */}
          <div>
            <div className="p-8">
              <div className="mb-6">
                <span className="text-primary-blue text-sm font-semibold uppercase tracking-wide">
                  Contact Us
                </span>
                <h2 className="text-3xl font-normal text-slate-800 mt-2">
                  Book an Appointment
                </h2>
                <p className="text-slate-600 mt-2">
                  We're here to help you with your healthcare needs. Whether you
                  have questions, need to schedule an appointment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        handleInputChange("department", value)
                      }
                      required
                    >
                      <SelectTrigger className="h-12! w-full!">
                        <SelectValue placeholder="Select Organization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="care-home">Care Home</SelectItem>
                        <SelectItem value="domiciliary-care-agency">
                          Domiciliary Care Agency
                        </SelectItem>
                        <SelectItem value="healthcare-provider">
                          Healthcare Provider
                        </SelectItem>
                        <SelectItem value="supported-living">
                          Supported Living
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="no-organization">
                          No Organization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Job Title / Role"
                      value={formData.doctor}
                      onChange={(e) =>
                        handleInputChange("doctor", e.target.value)
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="text-sm font-medium">Training Type</label>

                    <div className="flex items-center gap-4">
                      {/* Face-to-Face */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="training_type"
                          value="face_to_face"
                          checked={formData.training_type === "face_to_face"}
                          onChange={(e) =>
                            handleInputChange("training_type", e.target.value)
                          }
                          className="accent-primary-blue"
                        />
                        <span>Face-to-Face</span>
                      </label>

                      {/* E-Learning */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="training_type"
                          value="e_learning"
                          checked={formData.training_type === "e_learning"}
                          onChange={(e) =>
                            handleInputChange("training_type", e.target.value)
                          }
                          className="accent-primary-blue"
                        />
                        <span>E-Learning</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="Type Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows={5}
                    className="resize-none min-h-30!"
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-8 bg-primary-blue hover:bg-primary-blue/80 text-white rounded-md"
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </Button>
              </form>
            </div>

            {/* Map Section */}
          </div>
        </div>
        <div className="mt-8 lg:mb-4 rounded-lg overflow-hidden border shadow-sm h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.2721673847805!2d0.06577371214120446!3d51.48987281186605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a8ea154a8fa7%3A0xbc71fb5e164feaf3!2sWoolwich%20Arsenal%20station!5e0!3m2!1sen!2s!4v1768578438676!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
