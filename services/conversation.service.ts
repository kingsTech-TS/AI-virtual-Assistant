import { apiClient } from "@/lib/api";
import { Conversation } from "@/types/conversation";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export const conversationService = {
  async listConversations(params?: PaginationParams): Promise<PaginatedResponse<Conversation>> {
    const res = await apiClient.get<PaginatedResponse<Conversation>>("/chat/conversations", {
      params,
    });
    return res.data;
  },

  async getConversation(id: string): Promise<Conversation> {
    const res = await apiClient.get<SuccessResponse<Conversation>>(`/chat/conversations/${id}`);
    return res.data.data;
  },

  async deleteConversation(id: string): Promise<void> {
    await apiClient.delete(`/chat/conversations/${id}`);
  },
};
