"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ACADEMIC_CATEGORIES } from "@/lib/constants";
import {
  Bot,
  Sparkles,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileText,
  HelpCircle,
  Clock,
  Ticket,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const steps = [
    {
      num: "01",
      title: "Ask Naturally",
      description:
        "Ask your academic or administrative question in plain English.",
      icon: MessageSquare,
    },
    {
      num: "02",
      title: "Intent Classification",
      description:
        "The AI recognizes your intent and extracts key course & policy entities.",
      icon: Sparkles,
    },
    {
      num: "03",
      title: "RAG Document Retrieval",
      description:
        "Atlas Vector Search queries verified university handbooks and regulations.",
      icon: BookOpen,
    },
    {
      num: "04",
      title: "Verified Response & Citations",
      description:
        "Receive a structured, grounded answer citing page and document sources.",
      icon: FileText,
    },
    {
      num: "05",
      title: "Advisor Escalation",
      description:
        "If needed, seamlessly escalate with 1-click to human staff course advisors.",
      icon: Ticket,
    },
  ];

  const landingFAQs = [
    {
      q: "What makes this assistant different from standard chatbots?",
      a: "This system uses Retrieval-Augmented Generation (RAG) tied strictly to official university handbooks, exam timetables, and academic policies. It does not hallucinate dates or fees, and it directly cites the verified source document and page number.",
    },
    {
      q: "What happens if the AI cannot resolve my specific issue?",
      a: "The assistant detects low confidence or complex personal requests and displays an immediate 'Human Staff Escalation' card, allowing you to create a prioritized support ticket for your department advisor in one click.",
    },
    {
      q: "Can I access past conversations and cited sources?",
      a: "Yes! Every student has full access to conversation history, recent queries, and cited source excerpts via their student dashboard.",
    },
    {
      q: "Is my personal data and matriculation number secure?",
      a: "All student information is protected behind JWT authentication, scoped permissions, and role-based access control.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Your Intelligent <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                  Academic Support Assistant
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Get fast, accurate, and verified answers to your academic
                regulations, course registration, exam timetables, and student
                support inquiries.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/dashboard/chat"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:gap-3"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask the Assistant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>Learn How It Works</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Institutional Handbooks Grounded</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span>Zero Hallucination Retrieval</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-purple-500" />
                  <span>Automated Staff Escalation</span>
                </div>
              </div>
            </div>

            {/* Visual Chatbot Interface Preview Mockup */}
            <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Fake Window Header */}
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Academic Support AI • Course Registration Assistant
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ● Verified
                </span>
              </div>

              {/* Chat Canvas Preview */}
              <div className="p-6 space-y-4 text-xs sm:text-sm">
                {/* Student Query */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-md shadow-xs">
                    <p className="font-medium">
                      How do I register for CSC 301 and what are the
                      prerequisites?
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    S
                  </div>
                </div>

                {/* Assistant Response */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 p-4 rounded-2xl rounded-tl-sm max-w-xl text-slate-800 dark:text-slate-200 space-y-2 shadow-xs">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Course registration for CSC 301 requires verified fee
                      clearance and completion of CSC 201:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                      <li>
                        Log in to the University Student Portal with your matric
                        number.
                      </li>
                      <li>
                        Navigate to{" "}
                        <strong>Course Registration &gt; First Semester</strong>
                        .
                      </li>
                      <li>
                        Ensure <strong>CSC 201 (Data Structures)</strong> has a
                        passing grade.
                      </li>
                      <li>
                        Click <strong>Submit Registration</strong> and download
                        your signed course slip.
                      </li>
                    </ol>

                    {/* Sourced Reference Drawer Preview */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Sources:
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-medium">
                        📄 Academic Handbook 2026 (p. 24)
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-medium">
                        📄 Course Registration Guide (p. 7)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: HOW IT WORKS */}
        <section
          id="how-it-works"
          className="py-20 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Pipeline Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                How Academic AI Support Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                End-to-end flow from natural inquiry to grounded verification
                and staff triage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all space-y-3"
                  >
                    <span className="font-mono font-extrabold text-xs text-blue-600 dark:text-blue-400">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: ACADEMIC CAPABILITIES */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Support Domains
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                What Can You Ask the Assistant?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Instant advice covering every critical aspect of university
                student life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACADEMIC_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-500/50 hover:shadow-lg transition-all"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <Link
                    href={`/dashboard/chat?prompt=${encodeURIComponent(cat.prompt)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
                  >
                    <span>Try Query</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: FAQS */}
        <section
          id="faqs"
          className="py-20 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Common Inquiries
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {landingFAQs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CTA BANNER */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 text-center shadow-2xl space-y-6">
              <div className="w-14 h-14 rounded-3xl bg-white backdrop-blur-md text-blue-400 flex items-center justify-center mx-auto border border-white/10">
                <Image
                  src="/logo.png"
                  alt="Academic Assist Logo"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Experience Intelligent Academic Advisory
              </h2>

              <p className="text-xs sm:text-sm text-blue-100/80 max-w-lg mx-auto leading-relaxed">
                Join students and course advisors across all university
                faculties on a unified, verified academic support platform.
              </p>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30 hover:gap-3"
                >
                  <span>Create Free Student Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
