import { UserRole } from "./auth";

export interface UserUpdateRequest {
  name?: string;
  phone?: string;
  faculty?: string;
  department_id?: string;
  current_password?: string;
  new_password?: string;
}

export interface AdminUserUpdateRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  is_active?: boolean;
  department_id?: string;
  faculty?: string;
  phone?: string;
}

export interface AdminUserCreateRequest {
  name: string;
  email: string;
  password: string;
  role: "student" | "staff" | "admin";
  department_id?: string;
  faculty?: string;
  phone?: string;
  matric_number?: string;
}

export interface StaffCreateRequest {
  name: string;
  email: string;
  password: string;
  staff_id?: string;
  position?: string;
  department_id?: string;
  faculty?: string;
  phone?: string;
  permissions?: string[];
}

export interface StaffUpdateRequest {
  name?: string;
  email?: string;
  staff_id?: string;
  position?: string;
  department_id?: string;
  faculty?: string;
  phone?: string;
  permissions?: string[];
  is_active?: boolean;
}

export interface StaffResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  staff_id?: string;
  position?: string;
  department_id?: string;
  department_name?: string;
  faculty?: string;
  phone?: string;
  permissions?: string[];
  created_at: string;
  updated_at: string;
}

export interface RoleChangeRequest {
  role: UserRole;
}
