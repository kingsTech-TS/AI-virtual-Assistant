export interface Department {
  id: string;
  _id?: string;
  name: string;
  code: string;
  faculty: string;
  description?: string | null;
  support_email?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DepartmentCreate {
  name: string;
  code: string;
  faculty: string;
  description?: string;
  support_email?: string;
  is_active?: boolean;
}

export interface DepartmentUpdate {
  name?: string;
  code?: string;
  faculty?: string;
  description?: string;
  support_email?: string;
  is_active?: boolean;
}
