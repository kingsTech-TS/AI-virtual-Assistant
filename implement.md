# Implementation Plan: Intelligent Academic Support Chatbot Frontend

## 1. Executive Summary & Architecture

This document specifies the end-to-end technical implementation plan for the frontend of the **Intelligent Academic Support Chatbot** platform. The application serves university students with AI-powered natural-language academic and administrative assistance (integrated with RAG over institutional knowledge) and seamlessly escalates complex matters to human administrative and departmental staff via a structured ticketing system.

### System Architecture
```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js App Router Frontend                     │
│               (TypeScript, Tailwind CSS, TanStack Query, Axios)         │
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

### Technology Stack
- **Framework**: Next.js (App Router, Server Components & Client Components where interactive)
- **Language**: TypeScript (Strict Mode, 100% type safety matching FastAPI schemas)
- **Styling**: Tailwind CSS with CSS Variables design tokens (Light/Dark mode)
- **UI Components & Icons**: shadcn/ui patterns & Lucide React icons
- **State & Server Data**: `@tanstack/react-query` for data fetching, caching, optimistic updates, and cache invalidation
- **HTTP Client**: Axios with interceptors for Bearer token injection, automatic token refresh, and standardized error transformation
- **Forms & Validation**: Controlled React forms / React Hook Form with Zod validation matching backend constraints

---

## 2. Target Directory & File Structure

```
academic-virtual-ass/
├── .env.local
├── .env.example
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── tailwind.config.ts
│
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── chat/page.tsx
│   │   ├── conversations/page.tsx
│   │   ├── tickets/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── profile/page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── knowledge/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── tickets/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── users/page.tsx
│   │   ├── departments/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                           # Button, Input, Textarea, Badge, Card, Modal/Dialog, Dropdown, Table, Tabs, Avatar, Skeleton
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── StudentSidebar.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── Header.tsx
│   │   └── ThemeToggle.tsx
│   ├── chat/
│   │   ├── ChatContainer.tsx
│   │   ├── ChatSidebar.tsx
│   │   ├── ChatMessageList.tsx
│   │   ├── ChatMessageItem.tsx
│   │   ├── ChatInput.tsx
│   │   ├── SourcePanel.tsx
│   │   ├── SourceCard.tsx
│   │   ├── SourceDetailModal.tsx
│   │   ├── FeedbackModal.tsx
│   │   ├── EscalationCard.tsx
│   │   └── TypingIndicator.tsx
│   ├── dashboard/
│   │   ├── WelcomeBanner.tsx
│   │   ├── QuickActionCard.tsx
│   │   ├── RecentConversationsWidget.tsx
│   │   └── ActiveTicketsWidget.tsx
│   ├── tickets/
│   │   ├── TicketList.tsx
│   │   ├── TicketCard.tsx
│   │   ├── TicketDetail.tsx
│   │   ├── TicketTimeline.tsx
│   │   ├── TicketCreateModal.tsx
│   │   └── TicketStatusBadge.tsx
│   ├── knowledge/
│   │   ├── DocumentTable.tsx
│   │   ├── DocumentUploadModal.tsx
│   │   ├── ProcessingPipelineProgress.tsx
│   │   └── ChunkPreviewList.tsx
│   ├── faqs/
│   │   ├── FAQList.tsx
│   │   └── FAQModal.tsx
│   ├── analytics/
│   │   ├── KPICard.tsx
│   │   ├── IntentBarChart.tsx
│   │   ├── TicketStatusPieChart.tsx
│   │   └── FeedbackTrendChart.tsx
│   ├── shared/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   ├── PaginationControls.tsx
│   │   ├── SearchInput.tsx
│   │   └── ConfirmDialog.tsx
│   └── forms/
│       └── FormField.tsx
│
├── lib/
│   ├── api.ts                        # Axios instance with interceptors, token refresh & error handling
│   ├── auth.ts                       # Token storage, auth cookies/session helpers
│   ├── utils.ts                      # cn(), date formatters, status color resolvers
│   └── constants.ts                  # Categories, priority mappings, intents, navigation items
│
├── services/
│   ├── auth.service.ts
│   ├── chat.service.ts
│   ├── conversation.service.ts
│   ├── ticket.service.ts
│   ├── knowledge.service.ts
│   ├── faq.service.ts
│   ├── department.service.ts
│   ├── user.service.ts
│   ├── notification.service.ts
│   ├── feedback.service.ts
│   ├── analytics.service.ts
│   └── admin.service.ts
│
├── hooks/
│   ├── use-auth.ts                   # Auth context, login, logout, current user state
│   ├── use-chat.ts                   # Active conversation state, streaming/mutation hooks
│   ├── use-conversations.ts          # Conversation listing, detail, deletion
│   ├── use-tickets.ts                # Ticket queries, create, update, comment mutations
│   ├── use-knowledge.ts              # Knowledge base queries, upload, update, delete
│   ├── use-faqs.ts                   # FAQ queries and mutations
│   ├── use-departments.ts           # Department listings and mutations
│   ├── use-users.ts                  # User management hooks (admin)
│   ├── use-notifications.ts          # Unread count, notification list, mark-as-read
│   └── use-analytics.ts              # Overview, intents, tickets, and feedback analytics
│
├── types/
│   ├── api.ts                        # Standard generic SuccessResponse<T>, PaginatedResponse<T>, ErrorResponse
│   ├── auth.ts                       # User, TokenResponse, RegisterRequest, LoginRequest, etc.
│   ├── chat.ts                       # ChatRequest, ChatResponseData, Message, SourceInfo
│   ├── conversation.ts               # Conversation, ConversationDetail
│   ├── ticket.ts                     # Ticket, TicketComment, TicketCreate, TicketUpdate, TicketStatus, TicketPriority
│   ├── knowledge.ts                  # KnowledgeDocument, KnowledgeChunk, KnowledgeCreate, KnowledgeStatus
│   ├── faq.ts                        # FAQ, FAQCreate, FAQUpdate, FAQStatus
│   ├── department.ts                 # Department, DepartmentCreate, DepartmentUpdate
│   ├── user.ts                       # UserProfile, UserRole, UserUpdateRequest, AdminUserCreateRequest
│   ├── notification.ts               # Notification, NotificationType
│   ├── feedback.ts                   # FeedbackCreate, FeedbackResponse, FeedbackRating
│   └── analytics.ts                  # OverviewStats, IntentMetric, TicketMetric, FeedbackMetric
│
└── providers/
    ├── QueryProvider.tsx             # TanStack Query Client Provider
    ├── AuthProvider.tsx              # Current user context & route guard
    ├── ThemeProvider.tsx             # Light/Dark mode state
    └── ToastProvider.tsx             # Sonner/Toast notification provider
