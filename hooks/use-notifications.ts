"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { PaginationParams } from "@/types/api";

export function useNotifications(unreadOnly?: boolean, params?: PaginationParams) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications", unreadOnly, params],
    queryFn: () => notificationService.listNotifications(unreadOnly, params),
    refetchInterval: 30000, // Background refresh every 30s
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const unreadCount = query.data?.items.filter((n) => !n.is_read).length || 0;

  return {
    ...query,
    notifications: query.data?.items || [],
    unreadCount,
    markAsRead: markReadMutation.mutateAsync,
  };
}
