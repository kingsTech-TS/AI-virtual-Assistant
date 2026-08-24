import { useState, useEffect } from "react";
import { X, Send, LifeBuoy } from "lucide-react";
import { useTickets } from "@/hooks/use-tickets";
import { useDepartments } from "@/hooks/use-departments";
import { TicketPriority } from "@/types/ticket";
import { TICKET_PRIORITIES, ACADEMIC_CATEGORIES } from "@/lib/constants";

interface TicketCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialDescription?: string;
  initialCategory?: string;
}

export function TicketCreateModal({
  isOpen,
  onClose,
  initialSubject = "",
  initialDescription = "",
  initialCategory = "",
}: TicketCreateModalProps) {
  const { createTicket, isCreating } = useTickets();
  const { departments } = useDepartments();

  const [subject, setSubject] = useState(initialSubject);
  const [description, setDescription] = useState(initialDescription);
  const [category, setCategory] = useState(initialCategory);
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    if (initialSubject) setSubject(initialSubject);
    if (initialDescription) setDescription(initialDescription);
    if (initialCategory) setCategory(initialCategory);
  }, [initialSubject, initialDescription, initialCategory]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    await createTicket({
      subject: subject.trim(),
      description: description.trim(),
      category: category || undefined,
      priority,
      department_id: departmentId || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Create Support Ticket</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Escalate inquiry to departmental course advisors or university administration.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Subject *
            </label>
            <input
              type="text"
              required
              minLength={5}
              maxLength={250}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Course enrollment prerequisite error for CSC 301"
              className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Academic Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-hidden"
              >
                <option value="">Select category...</option>
                {ACADEMIC_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Department (Optional)
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-hidden"
              >
                <option value="">Auto-assign or select...</option>
                {departments.map((dept) => (
                  <option key={dept.id || dept._id} value={dept.id || dept._id}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Priority Level
            </label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {TICKET_PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value as TicketPriority)}
                  className={`text-xs py-2 rounded-xl border font-medium transition-all ${
                    priority === p.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Detailed Description *
            </label>
            <textarea
              rows={4}
              required
              minLength={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail, including course codes, error notices, or steps taken..."
              className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isCreating ? "Submitting..." : "Submit Ticket"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