```

---

## 3. Backend API Contract Mapping

All API endpoints map directly to the running FastAPI backend (`http://localhost:8000/api/v1`):

### 3.1. Standard Response Formats
- **Standard Success**: `{ "success": true, "data": T }`
- **Paginated List**: `{ "success": true, "items": T[], "pagination": { "total": number, "page": number, "limit": number, "pages": number } }`
- **Standard Error**: `{ "success": false, "error": { "code": string, "message": string, "details": any } }`

### 3.2. Endpoint Inventory

| Resource | Method | Endpoint | Access Level | Description |
|---|---|---|---|---|
| **Auth** | `POST` | `/auth/register` | Public | Registers a new student |
| | `POST` | `/auth/login` | Public | Authenticates & returns access/refresh tokens |
| | `POST` | `/auth/refresh` | Public | Exchanges refresh token for new access token |
| | `POST` | `/auth/logout` | Authenticated | Logs out current session |
| | `GET` | `/auth/me` | Authenticated | Fetches current user profile |
| | `POST` | `/auth/forgot-password` | Public | Requests password reset email |
| | `POST` | `/auth/reset-password` | Public | Resets password with token |
| **Chat & AI** | `POST` | `/chat` | Authenticated | Submits student prompt -> intent -> RAG -> AI response |
| | `GET` | `/chat/conversations` | Authenticated | Paginated user conversation history |
| | `GET` | `/chat/conversations/{id}` | Authenticated | Gets conversation metadata + all messages |
| | `DELETE` | `/chat/conversations/{id}` | Authenticated | Deletes conversation and messages |
| | `POST` | `/feedback` | Authenticated | Submits helpful/not helpful rating + comment |
| **Tickets** | `POST` | `/tickets` | Authenticated | Creates a support ticket (student/staff) |
| | `GET` | `/tickets` | Authenticated | Paginated tickets (scoped to student or staff role) |
| | `GET` | `/tickets/{id}` | Authenticated | Gets ticket details & comments timeline |
| | `PATCH` | `/tickets/{id}` | Authenticated | Updates status, priority, assigns, or appends comments |
| **Knowledge** | `GET` | `/knowledge` | Authenticated | Lists institutional knowledge base documents |
| | `POST` | `/knowledge` | Staff/Admin | Ingests document + generates embeddings |
| | `GET` | `/knowledge/{id}` | Authenticated | Gets document details, content & chunks |
| | `PATCH` | `/knowledge/{id}` | Staff/Admin | Updates document & regenerates embeddings |
| | `DELETE` | `/knowledge/{id}` | Staff/Admin | Deletes knowledge document |
| **FAQs** | `GET` | `/faqs` | Authenticated | Lists verified FAQs with category filter |
| | `POST` | `/faqs` | Staff/Admin | Creates a verified FAQ entry |
| | `GET` | `/faqs/{id}` | Authenticated | Gets single FAQ details |
| | `PATCH` | `/faqs/{id}` | Staff/Admin | Updates FAQ question/answer/status |
| | `DELETE` | `/faqs/{id}` | Staff/Admin | Deletes FAQ entry |
| **Departments** | `GET` | `/departments` | Authenticated | Lists academic departments |
| | `POST` | `/departments` | Admin | Creates a new academic department |
| | `GET` | `/departments/{id}` | Authenticated | Gets department info |
| | `PATCH` | `/departments/{id}` | Admin | Updates department metadata |
| | `DELETE` | `/departments/{id}` | Admin | Deletes department |
| **Users** | `GET` | `/users/me` | Authenticated | Gets authenticated user details |
| | `PATCH` | `/users/me` | Authenticated | Updates student name, phone, password |
| | `GET` | `/users` | Admin | Paginated list of users |
| | `GET` | `/users/{id}` | Admin/Owner | Gets user by ID |
| | `PATCH` | `/users/{id}` | Admin | Updates user status, role, department |
| **Notifications** | `GET` | `/notifications` | Authenticated | Paginated notifications (optional `unread=true`) |
| | `PATCH` | `/notifications/{id}/read` | Authenticated | Marks notification as read |
| **Analytics** | `GET` | `/analytics/overview` | Admin | Total students, conversations, tickets, rating |
| | `GET` | `/analytics/intents` | Admin | Intent breakdown and confidence metrics |
| | `GET` | `/analytics/tickets` | Admin | Ticket resolution metrics & category breakdown |
| | `GET` | `/analytics/feedback` | Admin | Feedback trends & comment analytics |
| **Admin Operations** | `GET` | `/admin/audit-logs` | Admin | Audit trail with filtering |
| | `PATCH` | `/admin/users/{id}/role` | Super Admin | Updates user role |
| | `POST` | `/admin/users` | Admin | Creates staff or admin user directly |
| **Health** | `GET` | `/health` | Public | Backend health check |

