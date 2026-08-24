export type KnowledgeStatus = "draft" | "published" | "archived";

export interface KnowledgeChunk {
  chunk_index: number;
  content: string;
  page?: number | null;
  metadata?: Record<string, any>;
}

export interface KnowledgeDocument {
  id: string;
  _id?: string;
  title: string;
  content: string;
  category: string;
  department_id?: string | null;
  department_name?: string | null;
  faculty?: string | null;
  source?: string | null;
  status: KnowledgeStatus;
  chunks?: KnowledgeChunk[];
  pages?: number;
  chunks_count?: number;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeCreate {
  title: string;
  content: string;
  category: string;
  department_id?: string | null;
  faculty?: string | null;
  source?: string | null;
  status?: KnowledgeStatus;
}

export interface KnowledgeUpdate {
  title?: string;
  content?: string;
  category?: string;
  department_id?: string | null;
  faculty?: string | null;
  source?: string | null;
  status?: KnowledgeStatus;
}
