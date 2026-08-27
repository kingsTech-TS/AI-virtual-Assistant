import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
      {/* Top Navbar */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Academic Assist Logo" width={44} height={44} className="w-full h-full object-contain dark:hidden" />
            <Image src="/logo2.png" alt="Academic Assist Logo" width={44} height={44} className="w-full h-full object-contain hidden dark:block" />
          </div>
          <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
            Academic Virtual Assistant
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Card on Desktop */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-2xl h-[560px]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 mb-6 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>University Portal Gateway</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight leading-snug">
                Your 24/7 Intelligent University Academic Support
              </h2>
              <p className="text-xs text-blue-200/80 mt-3 leading-relaxed">
                Log in to consult verified institutional regulations, course pre-requisites, exam guidelines, and track support requests with course advisors.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-xs text-blue-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Hallucination RAG Integration</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-100">
                <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Verified Handbooks & Timetables</span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-7">{children}</div>
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
        © {new Date().getFullYear()} University Academic Assistant. Secure FastAuth SSO & JWT.
      </footer>
    </div>
  );
}