---

## 4. Design System & Theme Configuration

### 4.1. Color Palette (Academic Deep Navy & Modern SaaS)
- **Primary**: Deep Academic Navy (`#0F172A` / `#1E293B`, dark mode: `#38BDF8` / `#60A5FA` accents)
- **Secondary / Accent**: Vibrant Academic Indigo & Blue (`#2563EB` / `#4F46E5`)
- **Backgrounds**:
  - Light mode: Clean slate/off-white (`#F8FAFC`, cards: `#FFFFFF`)
  - Dark mode: Deep charcoal/slate (`#0B0F17`, cards: `#131B2A`, borders: `#1E293B`)
- **Status Badges**:
  - Success / Resolved: Emerald (`#10B981`)
  - Pending / In Progress: Amber (`#F59E0B`)
  - Urgent / Error: Rose / Crimson (`#EF4444`)
  - Informational: Sky / Blue (`#3B82F6`)

### 4.2. Typography & Hierarchy
- Modern font family: Inter / Geist
- Headings: Bold, clean, academic authority (`tracking-tight`)
- Chat Messages: High-readability line height (`leading-relaxed`), formatted markdown, code syntax highlighting, numbered procedure cards

---

## 5. Key Functional Modules Specification

### 5.1. Authentication & Route Guards
- **Public**: Landing (`/`), Login (`/login`), Register (`/register`), Forgot Password (`/forgot-password`), Reset Password (`/reset-password`).
- **Student Guards (`/dashboard/*`)**: Requires valid token; automatically redirects unauthenticated users to `/login`.
- **Admin & Staff Guards (`/admin/*`)**: Validates that current user role is `staff`, `admin`, or `super_admin`. Students attempting access are redirected to `/dashboard` with an authorization notice.

