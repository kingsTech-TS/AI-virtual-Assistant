import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, BookOpen, Headset } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Academic Assist Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain dark:hidden"
                />
                <Image
                  src="/logo2.png"
                  alt="Academic Assist Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Academic Assist
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Institutional AI assistance powered by university knowledge
              documents with automated human staff escalation.
            </p>
          </div>

          {/* Quick Support */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Academic Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  href="/dashboard/chat"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  AI Course Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/chat"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Exam Timetable Assistance
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/chat"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Grading & GPA Calculations
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/chat"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Student Portal Troubleshooting
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Institutional Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  href="/dashboard/tickets"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Support Ticket Helpdesk
                </Link>
              </li>
              <li>
                <Link
                  href="/#faqs"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Verified FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  RAG Document Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Faculty & Staff Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Trust & Integrity
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Answers verified strictly against uploaded university
                  handbooks.
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <BookOpen className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Zero hallucination policy with source citations.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Headset className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>
                  Direct escalation to course advisors & departmental staff.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} University Academic Virtual Assistant.
            All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0">
            Powered by Next.js & FastAPI REST Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
