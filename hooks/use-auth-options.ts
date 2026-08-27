"use client";

import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { EKSU_FACULTIES, EKSU_DEPARTMENTS } from "@/data/eksu-university";
import type { DepartmentOption } from "@/types/auth";

export function useAuthOptions() {
  const departmentsQuery = useQuery({
    queryKey: ["auth-options-departments"],
    queryFn: () => authService.getDepartmentOptions(),
    retry: 1,
  });

  const facultiesQuery = useQuery({
    queryKey: ["auth-options-faculties"],
    queryFn: () => authService.getFacultyOptions(),
    retry: 1,
  });

  const hasBackendDepartments = (departmentsQuery.data?.length || 0) > 0;
  const hasBackendFaculties = (facultiesQuery.data?.length || 0) > 0;

  const departments: DepartmentOption[] = hasBackendDepartments
    ? (departmentsQuery.data || [])
    : EKSU_DEPARTMENTS;

  const faculties: string[] = hasBackendFaculties
    ? (facultiesQuery.data || [])
    : EKSU_FACULTIES;

  return {
    departments,
    departmentsIsLoading: departmentsQuery.isLoading && !hasBackendDepartments,
    departmentsIsError: departmentsQuery.isError && !hasBackendDepartments,
    faculties,
    facultiesIsLoading: facultiesQuery.isLoading && !hasBackendFaculties,
    facultiesIsError: facultiesQuery.isError && !hasBackendFaculties,
    isUsingEKSUFallback: !hasBackendDepartments || !hasBackendFaculties,
  };
}

