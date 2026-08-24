"use client";

import { useState } from "react";
import Link from "next/link";
import { useKnowledge } from "@/hooks/use-knowledge";
import { DocumentUploadModal } from "@/components/knowledge/DocumentUploadModal";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { BookOpen, Plus, Search, Trash2, Eye, FileText, CheckCircle2 } from "lucide-react";
import { formatDate, getStatusBadgeClass } from "@/lib/utils";
import { ACADEMIC_CATEGORIES } from "@/lib/constants";

export default function AdminKnowledgePage() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState<string | null>(null);

  const { data, isLoading, deleteDocument } = useKnowledge({
    page,
    limit: 10,
    category: categoryFilter,
  });

  const docs = data?.items || [];
  const pagination = data?.pagination;

  const filtered = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteDocId) {
      await deleteDocument(deleteDocId);
      setDeleteDocId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Knowledge Base
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage official university policy documents, handbooks, and vector indexes used by the AI chatbot.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Document</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-hidden shadow-xs"
          />
        </div>

        {/* Category select */}
        <select
          value={categoryFilter || ""}
          onChange={(e) => {
            setCategoryFilter(e.target.value || undefined);
            setPage(1);
          }}
          className="text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {ACADEMIC_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Document Table */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading knowledge documents..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title={searchTerm || categoryFilter ? "No matching documents" : "Knowledge base is empty"}
            description={
              searchTerm || categoryFilter
                ? "Try adjusting your search query or category filter."
                : "Upload university academic handbooks and examination guides to enable RAG answers."
            }
            action={
              <button
                onClick={() => setUploadModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload First Document</span>
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Document Title</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Department / Source</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filtered.map((doc) => {
                  const id = doc.id || doc._id || "";
                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="truncate max-w-xs">{doc.title}</span>
                      </td>

                      <td className="px-4 py-4 capitalize">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px]">
                          {doc.category?.replace("_", " ") || "General"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                        {doc.department_name || doc.source || "All Departments"}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border ${getStatusBadgeClass(
                            doc.status
                          )}`}
                        >
                          {doc.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-400">
                        {formatDate(doc.updated_at || doc.created_at)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/knowledge/${id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                            title="Inspect Chunks"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteDocId(id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <PaginationControls
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Ingestion Dialog */}
      <DocumentUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteDocId}
        title="Delete Knowledge Document?"
        description="Deleting this document will remove its text chunks and vector embeddings from the active AI retrieval pipeline."
        confirmLabel="Delete Document"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDocId(null)}
      />
    </div>
  );
}
