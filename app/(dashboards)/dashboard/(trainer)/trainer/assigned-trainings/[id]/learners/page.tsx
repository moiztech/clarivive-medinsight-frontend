"use client";

import React, { useState, useMemo } from "react";
import ContentWrapper from "@/components/dashboard/content-wrapper";
import {
  Search,
  ArrowUpDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  Mail,
  User,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface Learner {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

const STATIC_LEARNERS: Learner[] = [
  {
    id: "L001",
    name: "Dr. Sarah Jenkins",
    email: "sarah.j@healthcare.com",
    profilePicture: "https://i.pravatar.cc/150?u=sarahj",
  },
  {
    id: "L002",
    name: "James Wilson",
    email: "j.wilson@medix.org",
    profilePicture: "https://i.pravatar.cc/150?u=jamesw",
  },
  {
    id: "L003",
    name: "Emma Thompson",
    email: "ethompson@nursenet.uk",
    profilePicture: "https://i.pravatar.cc/150?u=emmat",
  },
  {
    id: "L004",
    name: "Michael Chen",
    email: "m.chen@hospital.io",
    profilePicture: "https://i.pravatar.cc/150?u=michaelc",
  },
  {
    id: "L005",
    name: "Sophie Laurent",
    email: "slaurent@wellness.fr",
    profilePicture: "https://i.pravatar.cc/150?u=sophiel",
  },
];

function LearnersPage() {
  const params = useParams();
  const router = useRouter();
  const scheduleId = params.id;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Learner;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: keyof Learner) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredLearners = useMemo(() => {
    const result = STATIC_LEARNERS.filter(
      (l) =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);
  const currentData = filteredLearners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <ContentWrapper
      heading="Training Learners"
      subHeading={`Viewing registered learners for Schedule ID: ${scheduleId}`}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="size-4 mr-2" />
            Back to Trainings
          </Button>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
            <Input
              placeholder="Search by name, ID or email..."
              className="pl-10 h-10 bg-background/50 border-border/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 h-10 border-border/50 bg-background/30"
            >
              <Filter className="size-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border-none shadow-xl pt-0 bg-card/60 backdrop-blur-md ring-1 ring-border/50 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[100px]">
                    <button
                      onClick={() => handleSort("id")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      ID
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Learner
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Email Address
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((learner) => (
                    <TableRow
                      key={learner.id}
                      className="group border-border/40 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs font-bold text-muted-foreground">
                        {learner.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 rounded-full overflow-hidden border-2 border-primary-blue/20">
                            <Image
                              src={learner.profilePicture}
                              alt={learner.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-foreground group-hover:text-primary-blue transition-colors">
                            {learner.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="size-3.5" />
                          {learner.email}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-48 text-center text-muted-foreground"
                    >
                      No learners found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 py-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-bold">
              {currentData.length}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-bold">
              {filteredLearners.length}
            </span>{" "}
            entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-border/50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-border/50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default LearnersPage;
