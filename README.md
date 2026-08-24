# Intelligent Academic Support Chatbot (Frontend)

An intelligent, full-featured academic advisory and virtual assistant platform built for university students, faculty staff advisors, and system administrators. The frontend communicates with a high-performance FastAPI REST backend integrated with MongoDB Atlas Vector Search and LLM-powered Retrieval-Augmented Generation (RAG).

---

## 🌟 Product Vision & Capabilities

The **Academic Virtual Assistant** is designed as a modern **University Student Portal + AI Academic Assistant + Staff Helpdesk Portal**. Unlike generic conversational bots, it serves as a verified institutional knowledge gateway with zero-hallucination policies and seamless human staff escalation.

### Key Capabilities

1. **AI-Powered Natural Language Academic Advisory**
   - Instant answers on course enrollment prerequisites, add/drop windows, exam timetables, GPA calculation rules, and transcript procedures.
   - Grounded strictly on institutional knowledge handbooks and examination regulations.

2. **RAG Source Transparency & Verification Panel**
   - When the AI generates an answer, it automatically cites the official document title, category, and exact page number.
   - Students can open the **Verified Source Drawer** to inspect the source excerpts that grounded the AI's response.

3. **1-Click Human Staff Escalation (Support Helpdesk)**
   - When an inquiry involves complex departmental clearances, grade disputes, or low-confidence outcomes, the system triggers an **Escalation Card**.
   - Students can immediately submit a support ticket prefilled with inquiry context to their specific department course advisor.

4. **Interactive Response Feedback Loop**
   - Students can rate any assistant response (👍 Helpful / 👎 Needs Improvement) and submit qualitative feedback categories to continuously refine the knowledge base.

5. **Dedicated Staff Advisor Portal (`/staff`)**
   - **Departmental Ticket Queue**: View and respond to support tickets scoped specifically to the staff advisor's academic department.
   - **Ticket Triage**: Triage tickets with 1-click actions: *Assign to Me*, *Escalate to Urgent*, *Send Official Directive*, and *Mark Resolved*.
   - **Knowledge Base & FAQ Management**: Upload course syllabi, departmental guidelines, and author verified FAQs.

6. **Comprehensive Executive & Administrative Operations Suite (`/admin`)**
   - **Executive Analytics Overview**: High-level KPIs (Total Students, Inquiries, Open Tickets, AI Satisfaction Rate, Average Confidence).
   - **Knowledge Base Ingestion**: 5-stage document upload & indexing pipeline (`PDF`, `DOCX`, `TXT` -> Extract -> Chunk -> Embed -> Index in Atlas Vector Search).
   - **FAQ & Content Publishing**: Centralized CRUD interface for common institutional questions and answers.
   - **Global Helpdesk Management**: Cross-departmental triage queue, staff assignment, priority override, department reassignment, and ticket closing.
   - **User & Staff Directory**: Student/Staff/Admin account creation, position assignment, and role elevation.
   - **Department Settings**: Academic department directories, faculty linking, and routing emails.
   - **Audit Logs & Diagnostics**: Immutable operational audit trail and backend health status.

---

## 🏗️ Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js App Router Frontend                     │
│         (TypeScript, Tailwind CSS, TanStack Query, Axios, Sonner)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API (Bearer JWT)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend (academic-virtual-A-BD)             │
│                      Base URL: http://localhost:8000/api/v1            │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   │                                    │
│   • Auth & User Management        │   • Ticket Routing & Management    │
│   • Intent Classification         │   • FAQ & Department Services      │
│   • RAG Retrieval & Guardrails    │   • Notifications & Audit Logs     │
│   • MongoDB Atlas Vector Search   │   • System & Intent Analytics      │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Frontend Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router, Server Components + Interactive Client Components) |
| **Language** | TypeScript (Strict mode, 100% schema alignment with FastAPI backend) |
| **Styling** | Tailwind CSS with CSS Variables design tokens (Light & Dark modes) |
| **Icons & UI** | Lucide React & Modern SaaS-style components |
| **Server State & Data Fetching** | `@tanstack/react-query` for query caching, background refetch, and mutations |
| **HTTP Client** | Axios with interceptors for Bearer token injection and automatic 401 refresh |
| **Notifications** | Sonner toast provider |
| **Date Utilities** | `date-fns` for localized formatting and relative timestamps |

---

## 📁 Directory & File Layout

