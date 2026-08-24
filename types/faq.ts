export type FAQStatus = "draft" | "published" | "archived";

export interface FAQ {
  id: string;
  _id?: string;
  question: string;
  answer: string;
  category: string;
  department_id?: string | null;
  department_name?: string | null;
  status: FAQStatus;
  created_by?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface FAQCreate {
  question: string;
  answer: string;
  category: string;
  department_id?: string | null;
  status?: FAQStatus;
}

export interface FAQUpdate {
  question?: string;
  answer?: string;
  category?: string;
  department_id?: string | null;
  status?: FAQStatus;
}
