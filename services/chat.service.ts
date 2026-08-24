import { apiClient } from "@/lib/api";
import { ChatRequest, ChatResponseData } from "@/types/chat";
import { SuccessResponse } from "@/types/api";

export const chatService = {
  async sendMessage(data: ChatRequest): Promise<ChatResponseData> {
    const res = await apiClient.post<SuccessResponse<ChatResponseData>>("/chat", data);
    return res.data.data;
  },
};
