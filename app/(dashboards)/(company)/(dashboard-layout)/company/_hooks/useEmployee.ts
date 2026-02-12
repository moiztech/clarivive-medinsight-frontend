import { useState, useCallback } from "react";
import { Employee } from "../employees/page";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";

export function useEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getEmployees = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await protectedApi.get("/company/employee");
      // Handle potential wrapped response from backend
      const data = response.data.data || response.data;
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError(true);
      setEmployees([]); // Ensure it stays an array even on error
    } finally {
      setLoading(false);
    }
  }, []);

  const storeEmployee = useCallback(
    async (empData: { name: string; email: string; contact: string }) => {
      setLoading(true);
      setError(false);
      try {
        const res = await protectedApi.post("/company/employee", empData);
        toast.success(res.data?.message || "Employee added successfully");
        await getEmployees(); // Refresh the list
      } catch (error) {
        console.error("Failed to store employee:", error);
        setError(true);
        toast.error("Failed to add employee");
      } finally {
        setLoading(false);
      }
    },
    [getEmployees],
  );

  const updateEmployee = useCallback(
    async (
      id: number,
      empData: { name: string; email: string; contact: string },
    ) => {
      setLoading(true);
      setError(false);
      try {
        const res = await protectedApi.post(`/company/employee/${id}`, {
          ...empData,
          _method: "PUT",
        });
        toast.success(res.data?.message || "Employee updated successfully");
        await getEmployees(); // Refresh the list
      } catch (error) {
        console.error("Failed to update employee:", error);
        setError(true);
        toast.error("Failed to update employee");
      } finally {
        setLoading(false);
      }
    },
    [getEmployees],
  );

  const getEmployee = useCallback(async (id: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await protectedApi.get(`/company/employee/${id}/edit`);
      return res.data.data || res.data;
    } catch (error) {
      console.error("Failed to fetch employee:", error);
      setError(true);
      toast.error("Failed to load employee details");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(false);
      try {
        const res = await protectedApi.delete(`/company/employee/${id}`);
        toast.success(res.data?.message || "Employee deleted successfully");
        await getEmployees();
      } catch (error) {
        console.error("Failed to delete employee:", error);
        setError(true);
        toast.error("Failed to delete employee");
      } finally {
        setLoading(false);
      }
    },
    [getEmployees],
  );

  const getEmployeeCourses = useCallback(async (id: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await protectedApi.get(`/employee/${id}/courses`);
      return res.data.data || res.data;
    } catch (error) {
      console.error("Failed to fetch employee courses:", error);
      setError(true);
      toast.error("Failed to load employee courses");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    employees,
    loading,
    error,
    getEmployees,
    storeEmployee,
    updateEmployee,
    getEmployee,
    deleteEmployee,
    getEmployeeCourses,
  };
}
