"use client";
import LaboratoryAdvantages, { LaboratoryAdvantagesProps } from "@/components/about/laboratory-advantages";
import BreadCrumb from "@/components/BreadCrumb";
import AboutHero from "@/components/courses/courses-hero";
import Image from "next/image";
import { Blend, Check, Pickaxe, RefreshCcw, ScanFace, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaWhatsapp } from "react-icons/fa";
import { Heart, Eye, Brain, Activity, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Syringe, ClipboardList, Stethoscope, Microscope } from "lucide-react";
import React from "react";
import OurMission from "@/components/about/our-mission";

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
    headingPost: '',
    advantages: [
      {
        title: 'Face-to-face Training',
        description: 'Instructor-Led training delivered at your premises or agreed locations by qualified healthcare professionals.',
        icon: ScanFace
      },
      {
        title: 'Online & Blended Learning',
        description: 'Flexible at your own pace, online and blended courses accessed through our secure LMS.',
        icon: Blend
      },
      {
        title: 'Mandatory & Refresher Training',
        description: 'Compliance-focused training developed in line with healthcare standards and regulatory frameworks .',
        icon: RefreshCcw
      },
      {
        title: 'Tailored Training Solutions',
        description: 'Customized programs designed to fit your organization’s size, workforce, and operational needs .',
        icon: Pickaxe
      },
    ]
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
      <ProcessSection />
      <ContactPage />
    </div>
  );
}

export default page;

