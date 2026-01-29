import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-sidebar">
      <Card className="max-w-xl w-full text-center shadow-2xl border-primary-blue/20">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-blue/20 rounded-full blur-xl animate-pulse" />
              <CheckCircle2 className="h-20 w-20 text-primary-blue relative z-10" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary-blue">
            Welcome to Clarivive Medinsight!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <p className="text-lg text-muted-foreground">
            Your organization profile has been successfully set up. We&apos;re
            excited to have you on board!
          </p>
          <div className="bg-muted/50 p-6 rounded-xl border border-border inline-block text-left w-full">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-primary-blue" />
              What&apos;s next?
            </h3>
            <ul className="text-sm space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary-blue font-bold">•</span>
                Explore your new company dashboard and employee management
                tools.
              </li>
              <li className="flex gap-2">
                <span className="text-primary-blue font-bold">•</span>
                Set up your LMS courses and start training your team.
              </li>
              <li className="flex gap-2">
                <span className="text-primary-blue font-bold">•</span>
                Access real-time medical insights and analytics.
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-8">
          <Button
            asChild
            variant="primary"
            size="lg"
            className="w-full h-12 text-lg"
          >
            <Link href="/company" className="flex items-center gap-2">
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Need help? Check out our{" "}
            <Link
              href="/training-resources"
              className="underline hover:text-primary-blue"
            >
              Documentation
            </Link>{" "}
            or contact support.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