```
academic-virtual-ass/
├── app/
│   ├── (auth)/                       # Public Authentication routes
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── dashboard/                    # Student Portal & AI Assistant routes
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Student Dashboard (Welcome, Quick Actions, Widgets)
│   │   ├── chat/page.tsx             # 3-Column AI Assistant Canvas
│   │   ├── conversations/page.tsx    # Conversation History & Search
│   │   ├── tickets/
│   │   │   ├── page.tsx              # Student Support Tickets List
│   │   │   └── [id]/page.tsx         # Ticket Details & Staff Discussion
│   │   ├── notifications/page.tsx    # Student Notifications & Announcements
│   │   └── profile/page.tsx          # Profile & Password Management
│   │
│   ├── staff/                        # Academic Staff Advisor Portal routes
│   │   ├── layout.tsx                # Role guard for staff, admin, super_admin
│   │   ├── page.tsx                  # Staff Advisor Dashboard & KPIs
│   │   ├── tickets/
│   │   │   ├── page.tsx              # Department Ticket Queue (with Mine Only filter)
│   │   │   └── [id]/page.tsx         # Ticket Detail & Staff Actions (Assign/Respond/Resolve)
│   │   ├── knowledge/page.tsx        # Department Knowledge Base Management
│   │   └── faqs/page.tsx             # Department FAQ Management
│   │
│   ├── admin/                        # System Administrative Suite routes
│   │   ├── layout.tsx                # Role guard for admin & super_admin
│   │   ├── page.tsx                  # Executive Overview & KPIs
│   │   ├── knowledge/
│   │   │   ├── page.tsx              # System Knowledge Base & Ingestion
│   │   │   └── [id]/page.tsx         # Chunk Inspector & Embeddings View
│   │   ├── faqs/page.tsx             # Global FAQ Management
│   │   ├── tickets/
│   │   │   ├── page.tsx              # Helpdesk Triage Queue
│   │   │   └── [id]/page.tsx         # Full Control (Reassign, Close, Override)
│   │   ├── users/page.tsx            # User & Staff Account Management
│   │   ├── departments/page.tsx      # Academic Departments Configuration
│   │   ├── analytics/page.tsx        # Intent & Vector Coverage Analytics
│   │   └── settings/page.tsx         # Audit Logs & System Diagnostics
│   │
│   ├── layout.tsx                    # Root Layout with Theme, Auth & Query Providers
│   ├── page.tsx                      # Modern Landing Page
│   └── globals.css                   # CSS Variables Design Tokens (Light/Dark Mode)
│
├── components/
│   ├── layout/                       # Navbar, Footer, StudentSidebar, StaffSidebar, AdminSidebar, Header, ThemeToggle
│   ├── chat/                         # ChatContainer, ChatSidebar, ChatMessageItem, ChatInput, SourcePanel, etc.
│   ├── dashboard/                    # WelcomeBanner, QuickActionCard, RecentConversationsWidget, ActiveTicketsWidget
│   ├── tickets/                      # TicketTimeline, TicketStatusBadge, TicketCreateModal
│   ├── knowledge/                    # DocumentUploadModal with 5-stage ingestion progress
│   └── shared/                       # EmptyState, ErrorState, LoadingState, PaginationControls, ConfirmDialog
│
├── lib/
│   ├── api.ts                        # Axios client with interceptors, JWT refresh, error parsing
│   ├── auth.ts                       # LocalStorage & session utilities
│   ├── constants.ts                  # Categories, intents, priorities, and default values
│   └── utils.ts                      # cn(), badge color resolvers, date formatters
│
├── services/                         # REST API integration services (auth, user, ticket, staff, admin, etc.)
├── hooks/                            # Custom React Query & context hooks
├── types/                            # TypeScript interfaces matching backend models
└── providers/                        # QueryProvider, AuthProvider, ThemeProvider, ToastProvider
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ or Bun 1.0+
- Running FastAPI backend (`academic-virtual-A-BD` on `http://localhost:8000`)

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 3. Install Dependencies
```bash
bun install
# or
npm install
```

### 4. Run Development Server
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔒 Authentication & Role Flow

- **Student Role (`student`)**:
  - Registers with Full Name, University Email, Matriculation Number, and Department.
  - Full access to `/dashboard/*` (AI Assistant, Conversation History, Support Tickets, Notifications, Profile).
  - Restricted from accessing `/staff/*` and `/admin/*`.

- **Staff Advisor Role (`staff`)**:
  - Authenticates via `/login` and is automatically routed to `/staff`.
  - Scoped access to `/staff/*` (Department Ticket Queue, Response Triage, Knowledge Uploads, FAQs).
  - Restricted from accessing system admin routes like `/admin/users` or `/admin/departments`.

- **Administrator Roles (`admin`, `super_admin`)**:
  - Authenticates via `/login` and is automatically routed to `/admin`.
  - Full administrative access to `/admin/*` (System KPIs, Department Management, Staff Creation, Global Ticket Overrides, Security Audit Logs).
  - Can switch to the Staff or Student portals at any time.

---

## 🧪 Verification & Build Check

Run the TypeScript validation and Next.js build:
```bash
bun run build
# or
npm run build
```