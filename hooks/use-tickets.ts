"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService, TicketListFilters } from "@/services/ticket.service";
import { TicketCreate, TicketUpdate } from "@/types/ticket";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useTickets(filters?: TicketListFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tickets", filters],
    queryFn: () => ticketService.listTickets(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: TicketCreate) => ticketService.createTicket(data),
    onSuccess: (newTicket) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Support ticket created", {
        description: `Ticket #${newTicket.ticket_number} has been logged.`,
      });
    },
    onError: (err) => {
      toast.error("Failed to create support ticket", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    createTicket: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}

export function useTicketDetail(id: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => ticketService.getTicket(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: TicketUpdate) => ticketService.updateTicket(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket updated successfully");
    },
    onError: (err) => {
      toast.error("Failed to update ticket", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    updateTicket: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
