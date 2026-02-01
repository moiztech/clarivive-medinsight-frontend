"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState, useMemo } from "react";
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  User,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  CheckCircle2,
  XCircle,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Mock Employee Data
const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: "John Doe",
    email: "john@clarivive.com",
    department: "IT",
    role: "Senior Developer",
    status: "active",
    joiningDate: "2024-01-15",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@clarivive.com",
    department: "HR",
    role: "HR Manager",
    status: "active",
    joiningDate: "2023-11-20",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert@clarivive.com",
    department: "IT",
    role: "Junior Developer",
    status: "inactive",
    joiningDate: "2024-02-01",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@clarivive.com",
    department: "Sales",
    role: "Sales Executive",
    status: "active",
    joiningDate: "2023-09-10",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "michael@clarivive.com",
    department: "Operations",
    role: "Operations Head",
    status: "active",
    joiningDate: "2023-05-24",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@clarivive.com",
    department: "HR",
    role: "Recruiter",
    status: "active",
    joiningDate: "2024-03-05",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david@clarivive.com",
    department: "IT",
    role: "Systems Admin",
    status: "inactive",
    joiningDate: "2023-12-12",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: 8,
    name: "Jessica Taylor",
    email: "jessica@clarivive.com",
    department: "Marketing",
    role: "Marketing Lead",
    status: "active",
    joiningDate: "2023-08-30",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
  {
    id: 9,
    name: "Kevin Anderson",
    email: "kevin@clarivive.com",
    department: "Finance",
    role: "Accountant",
    status: "active",
    joiningDate: "2024-01-05",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
  },
  {
    id: 10,
    name: "Linda Moore",
    email: "linda@clarivive.com",
    department: "Sales",
    role: "Sales Manager",
    status: "active",
    joiningDate: "2023-06-15",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
  },
  {
    id: 11,
    name: "Tom Harris",
    email: "tom@clarivive.com",
    department: "IT",
    role: "Project Manager",
    status: "active",
    joiningDate: "2023-04-20",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
  },
  {
    id: 12,
    name: "Barbara White",
    email: "barbara@clarivive.com",
    department: "Operations",
    role: "Logistics",
    status: "inactive",
    joiningDate: "2024-01-25",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Barbara",
  },
];

function EmployeesPage() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Sorting Logic
  const handleSort = (key: string) => {
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
    const result = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig) {
      result.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [employees, searchTerm, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentData = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
              placeholder="Search by name, email or department..."
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
                  <TableHead className="w-[300px]">
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
                      onClick={() => handleSort("department")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Department
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Status
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("joiningDate")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Joining Date
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
                            <AvatarImage src={emp.image} />
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
                          <Building2 className="size-3.5" />
                          {emp.department}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">
                        {emp.role}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            emp.status === "active" ? "default" : "secondary"
                          }
                          className={
                            emp.status === "active"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                              : "bg-muted/50 text-muted-foreground"
                          }
                        >
                          {emp.status === "active" ? (
                            <CheckCircle2 className="size-3 mr-1" />
                          ) : (
                            <XCircle className="size-3 mr-1" />
                          )}
                          {emp.status.charAt(0).toUpperCase() +
                            emp.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground tabular-nums">
                          <Calendar className="size-3.5" />
                          {emp.joiningDate}
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
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Edit className="size-4" /> Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
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
                      colSpan={6}
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
