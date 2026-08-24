"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { adminService, AuditLogFilters } from "@/services/admin.service";

export function useAnalytics(days: number = 30) {
  const overviewQuery = useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => analyticsService.getOverview(),
  });

  const intentsQuery = useQuery({
    queryKey: ["analytics", "intents", days],
    queryFn: () => analyticsService.getIntents(days),
  });

  const ticketsQuery = useQuery({
    queryKey: ["analytics", "tickets", days],
    queryFn: () => analyticsService.getTickets(days),
  });

  const feedbackQuery = useQuery({
    queryKey: ["analytics", "feedback", days],
    queryFn: () => analyticsService.getFeedback(days),
  });

  const knowledgeQuery = useQuery({
    queryKey: ["analytics", "knowledge"],
    queryFn: () => adminService.getKnowledgeAnalytics(),
  });

  return {
    overview: overviewQuery.data,
    intents: intentsQuery.data || [],
    tickets: ticketsQuery.data,
    feedback: feedbackQuery.data,
    knowledge: knowledgeQuery.data,
    isLoading:
      overviewQuery.isLoading ||
      intentsQuery.isLoading ||
      ticketsQuery.isLoading ||
      feedbackQuery.isLoading,
  };
}

export function useAuditLogs(filters?: AuditLogFilters) {
  return useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: () => adminService.listAuditLogs(filters),
  });
}
