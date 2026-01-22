"use client";
import LaboratoryAdvantages, {
  LaboratoryAdvantagesProps,
} from "@/components/about/laboratory-advantages";
import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import {
  Blend,
  Check,
  Pickaxe,
  RefreshCcw,
  ScanFace,
  Star,
} from "lucide-react";
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
  FaFacebook,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  Heart,
  Eye,
  Brain,
  Activity,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Syringe,
  ClipboardList,
  Stethoscope,
  Microscope,
} from "lucide-react";
import React from "react";
import OurMission from "@/components/about/our-mission";
import QualityGovern from "@/components/for-organization/QualityGovern";
import { OrganizationalPortalAccess } from "@/components/for-organization/OrganizationalPortalAccess";
import ProcessSection, {
  ProcessSectionProps,
} from "@/components/courses/process-section";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { serverApi } from "@/lib/axios";
import OrganizationInquiry from "@/components/for-organization/Organization-Inquiry";

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
    imageSrc: "/trainer-learing-icon-01.svg",
    advantages: [
      {
        title: "Face-to-face Training",
        description:
          "Instructor-Led training delivered at your premises or agreed locations by qualified healthcare professionals.",
        icon: ScanFace,
      },
      {
        title: "Online & Blended Learning",
        description:
          "Flexible at your own pace, online and blended courses accessed through our secure LMS.",
        icon: Blend,
      },
      {
        title: "Mandatory & Refresher Training",
        description:
          "Compliance-focused training developed in line with healthcare standards and regulatory frameworks .",
        icon: RefreshCcw,
      },
      {
        title: "Tailored Training Solutions",
        description:
          "Customized programs designed to fit your organization’s size, workforce, and operational needs .",
        icon: Pickaxe,
      },
    ],
  };
  const ProcessSectionProps: ProcessSectionProps = {
    headingMain: "Employer ",
    headingHighlight: "Responsibilities",
    imageSrc:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Training supports learning and awareness and must be applied within the employer’s governance framework. Employers retain responsibility for:",
    steps: [
      {
        title: "Staff Supervision & Induction",
        description:
          "We support organizations with structured training that strengthens staff induction and ongoing supervision, helping teams settle into roles confidently and safely.",
        number: "",
      },
      {
        title: "Role-Specific Competency Assessment",
        description:
          "Our courses help identify and develop role-based competencies, enabling employers to assess skills effectively and maintain high standards of care.",
        number: "",
      },
      {
        title: "Application Within Local Policies & Procedures",
        description:
          "Training is designed to align with your organization’s policies, procedures, and risk assessments, supporting smooth integration into daily practice.",
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
          { label: "Organizations", href: "/organizations" },
          // { label: "Online Courses", href: "/courses/online" },
        ]}
        title="Organizations"
        coverImg="/images/ORGANIZATION-BANNER-IMG.webp"
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
      <OrganizationInquiry />
    </div>
  );
}

export default page;
