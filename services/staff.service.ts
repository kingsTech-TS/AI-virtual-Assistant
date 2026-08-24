import { apiClient } from "@/lib/api";
import { Ticket, TicketPriority, TicketStatus, TicketUpdate } from "@/types/ticket";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export interface StaffTicketFilters extends PaginationParams {
  status?: TicketStatus;
  priority?: TicketPriority;
  assigned_only?: boolean;
}

export interface StaffRespondRequest {
  message: string;
}

export interface StaffEscalateRequest {
  reason?: string;
  priority?: TicketPriority;
}

export interface StaffResolveRequest {
  resolution_note?: string;
}

export interface StaffDashboardData {
  open_tickets: number;
  in_progress_tickets: number;
  assigned_to_me: number;
  resolved_today: number;
  recent_tickets: Ticket[];
  department_name?: string;
}

export const staffService = {
  async getDashboard(): Promise<StaffDashboardData> {
    const res = await apiClient.get<SuccessResponse<StaffDashboardData>>("/staff/dashboard");
    return res.data.data;
  },

  async listTickets(filters?: StaffTicketFilters): Promise<PaginatedResponse<Ticket>> {
    const res = await apiClient.get<PaginatedResponse<Ticket>>("/staff/tickets", {
      params: filters,
    });
    return res.data;
  },

  async getTicket(ticketId: string): Promise<Ticket> {
    const res = await apiClient.get<SuccessResponse<Ticket>>(`/staff/tickets/${ticketId}`);
    return res.data.data;
  },

  async updateTicket(ticketId: string, data: TicketUpdate): Promise<Ticket> {
    const res = await apiClient.patch<SuccessResponse<Ticket>>(`/staff/tickets/${ticketId}`, data);
    return res.data.data;
  },

  async respond(ticketId: string, message: string): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/staff/tickets/${ticketId}/respond`, {
      message,
    });
    return res.data.data;
  },

  async assignToSelf(ticketId: string): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/staff/tickets/${ticketId}/assign`);
    return res.data.data;
  },

  async escalate(ticketId: string, reason?: string, priority: TicketPriority = "urgent"): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/staff/tickets/${ticketId}/escalate`, {
      reason,
      priority,
    });
    return res.data.data;
  },

  async resolve(ticketId: string, resolutionNote?: string): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>(`/staff/tickets/${ticketId}/resolve`, {
      resolution_note: resolutionNote,
    });
    return res.data.data;
  },
};
