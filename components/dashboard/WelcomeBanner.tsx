import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Bot, ArrowRight, Sparkles, GraduationCap } from "lucide-react";

export function WelcomeBanner() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-blue-950/20">
      {/* Background glow circle */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 mb-4 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Institutional AI Academic Assistant</span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
          Welcome back, {user?.name || "Student"}! 👋
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-lg">
          Have an inquiry regarding course registration deadlines, fee receipts, or GPA guidelines? Ask the assistant or track your departmental support requests.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/30 hover:gap-3"
          >
            <Bot className="w-4 h-4" />
            <span>Launch AI Assistant</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          {user?.matric_number && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/10 text-xs font-medium text-white/90">
              <GraduationCap className="w-4 h-4 text-blue-300" />
              <span>Matric: {user.matric_number}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
