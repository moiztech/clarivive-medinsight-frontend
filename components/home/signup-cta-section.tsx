"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupCTASection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-600">Sign up in seconds.</span>{" "}
            <span className="text-gray-900">Simplify training forever.</span>
          </h2>
          <p className="text-xl text-gray-600">
            Because you deserve a training platform that delivers.
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-3xl border-4 border-blue-600 p-6 md:p-8 lg:p-12 shadow-xl">
          <form method="POST">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Name Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your name
                </label>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full">
                    <Input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-14 px-4 text-lg border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                    />
                  </div>
                  <div className="relative flex-1 w-full">
                    <Input
                      type="text"
                      placeholder="Surname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-14 px-4 text-lg border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-4 text-lg border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-end gap-1">
                <Button
                  size="lg"
                  variant={"primary"}
                  className="text-white font-bold text-lg h-14 px-12 rounded-lg whitespace-nowrap"
                  type="submit"
                >
                  Get started
                </Button>
                <p className="text-sm text-gray-500 italic">
                  *No credit card required
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
