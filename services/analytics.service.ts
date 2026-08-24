import { apiClient } from "@/lib/api";
import {
  AnalyticsOverview,
  FeedbackMetrics,
  IntentMetric,
  TicketMetrics,
} from "@/types/analytics";
import { SuccessResponse } from "@/types/api";

export const analyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    const res = await apiClient.get<SuccessResponse<AnalyticsOverview>>("/analytics/overview");
    return res.data.data;
  },

  async getIntents(days: number = 30): Promise<IntentMetric[]> {
    const res = await apiClient.get<SuccessResponse<IntentMetric[]>>("/analytics/intents", {
      params: { days },
    });
    return res.data.data;
  },

  async getTickets(days: number = 30): Promise<TicketMetrics> {
    const res = await apiClient.get<SuccessResponse<TicketMetrics>>("/analytics/tickets", {
      params: { days },
    });
    return res.data.data;
  },

  async getFeedback(days: number = 30): Promise<FeedbackMetrics> {
    const res = await apiClient.get<SuccessResponse<FeedbackMetrics>>("/analytics/feedback", {
      params: { days },
    });
    return res.data.data;
  },
};
