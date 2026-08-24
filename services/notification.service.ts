import { apiClient } from "@/lib/api";
import { AppNotification } from "@/types/notification";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export const notificationService = {
  async listNotifications(unread?: boolean, params?: PaginationParams): Promise<PaginatedResponse<AppNotification>> {
    const res = await apiClient.get<PaginatedResponse<AppNotification>>("/notifications", {
      params: { ...params, unread },
    });
    return res.data;
  },

  async markRead(id: string): Promise<{ id: string; is_read: boolean }> {
    const res = await apiClient.patch<SuccessResponse<{ id: string; is_read: boolean }>>(
      `/notifications/${id}/read`
    );
    return res.data.data;
  },
};
