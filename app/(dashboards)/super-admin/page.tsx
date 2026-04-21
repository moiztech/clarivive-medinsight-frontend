"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Package, 
  Users, 
  BarChart3, 
  ArrowRight,
  Plus,
  Monitor,
  Calendar,
  Megaphone,
  QrCode,
  Globe,
  UserCog,
  ShieldCheck,
  Image as ImageIcon,
  Loader2,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { getAdminBlogs } from "@/lib/axios/blogs";
import { getAdminBundles } from "@/lib/axios/bundles";
import { toast } from "sonner";

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [bundleCount, setBundleCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [blogRes, bundleRes] = await Promise.all([
          getAdminBlogs({ page: 1 }),
          getAdminBundles({ page: 1 })
        ]);
        
        // Handle cases where the response might be a direct pagination object or wrapped in data
        const totalBlogs = (blogRes as any).total ?? (blogRes as any).data?.total ?? 0;
        const totalBundles = (bundleRes as any).total ?? (bundleRes as any).data?.total ?? 0;
        
        setBlogCount(totalBlogs);
        setBundleCount(totalBundles);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setBlogCount(0);
        setBundleCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Blogs", value: loading ? "..." : blogCount?.toString(), icon: FileText, color: "bg-blue-50 text-blue-600" },
    { label: "Active Bundles", value: loading ? "..." : bundleCount?.toString(), icon: Package, color: "bg-purple-50 text-purple-600" },
    { label: "Total Users", value: "1,240", icon: Users, color: "bg-orange-50 text-orange-600" },
    { label: "Site Analytics", value: "45.2k", icon: BarChart3, color: "bg-green-50 text-green-600" },
  ];

  const mainActions = [
    {
      title: "Blog Management",
      description: "Create, edit, and manage educational articles and news.",
      icon: FileText,
      href: "/super-admin/blogs",
      action: "Manage Blogs",
      addHref: "/super-admin/blogs/add"
    },
    {
      title: "Bundle Management",
      description: "Organize courses into premium bundles and manage pricing.",
      icon: Package,
      href: "/super-admin/bundles",
      action: "Manage Bundles",
      addHref: "/super-admin/bundles/add"
    }
  ];

  const adminModules = [
    { 
      group: "Content & Course Administration",
      items: [
        { title: "SCORM Management", icon: Monitor, desc: "Upload and track SCORM courses, progress, and quizzes.", status: "Active" },
        { title: "Training Setup", icon: Calendar, desc: "Add Face-to-Face sessions and notify trainers immediately.", status: "Updated" },
        { title: "Announcement Bar", icon: Megaphone, desc: "Manage persistent site-wide announcements and launches.", status: "Live" }
      ]
    },
    {
      group: "System Controls",
      items: [
        { title: "Attendance Oversight", icon: QrCode, desc: "Manage QR-based attendance and manual validation marks.", status: "Secure" },
        { title: "Public site Integration", icon: Globe, desc: "Sync public website changes with the LMS backend.", status: "Synced" }
      ]
    }
  ];

  const profileTools = [
    { title: "Information Editing", icon: UserCog, desc: "Update your personal name, email, and identity info." },
    { title: "Security Settings", icon: ShieldCheck, desc: "Change password and manage Two-Factor Authentication." },
    { title: "Personalization", icon: ImageIcon, desc: "Update your display picture and dashboard preferences." }
  ];

  return (
    <div className="p-6 md:p-8 space-y-10 bg-gray-50/30 min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back, {user?.name || "Super Admin"}
          </h1>
          <p className="text-gray-500 mt-1.5 flex items-center gap-2">
            System Administration & Control Portal
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
              v2.4.0
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Public Website
          </Link>
          <button
            className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <div className="mt-5">
              <h3 className="text-3xl font-black text-gray-900 leading-none tracking-tight">
                {stat.value === undefined ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" /> : stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-400 mt-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Management Core */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mainActions.map((feature, i) => (
          <div key={i} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all duration-300">
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.25rem] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm shadow-indigo-100">
                  <feature.icon className="w-8 h-8" />
                </div>
                <Link
                  href={feature.addHref}
                  className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 bg-indigo-50/50 px-4 py-2 rounded-xl transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Quick Entry
                </Link>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 mt-3 text-base leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
            </div>
            <div className="px-8 py-5 bg-indigo-600 text-white flex items-center justify-between group-hover:bg-indigo-700 transition-colors">
              <Link
                href={feature.href}
                className="text-sm font-bold flex items-center gap-2 group/link"
              >
                Launch {feature.action}
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Specialized Admin Functionalities */}
      <div className="space-y-12">
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-8">System Functionalities</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {adminModules.map((module, mIdx) => (
              <div key={mIdx} className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500/70 ml-2">{module.group}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {module.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group cursor-pointer">
                      <div className="p-3.5 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-gray-50 text-gray-400 group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-indigo-400 transition-colors mr-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Self-Management */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Profile Self-Management</h2>
              <p className="text-gray-400 text-sm mt-1">Control your identity and security settings.</p>
            </div>
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-all">
              Save All Changes
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileTools.map((tool, tIdx) => (
              <div key={tIdx} className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:border-indigo-100 hover:bg-white transition-all group">
                <tool.icon className="w-8 h-8 text-indigo-500 mb-5 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-gray-900 mb-2">{tool.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{tool.desc}</p>
                <div className="h-0.5 w-8 bg-indigo-100 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Footer */}
      <div className="py-10 text-center">
         <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
           Clarivive LMS Admin Interface &bull; Secure Connection Ensured
         </p>
      </div>
    </div>
  );
}
