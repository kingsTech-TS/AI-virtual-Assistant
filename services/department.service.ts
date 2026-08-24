import { apiClient } from "@/lib/api";
import { Department, DepartmentCreate, DepartmentUpdate } from "@/types/department";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export const departmentService = {
  async listDepartments(params?: PaginationParams & { is_active?: boolean }): Promise<PaginatedResponse<Department>> {
    const res = await apiClient.get<PaginatedResponse<Department>>("/departments", {
      params,
    });
    return res.data;
  },

  async getDepartment(id: string): Promise<Department> {
    const res = await apiClient.get<SuccessResponse<Department>>(`/departments/${id}`);
    return res.data.data;
  },

  async createDepartment(data: DepartmentCreate): Promise<Department> {
    const res = await apiClient.post<SuccessResponse<Department>>("/departments", data);
    return res.data.data;
  },

  async updateDepartment(id: string, data: DepartmentUpdate): Promise<Department> {
    const res = await apiClient.patch<SuccessResponse<Department>>(`/departments/${id}`, data);
    return res.data.data;
  },

  async deleteDepartment(id: string): Promise<void> {
    await apiClient.delete(`/departments/${id}`);
  },
};
