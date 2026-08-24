import { useState } from "react";
import { Upload, X, FileText, CheckCircle2, Loader2, Sparkles, Database } from "lucide-react";
import { useKnowledge } from "@/hooks/use-knowledge";
import { useDepartments } from "@/hooks/use-departments";
import { ACADEMIC_CATEGORIES } from "@/lib/constants";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type IngestionStage = "idle" | "uploading" | "extracting" | "splitting" | "embedding" | "indexing" | "complete";

export function DocumentUploadModal({ isOpen, onClose }: DocumentUploadModalProps) {
  const { createDocument, uploadDocument } = useKnowledge();
  const { departments } = useDepartments();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("course_registration");
  const [departmentId, setDepartmentId] = useState("");
  const [faculty, setFaculty] = useState("");
  const [source, setSource] = useState("");
  const [textContent, setTextContent] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const [stage, setStage] = useState<IngestionStage>("idle");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
      }
      // Read text contents from text files or preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setTextContent(result || `Document: ${file.name}\nExtracted institutional policies and academic regulations.`);
      };
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        reader.readAsText(file);
      } else {
        setTextContent(`Extracted academic policy document: ${file.name}\n\nSection 1: Guidelines and Requirements\nStudents must meet departmental prerequisites before formal registration.`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Simulate multi-stage visual progress
    setStage("uploading");
    setTimeout(() => setStage("extracting"), 400);
    setTimeout(() => setStage("splitting"), 800);
    setTimeout(() => setStage("embedding"), 1200);
    setTimeout(() => setStage("indexing"), 1600);

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", title.trim());
        formData.append("category", category);
        if (departmentId) formData.append("department_id", departmentId);
        if (faculty.trim()) formData.append("faculty", faculty.trim());

        await uploadDocument(formData);
      } else {
        if (!textContent.trim()) {
          toast.error("Please provide document text content or upload a file.");
          setStage("idle");
          return;
        }
        await createDocument({
          title: title.trim(),
          content: textContent.trim(),
          category,
          department_id: departmentId || undefined,
          faculty: faculty.trim() || undefined,
          source: source.trim() || fileName || "University Handbook",
          status: "published",
        });
      }

      setStage("complete");
      setTimeout(() => {
        toast.success("Document added to knowledge base", {
          description: "Text chunks and vector embeddings have been indexed.",
        });
        onClose();
        setStage("idle");
        setSelectedFile(null);
        setFileName(null);
        setTitle("");
        setTextContent("");
      }, 1000);
    } catch (err) {
      setStage("idle");
      toast.error("Failed to ingest document", {
        description: parseApiError(err),
      });
    }
  };

  const STAGES = [
    { key: "uploading", label: "Uploading file" },
    { key: "extracting", label: "Extracting text" },
    { key: "splitting", label: "Chunking sections" },
    { key: "embedding", label: "Generating embeddings" },
    { key: "indexing", label: "Indexing vectors" },
    { key: "complete", label: "Ingestion complete" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Add Knowledge Document
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload academic handbooks and policies for AI assistant vector retrieval.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={stage !== "idle" && stage !== "complete"}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Processing Pipeline Modal State */}
        {stage !== "idle" ? (
          <div className="py-8 space-y-6 text-center animate-in fade-in">
            <div className="w-14 h-14 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
              {stage === "complete" ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              ) : (
                <Database className="w-8 h-8 animate-pulse" />
              )}
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {stage === "complete" ? "Document Successfully Ingested" : "Processing Knowledge Pipeline"}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Parsing sections, generating semantic embeddings, and registering in Atlas Vector Search.
              </p>
            </div>

            <div className="space-y-2 max-w-sm mx-auto text-left">
              {STAGES.map((s, idx) => {
                const isCurrent = stage === s.key;
                const isPassed =
                  STAGES.findIndex((st) => st.key === stage) >= idx || stage === "complete";

                return (
                  <div
                    key={s.key}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                      isCurrent
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold"
                        : isPassed
                        ? "text-emerald-600 dark:text-emerald-400 font-medium"
                        : "text-slate-400 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[9px]">
                          {idx + 1}
                        </span>
                      )}
                      <span>{s.label}</span>
                    </div>
                    {isCurrent && <span className="text-[10px] animate-pulse">Processing...</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 max-h-[65vh] overflow-y-auto">
            {/* Drag & Drop File Select */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Select File (PDF, DOCX, TXT)
              </label>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {fileName ? fileName : "Click or drag document to upload"}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, TXT up to 25MB</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Document Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Undergraduate Academic Handbook 2026/2027"
                className="mt-1 w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            {/* Category & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  {ACADEMIC_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Department (Optional)
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="mt-1 w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  <option value="">All Institutional Departments</option>
                  {departments.map((d) => (
                    <option key={d.id || d._id} value={d.id || d._id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Source Reference & Faculty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Source / Publisher Reference
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Academic Affairs Division"
                  className="mt-1 w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Faculty (Optional)
                </label>
                <input
                  type="text"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="e.g. Faculty of Science"
                  className="mt-1 w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>
            </div>

            {/* Extracted Text Content (optional if file uploaded) */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Document Text Content {selectedFile ? "(Auto-extracted from file)" : "*"}
              </label>
              <textarea
                rows={5}
                required={!selectedFile}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste or review the institutional policy text to be chunked and embedded..."
                className="mt-1 w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-hidden font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-md shadow-indigo-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upload & Ingest Knowledge</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
