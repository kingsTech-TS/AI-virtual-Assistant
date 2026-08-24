import { apiClient } from "@/lib/api";
import { FAQ, FAQCreate, FAQStatus, FAQUpdate } from "@/types/faq";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export interface FAQListFilters extends PaginationParams {
  category?: string;
  status?: FAQStatus;
}

export const faqService = {
  async listFAQs(filters?: FAQListFilters): Promise<PaginatedResponse<FAQ>> {
    const res = await apiClient.get<PaginatedResponse<FAQ>>("/faqs", {
      params: filters,
    });
    return res.data;
  },

  async getFAQ(id: string): Promise<FAQ> {
    const res = await apiClient.get<SuccessResponse<FAQ>>(`/faqs/${id}`);
    return res.data.data;
  },

  async createFAQ(data: FAQCreate): Promise<FAQ> {
    const res = await apiClient.post<SuccessResponse<FAQ>>("/faqs", data);
    return res.data.data;
  },

  async updateFAQ(id: string, data: FAQUpdate): Promise<FAQ> {
    const res = await apiClient.patch<SuccessResponse<FAQ>>(`/faqs/${id}`, data);
    return res.data.data;
  },

  async deleteFAQ(id: string): Promise<void> {
    await apiClient.delete(`/faqs/${id}`);
  },
};
