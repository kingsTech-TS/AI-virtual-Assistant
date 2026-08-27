import { apiClient } from "@/lib/api";
import {
  DepartmentOption,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  StaffRegisterRequest,
  TokenResponse,
  User,
} from "@/types/auth";
import { SuccessResponse } from "@/types/api";

export const authService = {
  async register(data: RegisterRequest): Promise<User> {
    const res = await apiClient.post<SuccessResponse<User>>("/auth/register", data);
    return res.data.data;
  },

  async registerStaff(data: StaffRegisterRequest): Promise<User> {
    const res = await apiClient.post<SuccessResponse<User>>("/auth/register/staff", data);
    return res.data.data;
  },

  async getDepartmentOptions(): Promise<DepartmentOption[]> {
    const res = await apiClient.get<SuccessResponse<DepartmentOption[]>>("/auth/options/departments");
    return res.data.data;
  },

  async getFacultyOptions(): Promise<string[]> {
    const res = await apiClient.get<SuccessResponse<string[]>>("/auth/options/faculties");
    return res.data.data;
  },

  async login(data: LoginRequest): Promise<TokenResponse> {
    const res = await apiClient.post<{ success: boolean; data: TokenResponse }>("/auth/login", data);
    return res.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },

  async getMe(): Promise<User> {
    const res = await apiClient.get<SuccessResponse<User>>("/auth/me");
    return res.data.data;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const res = await apiClient.post<{ success: boolean; data: { message: string } }>("/auth/forgot-password", data);
    return res.data.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const res = await apiClient.post<{ success: boolean; data: { message: string } }>("/auth/reset-password", data);
    return res.data.data;
  },
};
