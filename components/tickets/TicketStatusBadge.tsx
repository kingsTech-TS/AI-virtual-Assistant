import { getStatusBadgeClass } from "@/lib/utils";

export function TicketStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(
        status
      )}`}
    >
      {status?.replace("_", " ") || "UNKNOWN"}
    </span>
  );
}