function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Sign up and fill in your medical history securely. Setting up your profile this way would ensure that you stay up-to-date with your medical processes.",
    },
    {
      number: "2",
      title: "Choose Your Service",
      description: "Select from our range of services and book a consultation. Booking a consultation with HealNet is fairly simple and straight-forward.",
    },
    {
      number: "3",
      title: "Meet Your Doctor",
      description: "Have a virtual consultation with one of our certified specialists, or go for a physical visit to the doctor in case you opted for a physical check-up.",
    },
  ];

  return (
    <section className="py-24 lg:px-15 2xl:px-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Graphic inspired by the first image */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="2" />
          <path d="M200 100L200 50M200 350L200 300M100 200L50 200M350 200L300 200" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-medical-navy">
            How <span className="text-secondary">our platform</span> works
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Navigating your healthcare journey with HealNet is seamless. Just follow these steps mentioned below to proceed with your selected services. You can also see our FAQ
            section for more guidance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            {/* Step Timeline */}
            <div className="space-y-12 relative">
              {/* Connecting Dashed Line */}
              <div className="absolute left-[26px] top-8 bottom-8 w-0.5 border-l-2 border-dashed border-secondary/30 hidden md:block" />

              {steps.map((step, index) => (
                <div key={index} className="flex gap-8 relative group">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-secondary/20 z-10 transition-transform group-hover:scale-110">
                    {step.number}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-medical-navy group-hover:text-secondary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Image Frame inspired by the "HealNet" design */}
              <div className="relative rounded-[40px] overflow-hidden border-2 border-blue-300">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000&auto=format&fit=crop"
                  alt="Certified medical specialist"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                {/* Float Badge */}
                <div className="absolute bottom-10 left-10 right-10 bg-white rounded-2xl p-5 shadow-xl flex items-center gap-4 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-secondary fill-secondary" />
                  </div>
                  <span className="text-medical-navy font-bold text-lg">Best Certified Team of Specialists</span>
                </div>
              </div>

              {/* Decorative Cross inspired by image */}
              <div className="absolute -top-10 -right-10 w-24 h-28 bg-blue-400/10 rounded-full flex items-center justify-center z-0">
                <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-2 bg-white rounded-full" />
                  <div className="absolute w-2 h-8 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response
      const mockResponse = {
        success: true,
        appointmentId: "APT" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        message: "Your appointment has been successfully booked!",
        details: {
          patientName: formData.name,
          department: formData.department,
          doctor: formData.doctor,
          date: formData.date,
          confirmationSent: formData.email,
        },
      };

      setSubmitStatus({
        type: "success",
        message: `${mockResponse.message} Confirmation ID: ${mockResponse.appointmentId}`,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        doctor: "",
        date: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to book appointment. Please try again.",
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
      {/* <BreadCrumb paths={[{ label: "Contact Us", href: "/contact-us" }]} title="Contact Us" /> */}

      {/* Main Content */}
      <div className="container py-16 md:max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[420px_1fr] justify-center mx-auto gap-8">
          {/* Left Sidebar - Emergency Info */}
          <div>
            <div className="p-8 lg:border-r lg:border-slate-200 lg:sticky lg:top-16">
              <h2 className="text-3xl font-normal text-slate-800 mb-6">Working With Clarivive MedInsight</h2>
              <p className="text-slate-600 mb-6">
                If you are experiencing a medical emergency please call <strong className="text-slate-800">911</strong> immediately or go to your nearest emergency room.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Visit Our Clinic</h3>
                    <p className="text-slate-600 text-sm">5th Street, 21st Floor, New York, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">General Inquiries</h3>
                    <p className="text-cyan-600 text-sm">info@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Appointment Scheduling</h3>
                    <p className="text-cyan-600 text-sm">(888) 4567890</p>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Opening Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Mon - Fri</span>
                    <span className="font-semibold text-slate-800">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sat - Sun</span>
                    <span className="font-semibold text-slate-800">8:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Emergency</span>
                    <span className="font-semibold text-cyan-600">24/7 Hours</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t mt-6 pt-6">
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 flex items-center justify-center transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 flex items-center justify-center transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 flex items-center justify-center transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 flex items-center justify-center transition-colors">
                    <FaWhatsapp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Appointment Form */}
          <div>
            <div className="p-8">
              <div className="mb-6">
                <span className="text-cyan-600 text-sm font-semibold uppercase tracking-wide">Contact Us</span>
                <h2 className="text-3xl font-normal text-slate-800 mt-2">Organizational Enquiry</h2>
                <p className="text-slate-600 mt-2">We're here to help you with your healthcare needs. Whether you have questions, need to schedule an appointment.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Your Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required className="h-12" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className="h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required className="h-12" />
                  </div>
                  <div>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)} required>
                      <SelectTrigger className="h-12! w-full!">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dentist">Dentist</SelectItem>
                        <SelectItem value="eye-care">Eye Care</SelectItem>
                        <SelectItem value="pregnancy">Pregnancy</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Select value={formData.doctor} onValueChange={(value) => handleInputChange("doctor", value)} required>
                      <SelectTrigger className="h-12! w-full!">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-smith">Dr. John Smith</SelectItem>
                        <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="dr-williams">Dr. Michael Williams</SelectItem>
                        <SelectItem value="dr-brown">Dr. Emily Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input type="date" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} required className="h-12" />
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="Type Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    className="resize-none min-h-30!"
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md">
                  {isSubmitting ? "Booking..." : "Book Appointment"}
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
function QualityGovern() {
  const services = ["Skills for Care guidance", "Core Skills Training Framework (CSTF)", "Health and Safety Executive (HSE) guidance"];

  return (
    <section className="py-24 bg-white overflow-hidden lg:px-15 2xl:px-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-blue-400/20 text-blue-400 text-sm font-normal rounded-md tracking-wide uppercase">Quality & Governance</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-medical-navy leading-[1.1]">
                Quality & <span className="text-blue-400 font-serif">Governance</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Our training is developed and reviewed in line with relevant UK guidance, including where applicable:
              </p>
            </div>

            <ul className="grid grid-cols-1  gap-y-4 gap-x-8">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-3 group">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-400/10 flex items-center justify-center transition-colors group-hover:bg-blue-400">
                    <Check className="w-3.5 h-3.5 text-blue-400 transition-colors group-hover:text-white" />
                  </div>
                  <span className="text-medical-navy font-medium text-base">{service}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Training certificates confirm course completion and learning outcomes achieved. They do not replace employer induction, supervision, or role-specific competency
              sign-off.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
                alt="Healthcare professional with patient"
                width={800}
                height={900}
                className="w-full h-auto object-cover aspect-[4/4]"
              />
            </div>
            {/* Decorative element inspired by Paco/Brittany style */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-medical-navy/5 rounded-full z-0 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
