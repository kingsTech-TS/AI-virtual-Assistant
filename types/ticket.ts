export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface TicketComment {
  user_id?: string | null;
  author_name?: string | null;
  author_role?: string | null;
  text: string;
  created_at?: string;
}

export interface Ticket {
  id: string;
  _id?: string;
  ticket_number: string;
  user_id: string;
  user_name?: string | null;
  department_id?: string | null;
  department_name?: string | null;
  subject: string;
  description: string;
  category?: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  assigned_to?: string | null;
  assigned_to_name?: string | null;
  comments: TicketComment[];
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
}

export interface TicketCreate {
  subject: string;
  description: string;
  category?: string | null;
  priority?: TicketPriority;
  department_id?: string | null;
}

export interface TicketUpdate {
  subject?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assigned_to?: string;
  comment?: string;
  category?: string;
}
