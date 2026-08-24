"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "@/services/department.service";
import { DepartmentCreate, DepartmentUpdate } from "@/types/department";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useDepartments() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentService.listDepartments({ limit: 100 }),
  });

  const createMutation = useMutation({
    mutationFn: (data: DepartmentCreate) => departmentService.createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department added");
    },
    onError: (err) => {
      toast.error("Failed to create department", {
        description: parseApiError(err),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DepartmentUpdate }) =>
      departmentService.updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department updated");
    },
    onError: (err) => {
      toast.error("Failed to update department", {
        description: parseApiError(err),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => departmentService.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department deleted");
    },
    onError: (err) => {
      toast.error("Failed to delete department", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    departments: query.data?.items || [],
    createDepartment: createMutation.mutateAsync,
    updateDepartment: updateMutation.mutateAsync,
    deleteDepartment: deleteMutation.mutateAsync,
  };
}
