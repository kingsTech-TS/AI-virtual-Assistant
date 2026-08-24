import { apiClient } from "@/lib/api";
import { FeedbackCreate, FeedbackResponse } from "@/types/feedback";
import { SuccessResponse } from "@/types/api";

export const feedbackService = {
  async submitFeedback(data: FeedbackCreate): Promise<FeedbackResponse> {
    const res = await apiClient.post<SuccessResponse<FeedbackResponse>>("/feedback", data);
    return res.data.data;
  },
};
