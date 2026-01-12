"use client";
import LaboratoryAdvantages, { LaboratoryAdvantagesProps } from "@/components/about/laboratory-advantages";
import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import { Blend, Check, Pickaxe, RefreshCcw, ScanFace, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaFacebook, FaLinkedin, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Heart, Eye, Brain, Activity, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Syringe, ClipboardList, Stethoscope, Microscope } from "lucide-react";
import React from "react";
import OurMission from "@/components/about/our-mission";
import QualityGovern from "@/components/for-organization/QualityGovern";
import { OrganizationalPortalAccess } from "@/components/for-organization/OrganizationalPortalAccess";
import ProcessSection, { ProcessSectionProps } from "@/components/courses/process-section";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function page() {
  const services = [
    { title: "Angioplasty", icon: Heart },
    { title: "Cardiology", icon: Activity },
    { title: "Dental", icon: Stethoscope },
    { title: "Endocrinology", icon: Syringe },
    { title: "Eye Care", icon: Eye },
    { title: "Neurology", icon: Brain },
    { title: "Orthopaedics", icon: ClipboardList },
    { title: "RMI", icon: Microscope },
  ];
  const LaboratoryAdvantagesProps: LaboratoryAdvantagesProps = {
    badgeText: "What We Offer",
    heading: "What We ",
    highlightedText: "offer",
    headingPost: "",
    advantages: [
      {
        title: "Face-to-face Training",
        description: "Instructor-Led training delivered at your premises or agreed locations by qualified healthcare professionals.",
        icon: ScanFace,
      },
      {
        title: "Online & Blended Learning",
        description: "Flexible at your own pace, online and blended courses accessed through our secure LMS.",
        icon: Blend,
      },
      {
        title: "Mandatory & Refresher Training",
        description: "Compliance-focused training developed in line with healthcare standards and regulatory frameworks .",
        icon: RefreshCcw,
      },
      {
        title: "Tailored Training Solutions",
        description: "Customized programs designed to fit your organization’s size, workforce, and operational needs .",
        icon: Pickaxe,
      },
    ],
  };
  const ProcessSectionProps: ProcessSectionProps = {
    headingMain: "Employer ",
    headingHighlight: "Responsibilities",
    imageSrc:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Training supports learning and awareness and must be applied within the employer’s governance framework. Employers retain responsibility for:",
    steps: [
      {
        title: "Staff Supervision & Induction",
        description:
          "We support organizations with structured training that strengthens staff induction and ongoing supervision, helping teams settle into roles confidently and safely.",
        number: "",
      },
      {
        title: "Role-Specific Competency Assessment",
        description: "Our courses help identify and develop role-based competencies, enabling employers to assess skills effectively and maintain high standards of care.",
        number: "",
      },
      {
        title: "Application Within Local Policies & Procedures",
        description: "Training is designed to align with your organization’s policies, procedures, and risk assessments, supporting smooth integration into daily practice.",
        number: "",
      },
      {
        title: "Informed Staff Deployment & Practice",
        description:
          "Our learning solutions assist organizations in making informed decisions about staff deployment, promoting safe, competent, and compliant workforce practices.",
        number: "",
      },
    ],
  };
  return (
    <div className="min-h-screen bg-white">
      <BreadCrumb
        paths={[
          { label: "For Organizations", href: "/for-organizations" },
          // { label: "Online Courses", href: "/courses/online" },
        ]}
        title="For Organizations"
      />
      {/* <AboutHero /> */}
      <OurMission
        aboutImages={false}
        headingHighlight="while employers remain responsible for staff supervision and competency."
        headingStart="Clarivive MedInsight delivers practical training for health and social care organizations, supporting workforce development, learner safety, and compliance, while employers remain responsible for staff supervision and competency."
      />
      <QualityGovern />
      <LaboratoryAdvantages {...LaboratoryAdvantagesProps} />
      <OrganizationalPortalAccess />
      <ProcessSection {...ProcessSectionProps} />
      <ContactPage />
    </div>
  );
}

export default page;

function ContactPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationTypes: [] as string[],
    otherOrganizationType: "",
    contactName: "",
    jobTitle: "",
    email: "",
    phone: "",
    staffCount: "",
    trainingRequirements: [] as string[],
    message: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      setSubmitStatus({
        type: "error",
        message: "You must provide consent before submitting the enquiry.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response aligned with enquiry context
      const mockResponse = {
        success: true,
        enquiryId: "ENQ-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
        message: "Your enquiry has been successfully submitted.",
      };

      setSubmitStatus({
        type: "success",
        message: `${mockResponse.message} Reference ID: ${mockResponse.enquiryId}`,
      });

      // Reset form
      setFormData({
        organizationName: "",
        organizationTypes: [],
        otherOrganizationType: "",
        contactName: "",
        jobTitle: "",
        email: "",
        phone: "",
        staffCount: "",
        trainingRequirements: [],
        message: "",
        consent: false,
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <BreadCrumb paths={[{ label: "Contact Us", href: "/contact-us" }]} title="Contact Us" /> */}

      {/* Main Content */}
      <div className="container py-16 md:max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[420px_1fr] justify-center mx-auto gap-8">
          {/* Left Sidebar - Emergency Info */}
          <div>
            <div className="p-8 lg:border-r lg:border-slate-200 lg:sticky lg:top-16">
              <h2 className="text-3xl font-normal text-slate-800 mb-4">Working With Clarivive MedInsight</h2>
              <p className="text-slate-600 mb-4">We aim to build professional, transparent working relationships with organizations by providing:</p>

              {/* Contact Info */}
              <div className="space-y-1 mb-3 ps-3">
                <div>• Consistent and standardized training delivery</div>
                <div>• Secure record keeping supporting audit and internal review</div>
                <div>• Clear professional boundaries and governance responsibilities</div>
              </div>

              {/* Opening Hours */}
              <p className="text-slate-600 mb-6">Organizational portal access is subject to acceptance of Clarivive MedInsight’s Organizational Portal Terms of Use.</p>
            </div>
          </div>

          {/* Right Content - Appointment Form */}
          <div>
            <div className="p-8">
              <div className="mb-6">
                <span className="text-primary-blue text-sm font-semibold uppercase tracking-wide">Contact Us</span>
                <h2 className="text-3xl font-normal text-slate-800 mt-2">Organizational Enquiry</h2>
                <p className="text-slate-600 mt-2">
                  If you are an organization interested in working with Clarivive MedInsight, please complete the enquiry form below. A member of our team will contact you to
                  discuss your training requirements.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Name */}
                <div>
                  <Input
                    placeholder="Organization Name"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                {/* Type of Organization */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Type of Organization</Label>

                  <div className="grid md:grid-cols-2 gap-3">
                    {["Care Home", "Domiciliary Care Agency", "Supported Living", "Healthcare Provider", "Other"].map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.organizationTypes?.includes(type)}
                          onCheckedChange={(checked) => {
                            const updated = checked ? [...(formData.organizationTypes || []), type] : formData.organizationTypes.filter((t) => t !== type);

                            handleInputChange("organizationTypes", updated);
                          }}
                        />
                        <Label className="text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>

                  {formData.organizationTypes?.includes("Other") && (
                    <Input
                      placeholder="Please specify"
                      value={formData.otherOrganizationType}
                      onChange={(e) => handleInputChange("otherOrganizationType", e.target.value)}
                      className="h-11 mt-2"
                    />
                  )}
                </div>

                {/* Contact Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Contact Name" value={formData.contactName} onChange={(e) => handleInputChange("contactName", e.target.value)} required className="h-12" />

                  <Input placeholder="Job Title / Role" value={formData.jobTitle} onChange={(e) => handleInputChange("jobTitle", e.target.value)} required className="h-12" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className="h-12" />

                  <Input type="tel" placeholder="Contact Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required className="h-12" />
                </div>

                {/* Staff Count */}
                <div>
                  <Select value={formData.staffCount} onValueChange={(value) => handleInputChange("staffCount", value)} required>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Approximate Number of Staff Requiring Training" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1–10</SelectItem>
                      <SelectItem value="11-25">11–25</SelectItem>
                      <SelectItem value="26-50">26–50</SelectItem>
                      <SelectItem value="51-100">51–100</SelectItem>
                      <SelectItem value="100+">100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Training Requirements */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Training Requirements</Label>

                  <div className="grid md:grid-cols-2 gap-3">
                    {["Mandatory Training / Refreshers", "Face-to-Face Training", "Online / Blended Learning", "Bespoke Training", "Unsure – would like guidance"].map((req) => (
                      <div key={req} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.trainingRequirements?.includes(req)}
                          onCheckedChange={(checked) => {
                            const updated = checked ? [...(formData.trainingRequirements || []), req] : formData.trainingRequirements.filter((r) => r !== req);

                            handleInputChange("trainingRequirements", updated);
                          }}
                        />
                        <Label className="text-sm">{req}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Textarea
                    placeholder="Message / Enquiry Details"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <Checkbox checked={formData.consent} onCheckedChange={(checked) => handleInputChange("consent", checked)} required />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I consent to Clarivive MedInsight contacting me regarding this enquiry. I understand my information will be used only for this purpose and in line with the
                    Privacy Notice.
                  </p>
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit */}
                <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-primary-blue hover:bg-primary-blue/80 text-white">
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>

            {/* Map Section */}
          </div>
        </div>
      </div>
    </div>
  );
}
