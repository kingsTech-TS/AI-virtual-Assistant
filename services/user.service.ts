import { apiClient } from "@/lib/api";
import { User } from "@/types/auth";
import { AdminUserUpdateRequest, UserUpdateRequest } from "@/types/user";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export const userService = {
  async getMe(): Promise<User> {
    const res = await apiClient.get<SuccessResponse<User>>("/users/me");
    return res.data.data;
  },

  async updateMe(data: UserUpdateRequest): Promise<User> {
    const res = await apiClient.patch<SuccessResponse<User>>("/users/me", data);
    return res.data.data;
  },

  async listUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    const res = await apiClient.get<PaginatedResponse<User>>("/users", {
      params,
    });
    return res.data;
  },

  async getUser(id: string): Promise<User> {
    const res = await apiClient.get<SuccessResponse<User>>(`/users/${id}`);
    return res.data.data;
  },

  async updateUser(id: string, data: AdminUserUpdateRequest): Promise<User> {
    const res = await apiClient.patch<SuccessResponse<User>>(`/users/${id}`, data);
    return res.data.data;
  },
};
