"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { staffService, StaffTicketFilters } from "@/services/staff.service";
import { TicketPriority, TicketUpdate } from "@/types/ticket";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useStaffTickets(filters?: StaffTicketFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["staff-tickets", filters],
    queryFn: () => staffService.listTickets(filters),
  });

  return {
    ...query,
    tickets: query.data?.items || [],
    pagination: query.data?.pagination,
  };
}

export function useStaffDashboard() {
  return useQuery({
    queryKey: ["staff-dashboard"],
    queryFn: () => staffService.getDashboard(),
  });
}

export function useStaffTicketActions(ticketId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["staff-ticket", ticketId],
    queryFn: () => staffService.getTicket(ticketId),
    enabled: !!ticketId,
  });

  const respondMutation = useMutation({
    mutationFn: (message: string) => staffService.respond(ticketId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["staff-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Staff response sent to student");
    },
    onError: (err) => {
      toast.error("Failed to send response", {
        description: parseApiError(err),
      });
    },
  });

  const assignSelfMutation = useMutation({
    mutationFn: () => staffService.assignToSelf(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["staff-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket assigned to you");
    },
    onError: (err) => {
      toast.error("Failed to assign ticket", {
        description: parseApiError(err),
      });
    },
  });

  const escalateMutation = useMutation({
    mutationFn: ({ reason, priority }: { reason?: string; priority?: TicketPriority }) =>
      staffService.escalate(ticketId, reason, priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["staff-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket escalated to urgent");
    },
    onError: (err) => {
      toast.error("Failed to escalate ticket", {
        description: parseApiError(err),
      });
    },
  });

  const resolveMutation = useMutation({
    mutationFn: (resolutionNote?: string) => staffService.resolve(ticketId, resolutionNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["staff-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket marked as resolved");
    },
    onError: (err) => {
      toast.error("Failed to resolve ticket", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ticket: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    respond: respondMutation.mutateAsync,
    isResponding: respondMutation.isPending,
    assignToSelf: assignSelfMutation.mutateAsync,
    isAssigningSelf: assignSelfMutation.isPending,
    escalate: escalateMutation.mutateAsync,
    isEscalating: escalateMutation.isPending,
    resolve: resolveMutation.mutateAsync,
    isResolving: resolveMutation.isPending,
  };
}