### 5.2. AI Academic Assistant & Chat Experience (`/dashboard/chat`)
- **Three-Column Desktop Layout**:
  1. **Conversation History Sidebar**: Search, New Chat button, list of recent conversations with delete actions.
  2. **Active Chat Canvas**: Real-time message thread, message states (Thinking, Searching sources, Generating), markdown rendering, actionable follow-ups.
  3. **RAG Source & Context Drawer**: Automatically displays institutional documents cited in the AI response (Document title, category, excerpt snippet, "View Source" modal).
- **Escalation Trigger**: When AI returns `requires_human_support: true` or low confidence, a dedicated Human Support Escalation Card appears with a 1-click "Create Support Ticket" button prefilling ticket subject and context.
- **Feedback Loop**: Thumbs up / down on every assistant message opening a quick rating modal posting directly to `/feedback`.

### 5.3. Student Dashboard (`/dashboard`)
- **Welcome Header**: Personalized greeting, current matriculation number, and department badge.
- **Quick Action Cards**: 8 academic tiles (Course Registration, Examination, Results, Academic Calendar, Student Portal, Admission, Fees, Department Support) that prefill relevant queries into the assistant.
- **Recent Activity**: Quick access to ongoing support tickets and recent chats.

### 5.4. Support Tickets System (`/dashboard/tickets` & `/dashboard/tickets/[id]`)
- **Student View**: Filter by status (Open, In Progress, Waiting for Student, Resolved, Closed), search tickets, ticket creation modal with auto-suggested departments.
- **Ticket Detail Timeline**: Chronological comment trail between student and department staff, status transition indicators, reply input box, and ticket closing action.

### 5.5. Admin Management Suite (`/admin/*`)
- **Executive Analytics Overview (`/admin/analytics`)**: KPI metric cards (Students, Conversations, Open Tickets, AI Satisfaction Rate), Intent Distribution charts, Ticket Resolution breakdown.
- **Knowledge Base Management (`/admin/knowledge`)**: Document inventory table, search & category filters, Drag-and-drop document upload modal (`PDF`, `DOCX`, `TXT`), visual 5-step ingestion pipeline progress (Uploading -> Extracting -> Chunking -> Embedding -> Indexing), chunk previewer.
- **FAQ Management (`/admin/faqs`)**: CRUD interface for common institutional FAQs.
- **Support Ticket Helpdesk (`/admin/tickets`)**: Staff ticketing queue, assignment controls, priority overrides, internal notes, and direct student replies.
- **User Management (`/admin/users`)**: Directory of students and staff, role modifier (Admin/Super Admin only), account status toggles.
- **Department Settings (`/admin/departments`)**: Academic department directory, faculty linking, and support email routing.

---

## 6. Implementation Roadmap & Execution Checklist

