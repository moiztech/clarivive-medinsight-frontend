"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState, useMemo } from "react";
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  User,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  BookOpen,
  MessageCircle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useEmployee } from "../_hooks/useEmployee";
import protectedApi from "@/lib/axios/protected";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface Employee {
  id: number;
  company_id: number;
  name: string;
  email: string;
  primary_contact_name: string | null;
  no_of_employees: number | null;
  logo: string | null;
  contact: string;
  address: string | null;
  email_verified_at: string | null;
  company_token: string | null;
  created_at: string;
  updated_at: string;
  role_id: number;
  company: {
    id: number;
    company_id: number | null;
    name: string;
    email: string;
    primary_contact_name: string | null;
    no_of_employees: string | null;
    logo: string | null;
    contact: string;
    address: string | null;
    email_verified_at: string | null;
    company_token: string | null;
    created_at: string;
    updated_at: string;
    role_id: number;
  };
  role: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

function EmployeesPage() {
  const router = useRouter();
  const { employees, loading, getEmployees, deleteEmployee } = useEmployee();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  React.useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  // Sorting Logic
  const handleSort = (key: keyof Employee) => {
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

  // Filter & Sort Data
  const filteredEmployees = useMemo(() => {
    // Defensive check to ensure employees is an array
    const safeEmployees = Array.isArray(employees) ? employees : [];

    const result = safeEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.updated_at.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) {
          return direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [employees, searchTerm, sortConfig]);

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
  };

  const createOrGetConversation = async (employeeId: number) => {
    try {
      const response = await protectedApi.post("/conversations", {
        user_id: employeeId,
      });
      const data = response.data;
      if (data.status === 200) {
        toast.success(data.message);
        router.push(`/company/chats/${data.data.id}`);
      } else {
        toast.error(data.message || data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create conversation");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentData = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return (
      <ContentWrapper
        heading="Employees"
        subHeading="Manage and view your organization's employees"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="size-10 border-4 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
            <p className="text-muted-foreground animate-pulse">
              Loading employees...
            </p>
          </div>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper
      heading="Employees"
      subHeading="Manage and view your organization's employees"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
            <Input
              placeholder="Search by name, email or phone..."
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
            <Link href="/company/employees/add">
              <Button
                variant="primary"
                className="gap-2 h-10 shadow-lg shadow-primary-blue/20"
              >
                <UserPlus className="size-4" />
                Add Employee
              </Button>
            </Link>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border-none shadow-xl pt-0 bg-card/60 backdrop-blur-md ring-1 ring-border/50 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[400px]">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Employee
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("contact")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Phone
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("created_at")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Created At
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("updated_at")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Updated At
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right font-semibold pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((emp) => (
                    <TableRow
                      key={emp.id}
                      className="group border-border/40 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border border-border/50 group-hover:border-primary-blue/30 transition-colors">
                            <AvatarImage
                              src={emp?.logo || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {emp.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground group-hover:text-primary-blue transition-colors">
                              {emp.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {emp.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {/* Add Phone Icon if needed, or just text */}
                          {emp.contact}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {/* Add Phone Icon if needed, or just text */}
                          {new Date(emp.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {/* Add Phone Icon if needed, or just text */}
                          {new Date(emp.updated_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="hover:bg-primary-blue/10 hover:text-primary-blue"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Eye className="size-4" /> View Details
                            </DropdownMenuItem>
                            <Link href={`/company/employees/${emp.id}/edit`}>
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Edit className="size-4" /> Edit Profile
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/company/employees/${emp.id}/courses`}>
                              <DropdownMenuItem className="gap-2 cursor-pointer">
                                <BookOpen className="size-4" /> Courses
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer"
                              onClick={() => createOrGetConversation(emp.id)}
                            >
                              <MessageCircle className="size-4" /> Start Chat
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(emp.id)}
                              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                            >
                              <Trash2 className="size-4" /> Delete Access
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-48 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <User className="size-8 opacity-20" />
                        <p className="text-sm">
                          No employees found matching your search.
                        </p>
                        <Button
                          variant="link"
                          onClick={() => setSearchTerm("")}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 py-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Showing{" "}
            <span className="text-foreground">{currentData.length}</span> of{" "}
            <span className="text-foreground">{filteredEmployees.length}</span>{" "}
            employees
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 bg-background/30 border-border/50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "ghost"}
                    size="icon-sm"
                    className={`size-8 font-medium ${currentPage === page ? "shadow-md shadow-primary-blue/20" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 bg-background/30 border-border/50"
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

export default EmployeesPage;
