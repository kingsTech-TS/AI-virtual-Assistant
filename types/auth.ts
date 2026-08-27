export type UserRole = "student" | "staff" | "admin" | "super_admin";

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  matric_number?: string | null;
  staff_id?: string | null;
  position?: string | null;
  permissions?: string[] | null;
  department_id?: string | null;
  department_name?: string | null;
  faculty?: string | null;
  phone?: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  matric_number: string;
  department_id?: string | null;
  faculty?: string | null;
  phone?: string | null;
}

export interface StaffRegisterRequest {
  name: string;
  email: string;
  password: string;
  staff_id?: string | null;
  position?: string | null;
  department_id?: string | null;
  faculty?: string | null;
  phone?: string | null;
}

export interface DepartmentOption {
  id: string;
  _id?: string;
  name: string;
  code: string;
  faculty: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}