### Phase 1: Environment, Dependencies & Base Client Setup
- [ ] Install required packages: `@tanstack/react-query`, `axios`, `lucide-react`, `clsx`, `tailwind-merge`, `date-fns`, `sonner`
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`
- [ ] Configure `globals.css` with CSS variables for Light & Dark mode tokens
- [ ] Implement `lib/api.ts` Axios client with token interceptors and auto-refresh logic
- [ ] Setup `types/` for all API request/response structures

### Phase 2: Providers, Layouts & Reusable UI Components
- [ ] Build `QueryProvider`, `AuthProvider`, `ThemeProvider`, and `ToastProvider`
- [ ] Create core UI primitives: `Button`, `Input`, `Textarea`, `Badge`, `Card`, `Dialog`, `Dropdown`, `Table`, `Tabs`, `Skeleton`
- [ ] Build shared navigation components: `Navbar`, `StudentSidebar`, `AdminSidebar`, `Header`, `ThemeToggle`

### Phase 3: Authentication & Public Pages
- [ ] Implement Landing Page (`/`) with Hero, How It Works, Features, and Preview
- [ ] Implement Login (`/login`) with academic visual branding
- [ ] Implement Register (`/register`) with student matriculation and department selection
- [ ] Implement Forgot Password (`/forgot-password`) and Reset Password (`/reset-password`)

### Phase 4: Student Chatbot & RAG Experience
- [ ] Build `ChatContainer`, `ChatSidebar`, `ChatMessageList`, `ChatMessageItem`, and `ChatInput`
- [ ] Implement `SourcePanel`, `SourceCard`, and `SourceDetailModal` for RAG citations
- [ ] Implement `FeedbackModal` for thumbs up/down response rating
- [ ] Implement `EscalationCard` linking low-confidence answers to ticket creation

### Phase 5: Student Dashboard, Tickets & Profile
- [ ] Implement `/dashboard` with quick actions, stats, and recent activity
- [ ] Implement `/dashboard/conversations` with history search and deletion
- [ ] Implement `/dashboard/tickets` and `/dashboard/tickets/[id]` with comments timeline
- [ ] Implement `/dashboard/notifications` and `/dashboard/profile`

### Phase 6: Admin Management Suite
- [ ] Implement `/admin` & `/admin/analytics` with KPIs and intent charts
- [ ] Implement `/admin/knowledge` & `/admin/knowledge/[id]` with file upload and chunk inspection
- [ ] Implement `/admin/faqs` with full CRUD modal
- [ ] Implement `/admin/tickets` & `/admin/tickets/[id]` with staff assignment & resolution workflows
- [ ] Implement `/admin/users` and `/admin/departments`

### Phase 7: Verification, End-to-End Testing & Polish
- [ ] Verify complete user flow: Register -> Login -> Ask AI -> View Sources -> Submit Feedback -> Open Ticket -> Staff Resolve -> Notifications
- [ ] Validate responsive layouts on Mobile, Tablet, and Desktop
- [ ] Verify Dark/Light mode color contrast and accessibility
- [ ] Ensure smooth build with `npm run build`

---

## 7. Verification Plan

### Automated & Build Verification
1. **Type Checking & Linting**: Run `npx tsc --noEmit` and `npm run lint` to verify zero TypeScript or lint errors.
2. **Build Verification**: Run `npm run build` to ensure all routes and server/client components compile cleanly.

### Manual End-to-End Test Matrix
| Flow | Action | Expected Result |
|---|---|---|
| **Auth** | Register new student & login | Receives JWT tokens, redirects to `/dashboard`, user state populated |
| **Chatbot** | Ask "How do I register my courses?" | Streaming/loading indicator, verified AI response, source badges rendered |
| **Sources** | Click "View Source" on cited document | Drawer opens showing document title, page, and exact excerpt |
| **Escalation** | Ask complex departmental issue | Escalation card rendered with button to prefill ticket modal |
| **Tickets** | Create ticket -> Staff assigns -> Student views | Ticket number generated (e.g. `TCK-1024`), comments appear in real-time |
| **Admin Knowledge** | Upload academic PDF / document | Document status progresses through pipeline and chunks are generated |
| **Admin Analytics** | Open `/admin/analytics` | High-level metrics, intent distributions, and feedback charts render accurately |
