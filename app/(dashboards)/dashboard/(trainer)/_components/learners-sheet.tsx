import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MapPin, UserCheck, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import ContactLearner from "./ContactLearner";

export interface TrainerSchedule {
  id: number;
  course_id: number;
  branch_id: number;
  trainer_id: number;
  title: string;
  spaces_available: number;
  location: string;
  description: string;
  instruction: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  course: {
    id: number;
    course_type_id: number;
    category_id: number;
    icon: string;
    title: string;
    slug: string;
    price: string;
    duration: string;
    modules: number;
    description: string;
    content: string;
    created_at: string;
    updated_at: string;
  };
  branch: {
    id: number;
    title: string;
    icon: string | null;
    slug: string;
    location: string;
    description: string | null;
    created_at: string;
    updated_at: string;
  };
  sessions?: {
    id: number;
    schedule_id: number;
    date: string;
    start_time: string;
    end_time: string;
    status?: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface ScheduleLearner {
  id: number;
  user_id: number;
  schedule_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    logo: string;
    contact: string;
    address: string;
    primary_contact_name: string | null;
    no_of_employees: number | null;
    role_id: number;
  };
}

interface LearnersSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSchedule: TrainerSchedule | null;
  learners: ScheduleLearner[];
  loading: boolean;
}

export function LearnersSheet({
  isOpen,
  onOpenChange,
  selectedSchedule,
  learners,
  loading,
}: LearnersSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="mb-6">
          <VisuallyHidden>Course Learners</VisuallyHidden>
        </SheetHeader>
        <SheetTitle className="text-2xl font-bold flex items-center px-4 gap-2">
          <Users className="text-primary-blue" />
          Course Learners
        </SheetTitle>
        <SheetDescription className="px-4">
          Viewing all learners currently booked for:{" "}
          <span className="font-bold text-foreground">
            {selectedSchedule?.course.title}
          </span>{" "}
          ({selectedSchedule?.title})
        </SheetDescription>

        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : learners.length > 0 ? (
            <div className="space-y-4">
              {learners.map((learner) => (
                <div
                  key={learner.id}
                  className="flex items-start gap-4 p-4 border border-border/50 rounded-xl bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <Avatar className="h-12 w-12 border-2 border-primary-blue/20">
                    <AvatarImage src={learner.user.logo} />
                    <AvatarFallback className="bg-primary-blue/10 text-primary-blue font-bold">
                      {learner.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-bold text-foreground truncate">
                        {learner.user.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant={
                            learner.status === "paid" ? "secondary" : "outline"
                          }
                          className={
                            learner.status === "paid"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : ""
                          }
                        >
                          {learner.status.toUpperCase()}
                        </Badge>
                        <Badge variant={"default"}># {learner.id}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 truncate">
                      {learner.user.email}
                    </p>
                    <div className="flex items-center gap-1 justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] font-medium flex items-center gap-1.5 text-foreground/70">
                          <MapPin size={12} className="text-primary-blue" />
                          {learner.user.address || "No address provided"}
                        </p>
                        <p className="text-[11px] font-medium flex items-center gap-1.5 text-foreground/70">
                          <UserCheck size={12} className="text-primary-blue" />
                          Booked on:{" "}
                          {format(parseISO(learner.created_at), "PPP")}
                        </p>
                      </div>
                      <ContactLearner learner_id={learner.user_id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="p-4 bg-muted/50 rounded-full mb-4">
                <Users className="size-8 opacity-40" />
              </div>
              <p className="font-bold text-foreground">No learners found</p>
              <p className="text-sm text-muted-foreground px-8">
                No one has booked this schedule yet.
              </p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
