import { apiClient } from "@/lib/api";
import { AuditLog } from "@/types/analytics";
import { User } from "@/types/auth";
import { Ticket } from "@/types/ticket";
import {
  AdminUserCreateRequest,
  AdminUserUpdateRequest,
  RoleChangeRequest,
  StaffCreateRequest,
  StaffResponse,
  StaffUpdateRequest,
} from "@/types/user";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export interface AuditLogFilters extends PaginationParams {
  action?: string;
  user_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface AdminStaffFilters extends PaginationParams {
  department_id?: string;
}

export interface KnowledgeAnalyticsData {
  total_documents: number;
  published_documents: number;
  by_category: Record<string, number>;
}

export const adminService = {
  async getDashboard(): Promise<any> {
    const res = await apiClient.get<SuccessResponse<any>>("/admin/dashboard");
    return res.data.data;
  },

  async listAuditLogs(filters?: AuditLogFilters): Promise<PaginatedResponse<AuditLog>> {
    const res = await apiClient.get<PaginatedResponse<AuditLog>>("/admin/audit-logs", {
      params: filters,
    });
    return res.data;
  },

  async createUser(data: AdminUserCreateRequest): Promise<User> {
    const res = await apiClient.post<SuccessResponse<User>>("/admin/users", data);
    return res.data.data;
  },

  async updateUser(userId: string, data: AdminUserUpdateRequest): Promise<User> {
    const res = await apiClient.patch<SuccessResponse<User>>(`/admin/users/${userId}`, data);
    return res.data.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
  },

  async changeUserRole(userId: string, data: RoleChangeRequest): Promise<User> {
    const res = await apiClient.patch<SuccessResponse<User>>(`/admin/users/${userId}/role`, data);
    return res.data.data;
  },

  // Staff Management
  async listStaff(filters?: AdminStaffFilters): Promise<PaginatedResponse<StaffResponse>> {
    const res = await apiClient.get<PaginatedResponse<StaffResponse>>("/admin/staff", {
      params: filters,
    });
    return res.data;
  },

  async createStaff(data: StaffCreateRequest): Promise<StaffResponse> {
    const res = await apiClient.post<SuccessResponse<StaffResponse>>("/admin/staff", data);
    return res.data.data;
  },

  async getStaff(staffId: string): Promise<StaffResponse> {
    const res = await apiClient.get<SuccessResponse<StaffResponse>>(`/admin/staff/${staffId}`);
    return res.data.data;
  },

  async updateStaff(staffId: string, data: StaffUpdateRequest): Promise<StaffResponse> {
    const res = await apiClient.patch<SuccessResponse<StaffResponse>>(`/admin/staff/${staffId}`, data);
    return res.data.data;
  },

  // System-wide Ticket Actions
  async assignTicket(ticketId: string, assignedTo: string): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/admin/tickets/${ticketId}/assign`, {
      assigned_to: assignedTo,
    });
    return res.data.data;
  },

  async reassignTicket(ticketId: string, params: { assigned_to?: string; department_id?: string }): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/admin/tickets/${ticketId}/reassign`, params);
    return res.data.data;
  },

  async closeTicket(ticketId: string, reason?: string): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/admin/tickets/${ticketId}/close`, {
      reason,
    });
    return res.data.data;
  },

  // Knowledge Analytics
  async getKnowledgeAnalytics(): Promise<KnowledgeAnalyticsData> {
    const res = await apiClient.get<SuccessResponse<KnowledgeAnalyticsData>>("/admin/analytics/knowledge");
    return res.data.data;
  },
};
