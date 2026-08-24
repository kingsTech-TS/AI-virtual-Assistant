import { apiClient } from "@/lib/api";
import { Ticket, TicketCreate, TicketPriority, TicketStatus, TicketUpdate } from "@/types/ticket";
import { PaginatedResponse, PaginationParams, SuccessResponse } from "@/types/api";

export interface TicketListFilters extends PaginationParams {
  status?: TicketStatus;
  priority?: TicketPriority;
  department_id?: string;
  assigned_to?: string;
}

export const ticketService = {
  async listTickets(filters?: TicketListFilters): Promise<PaginatedResponse<Ticket>> {
    const res = await apiClient.get<PaginatedResponse<Ticket>>("/tickets", {
      params: filters,
    });
    return res.data;
  },

  async getTicket(id: string): Promise<Ticket> {
    const res = await apiClient.get<SuccessResponse<Ticket>>(`/tickets/${id}`);
    return res.data.data;
  },

  async createTicket(data: TicketCreate): Promise<Ticket> {
    const res = await apiClient.post<SuccessResponse<Ticket>>("/tickets", data);
    return res.data.data;
  },

  async updateTicket(id: string, data: TicketUpdate): Promise<Ticket> {
    const res = await apiClient.patch<SuccessResponse<Ticket>>(`/tickets/${id}`, data);
    return res.data.data;
  },
};
