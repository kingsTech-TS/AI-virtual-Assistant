"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useKnowledgeDetail } from "@/hooks/use-knowledge";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { formatDate, getStatusBadgeClass } from "@/lib/utils";
import { ArrowLeft, BookOpen, Layers, FileText, CheckCircle2, Sparkles, Building2, Calendar } from "lucide-react";

export default function KnowledgeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const docId = resolvedParams.id;
  const router = useRouter();
  const { data: doc, isLoading, isError } = useKnowledgeDetail(docId);
  const [activeTab, setActiveTab] = useState<"chunks" | "fulltext" | "metadata">("chunks");

  if (isLoading) {
    return <LoadingState message="Loading document and vector chunk details..." size="lg" />;
  }

  if (isError || !doc) {
    return (
      <ErrorState
        title="Document Not Found"
        message="Unable to find this knowledge document."
        onRetry={() => router.push("/admin/knowledge")}
      />
    );
  }

  // If backend returns chunks or simulated chunks based on paragraphs
  const chunks = doc.chunks && doc.chunks.length > 0
    ? doc.chunks
    : doc.content
        .split("\n\n")
        .filter(Boolean)
        .map((paragraph, idx) => ({
          chunk_index: idx + 1,
          content: paragraph,
          page: Math.floor(idx / 3) + 1,
        }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Link */}
      <Link
        href="/admin/knowledge"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Knowledge Documents</span>
      </Link>

      {/* Overview Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {doc.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getStatusBadgeClass(
                    doc.status
                  )}`}
                >
                  {doc.status}
                </span>
                <span className="text-xs text-slate-400 capitalize">
                  Category: {doc.category?.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right text-xs text-slate-400">
              <p>Uploaded {formatDate(doc.created_at)}</p>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                {chunks.length} Indexed Vector Chunks
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("chunks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "chunks"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Semantic Chunks ({chunks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("fulltext")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "fulltext"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Extracted Full Text</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "chunks" && (
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-3 text-xs text-indigo-900 dark:text-indigo-200">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Each chunk represents a chunk segment embedded and queried in MongoDB Atlas Vector Search during natural language retrieval.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {chunks.map((chunk: any, i: number) => (
              <div
                key={i}
                className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80 text-xs font-semibold">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Chunk #{chunk.chunk_index || i + 1}</span>
                  </div>
                  {chunk.page && (
                    <span className="text-slate-400 font-mono text-[11px]">
                      Page {chunk.page}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                  {chunk.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "fulltext" && (
        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Raw Document Content
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            {doc.content}
          </div>
        </div>
      )}
    </div>
  );
}
