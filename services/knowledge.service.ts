import { apiClient } from "@/lib/api";
import { KnowledgeCreate, KnowledgeDocument, KnowledgeStatus, KnowledgeUpdate } from "@/types/knowledge";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export interface KnowledgeListFilters extends PaginationParams {
  category?: string;
  status?: KnowledgeStatus;
  department_id?: string;
}

export const knowledgeService = {
  async listKnowledge(filters?: KnowledgeListFilters): Promise<PaginatedResponse<KnowledgeDocument>> {
    const res = await apiClient.get<PaginatedResponse<KnowledgeDocument>>("/knowledge", {
      params: filters,
    });
    return res.data;
  },

  async getKnowledge(id: string): Promise<KnowledgeDocument> {
    const res = await apiClient.get<SuccessResponse<KnowledgeDocument>>(`/knowledge/${id}`);
    return res.data.data;
  },

  async createKnowledge(data: KnowledgeCreate): Promise<KnowledgeDocument> {
    const res = await apiClient.post<SuccessResponse<KnowledgeDocument>>("/knowledge", data);
    return res.data.data;
  },

  async updateKnowledge(id: string, data: KnowledgeUpdate): Promise<KnowledgeDocument> {
    const res = await apiClient.patch<SuccessResponse<KnowledgeDocument>>(`/knowledge/${id}`, data);
    return res.data.data;
  },

  async deleteKnowledge(id: string): Promise<void> {
    await apiClient.delete(`/knowledge/${id}`);
  },

  async uploadDocument(formData: FormData): Promise<KnowledgeDocument> {
    const res = await apiClient.post<SuccessResponse<KnowledgeDocument>>("/admin/knowledge/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
};
