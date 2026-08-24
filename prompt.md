You are a senior frontend engineer and product designer.

Build a complete, modern, responsive frontend for an:

"Intelligent Academic Support Chatbot"

The application is an academic support platform that allows university students to ask questions about academic and administrative matters using natural language.

The frontend will communicate with an existing FastAPI backend using REST APIs.

# TECH STACK

Use ONLY:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Query / TanStack Query
- Axios

Use the Next.js App Router.

Do NOT introduce unnecessary frameworks.

Do NOT use a separate backend inside Next.js.

The backend is FastAPI.

Architecture:

Next.js
↓
FastAPI REST API
↓
MongoDB Atlas
↓
RAG + LLM

==================================================

1. # PRODUCT VISION

The application should feel like:

"University Student Portal + AI Academic Assistant"

It must NOT look like a generic ChatGPT clone.

The design should communicate:

- Trust
- Academic professionalism
- Simplicity
- Intelligence
- Accessibility
- Reliability
- Modern university technology

The AI assistant should be the central feature of the application.

Students should be able to immediately understand:

"What can this system help me with?"

The interface should therefore provide quick-action categories such as:

- Course Registration
- Examination
- Results
- Academic Calendar
- Student Portal
- Admission
- Fees
- Departmental Issues
- Support

# ================================================== 2. DESIGN DIRECTION

Create a premium modern SaaS-style university interface.

Design inspiration:

- Modern university portals
- Modern SaaS dashboards
- AI assistants
- Helpdesk systems
- Knowledge management platforms

Do NOT copy ChatGPT's interface exactly.

Use a distinctive academic visual identity.

Design characteristics:

- Clean
- Minimal
- Spacious
- Professional
- Modern
- Accessible
- Responsive
- Subtle animations
- Rounded cards
- Soft shadows
- Clear typography
- Strong hierarchy

Avoid:

- Excessive gradients
- Excessive animations
- Huge text everywhere
- Glassmorphism overuse
- Neon colors
- Gaming aesthetics
- Cluttered dashboards

# ================================================== 3. COLOR SYSTEM

Create a centralized color system.

Primary:

Deep academic navy / blue

Secondary:

Blue / indigo accent

Background:

Very light gray / off-white

Cards:

White

Text:

Dark navy / slate

Muted text:

Gray

Status colors:

Green = success/resolved
Amber = pending/in progress
Red = error/urgent
Blue = information

The application should support both:

LIGHT MODE
DARK MODE

Use CSS variables so the theme can be changed easily.

Do not hard-code colors throughout components.

# ================================================== 4. TYPOGRAPHY

Use a modern readable font.

Recommended:

Inter

or

Geist

Typography should have:

- Strong page headings
- Medium-weight section headings
- Comfortable body text
- Small muted metadata
- Readable chatbot messages

The UI should prioritize readability over decorative typography.

# ================================================== 5. GLOBAL APPLICATION STRUCTURE

Create:

/app
/components
/lib
/hooks
/types
/services
/providers

Suggested structure:

app/
├── (auth)/
│ ├── login/
│ ├── register/
│ ├── forgot-password/
│ └── reset-password/
│
├── dashboard/
│ ├── page.tsx
│ ├── chat/
│ ├── conversations/
│ ├── tickets/
│ ├── notifications/
│ └── profile/
│
├── admin/
│ ├── page.tsx
│ ├── knowledge/
│ ├── faqs/
│ ├── tickets/
│ ├── users/
│ ├── departments/
│ ├── analytics/
│ └── settings/
│
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── layout/
├── navigation/
├── chat/
├── dashboard/
├── tickets/
├── knowledge/
├── analytics/
├── forms/
├── ui/
└── shared/

lib/
├── api.ts
├── auth.ts
├── utils.ts
└── constants.ts

services/
├── auth.service.ts
├── chat.service.ts
├── conversation.service.ts
├── ticket.service.ts
├── knowledge.service.ts
├── faq.service.ts
├── analytics.service.ts
└── notification.service.ts

hooks/
├── use-auth.ts
├── use-chat.ts
├── use-conversations.ts
├── use-tickets.ts
├── use-knowledge.ts
└── use-notifications.ts

types/
├── auth.ts
├── chat.ts
├── conversation.ts
├── ticket.ts
├── knowledge.ts
├── notification.ts
└── analytics.ts

# ================================================== 6. LANDING PAGE

Create a polished landing page.

Hero:

"Your Intelligent Academic Assistant"

Subtitle:

"Get fast, reliable answers to your academic and student support questions."

Primary CTA:

"Ask the Assistant"

Secondary CTA:

"Learn More"

Include a visual preview of the chatbot interface.

Add sections:

1. How It Works
2. What You Can Ask
3. Trusted Academic Information
4. Human Support When You Need It
5. Frequently Asked Questions
6. CTA

Example:

HOW IT WORKS

01
Ask

Ask your question naturally.

02
Understand

The AI understands your request.

03
Find

The system searches trusted academic information.

04
Answer

You receive a clear response with relevant sources.

05
Escalate

If necessary, your issue can be sent to human support.

# ================================================== 7. AUTHENTICATION UI

Create:

/login
/register
/forgot-password
/reset-password

LOGIN

Design:

Left:

Branding / illustration / academic message

Right:

Login form

Fields:

Email
Password

Actions:

Login
Forgot password

Optional:

Remember me

REGISTER

Fields:

Full name
Email
Password
Confirm password
Matric number
Department

Role should NOT be selectable by the student.

Default role:

student

# ================================================== 8. STUDENT DASHBOARD

This is the main authenticated screen.

Layout:

Desktop:

Sidebar
Main content

Mobile:

Bottom navigation or collapsible navigation

HEADER

Display:

Good morning, [Student Name]

Subtitle:

"How can I help you today?"

Include:

Notification icon
Profile menu

QUICK ACTIONS

Create cards:

Course Registration
Examinations
Results
Academic Calendar
Student Portal
Admission
Fees
Department Support

Each card should have:

Icon
Title
Short description
Hover state

Example:

Course Registration

"Get help registering your courses."

Clicking the card should open the chatbot and prefill an appropriate prompt.

# ================================================== 9. MAIN CHATBOT UI

This is the MOST IMPORTANT SCREEN.

Route:

/dashboard/chat

Create a professional AI assistant interface.

Desktop layout:

---

## | Sidebar | Chat | Sources / Context Panel |

CHAT SIDEBAR

Show:

New Chat

Recent conversations

Examples:

Course Registration
Exam timetable
Portal issue
Admission requirements

Each conversation should display:

Title
Last message
Time

Allow:

Search conversations
Delete conversation

CHAT AREA

Header:

AI Academic Assistant

Status:

● Online

Optional:

"Powered by institutional knowledge"

EMPTY STATE

When no conversation exists:

Icon

"How can I help you today?"

Subtitle:

"Ask about registration, exams, results, academic procedures, or student support."

Show suggestion cards:

"How do I register my courses?"

"When does registration close?"

"How do I reset my portal password?"

"How can I check my result?"

"How do I contact my department?"

CHAT MESSAGE DESIGN

Student message:

Right aligned

Assistant message:

Left aligned

Assistant messages should support:

- Markdown
- Bullet lists
- Numbered lists
- Bold text
- Links where appropriate
- Source references

Example:

Assistant:

"Course registration requires you to first complete your fee payment.

You can then:

1. Log into the student portal.
2. Open Course Registration.
3. Select your semester.
4. Select your courses.
5. Submit your registration."

Below the response:

Sources

📄 Academic Handbook
Page 24

📄 Course Registration Guide
Page 7

# ================================================== 10. SOURCE PANEL

This is a VERY important feature.

Because the system uses RAG, users should be able to see where the AI obtained its information.

Create:

"Sources"

panel.

Example:

Sources

────────────────────

📄 Academic Handbook

Course Registration

Page 24

[View Source]

────────────────────

📄 Academic Calendar 2026/2027

Registration Dates

Page 8

[View Source]

The panel should show:

Document name
Category
Page
Relevant section

Do not show embeddings or technical vector information.

# ================================================== 11. AI RESPONSE STATES

Support:

Loading

Show animated typing indicator.

Example:

● ● ●

"Searching academic information..."

SEARCHING

Show:

"Searching trusted academic sources..."

GENERATING

Show:

"Preparing your answer..."

SUCCESS

Show the response normally.

NO INFORMATION

If the AI cannot find reliable information:

"I couldn't find verified information about this in the current academic knowledge base."

Then provide:

[Create Support Ticket]

[Contact Department]

ERROR

If the AI service fails:

"Something went wrong while processing your request."

Buttons:

Try Again
Create Support Ticket

# ================================================== 12. CHAT INPUT

Create a modern input area.

Placeholder:

"Ask about registration, exams, results, fees..."

Features:

- Text input
- Send button
- Enter to send
- Shift + Enter for new line
- Disabled state
- Loading state

Optional:

Voice input button

Do not implement voice functionality unless the backend/API exists.

Make the UI ready for it.

# ================================================== 13. CHAT FEEDBACK

Every assistant message should support:

👍 Helpful
👎 Not helpful

Optional:

"Was this answer helpful?"

If negative:

"What went wrong?"

Options:

- Incorrect information
- Not relevant
- Didn't understand
- Missing information

Send feedback to:

POST /api/v1/feedback

# ================================================== 14. HUMAN SUPPORT ESCALATION

If AI cannot resolve a problem, show a special card:

"Need more help?"

"Your issue may require assistance from a staff member."

Buttons:

[Create Support Ticket]

[Contact Department]

The ticket form should contain:

Subject
Category
Description
Priority

Department should be automatically selected where possible.

After creation:

"Support ticket created successfully."

Display:

Ticket Number

Example:

TCK-1024

# ================================================== 15. TICKETS PAGE

Route:

/dashboard/tickets

Title:

"Support Requests"

Include:

Search
Filter
Status filter

Cards/table:

Ticket Number
Subject
Category
Department
Status
Priority
Created
Updated

Status badges:

Open
In Progress
Waiting for Student
Resolved
Closed

Clicking a ticket opens:

/dashboard/tickets/[id]

# ================================================== 16. TICKET DETAILS

Create a support conversation layout.

Header:

TCK-1024

Portal Login Problem

Status:
In Progress

Timeline:

Student created ticket
Staff assigned ticket
Staff responded
Student replied

Include:

Message history

Reply box

Attachments UI can be included visually but should only be functional if backend support exists.

Actions:

Reply
Close Ticket

Students should only see their own tickets.

# ================================================== 17. CONVERSATIONS PAGE

Route:

/dashboard/conversations

Display all student's previous conversations.

Each item:

Conversation title
Preview
Date
Message count

Actions:

Open
Delete

Include search.

# ================================================== 18. NOTIFICATIONS

Create notification dropdown.

Examples:

"Your support ticket TCK-1024 was updated."

"Your ticket has been resolved."

"New academic information has been added."

"Your department responded to your request."

Include:

Mark as read
Mark all as read

Create:

/dashboard/notifications

# ================================================== 19. PROFILE PAGE

Route:

/dashboard/profile

Display:

Profile picture
Full name
Email
Matric number
Department
Faculty

Allow editing only permitted fields.

Sections:

Personal Information
Academic Information
Security

Security:

Change password

# ================================================== 20. ADMIN DASHBOARD

Create a separate admin interface.

Route:

/admin

Admin layout:

Sidebar
Top navigation
Main dashboard

Sidebar:

Dashboard
Knowledge Base
FAQs
Support Tickets
Users
Departments
Analytics
Notifications
Settings

# ================================================== 21. ADMIN OVERVIEW

Display KPI cards:

Total Students
Total Conversations
Total Questions
Open Tickets
Resolved Tickets
Knowledge Documents
Average Response Rating

Example:

12,842

Students

8,421

Conversations

284

Open Tickets

92%

Helpful Responses

Add charts:

Questions by category

Ticket status

Popular intents

Feedback

Do not overload the dashboard with charts.

# ================================================== 22. KNOWLEDGE BASE ADMIN UI

Route:

/admin/knowledge

This is one of the most important admin pages.

Header:

"Knowledge Base"

Description:

"Manage the academic documents and information used by the AI assistant."

Primary button:

- Upload Document

DOCUMENT TABLE

Columns:

Document
Category
Department
Pages
Chunks
Status
Updated
Actions

Actions:

View
Edit
Reprocess
Publish
Archive
Delete

# ================================================== 23. DOCUMENT UPLOAD UI

Create a polished upload dialog/page.

Title:

"Add Knowledge Document"

Drag-and-drop area.

Accept:

PDF
DOCX
TXT

Show selected file:

File name
Size
Type
Remove

Fields:

Title
Category
Department
Description

Checkbox:

"Publish after processing"

Button:

"Upload & Process"

PROCESSING UI

After upload:

Uploading...
Extracting text...
Splitting document...
Generating embeddings...
Indexing knowledge...
Complete

SUCCESS:

"Document successfully added to the knowledge base."

# ================================================== 24. DOCUMENT DETAILS

Show:

Document title
Source
Category
Department
Pages
Chunks
Status
Created
Updated

Tabs:

Overview
Extracted Text
Chunks
Metadata

Do NOT expose embedding vectors.

Show chunk previews.

Example:

Chunk #24

"Students are required to complete fee payment before course registration..."

Page:

24

# ================================================== 25. FAQ MANAGEMENT

Route:

/admin/faqs

Create:

FAQ list

Search

Filter category

Add FAQ

Fields:

Question
Answer
Category
Department
Status

Actions:

Edit
Publish
Archive
Delete

# ================================================== 26. SUPPORT TICKET ADMIN

Route:

/admin/tickets

Create a professional helpdesk interface.

Filters:

All
Open
In Progress
Waiting
Resolved
Closed

Additional filters:

Department
Priority
Date

Ticket table:

Ticket
Student
Subject
Department
Priority
Status
Assigned To
Created

# ================================================== 27. TICKET ADMIN DETAILS

Show:

Student information

Ticket information

Conversation

Internal notes

Assignment

Status

Priority

Department

Actions:

Assign
Change Status
Change Priority
Reply
Add Internal Note

# ================================================== 28. USER MANAGEMENT

Route:

/admin/users

Table:

Name
Email
Matric Number
Department
Role
Status
Created

Filters:

Student
Staff
Admin

Actions:

View
Deactivate
Edit

Do NOT allow administrators to expose sensitive information unnecessarily.

# ================================================== 29. ANALYTICS

Route:

/admin/analytics

Create clean analytics.

Metrics:

Total Questions

Questions by Intent

Most Common Questions

Unanswered Questions

AI Success Rate

Human Escalation Rate

Ticket Resolution Rate

Helpful Response Rate

Charts:

Questions by category

Ticket trends

Daily conversations

AI vs human support

Use simple readable charts.

Do not create visual clutter.

# ================================================== 30. RESPONSIVE DESIGN

The application MUST be fully responsive.

Desktop:

Sidebar + content

Tablet:

Collapsible sidebar

Mobile:

Bottom navigation or compact navigation

Chat mobile layout:

Chat should occupy the full viewport.

Sources should become:

Bottom sheet / drawer

Ticket tables should become cards.

Admin tables should support horizontal scrolling or responsive cards.

# ================================================== 31. ACCESSIBILITY

Follow accessibility best practices.

Use:

Semantic HTML
ARIA labels
Keyboard navigation
Focus states
Readable contrast
Accessible buttons
Accessible forms

Do not rely only on color to communicate status.

# ================================================== 32. ANIMATIONS

Use subtle Framer Motion animations only where useful.

Examples:

Page transitions
Card hover
Chat message appearance
Sidebar transitions
Modal opening
Upload processing

Avoid excessive animation.

Animations should feel professional.

# ================================================== 33. COMPONENT SYSTEM

Create reusable components.

Examples:

<Button />
<Card />
<Modal />
<Badge />
<Input />
<Select />
<Avatar />
<Sidebar />
<Topbar />
<ChatMessage />
<ChatInput />
<SourceCard />
<ConversationItem />
<TicketCard />
<TicketStatusBadge />
<KnowledgeDocumentCard />
<UploadDropzone />
<StatsCard />
<EmptyState />
<LoadingState />
<ErrorState />
<ConfirmDialog />

# ================================================== 34. API INTEGRATION

Create a centralized Axios client.

Base URL:

NEXT_PUBLIC_API_URL

Example:

NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

Create services:

authService
chatService
conversationService
ticketService
knowledgeService
faqService
notificationService
analyticsService

Use TanStack Query for:

Fetching
Caching
Mutations
Loading states
Error states
Invalidation

# ================================================== 35. AUTHENTICATION STATE

Implement:

Login
Logout
Register
Current user

Protect:

/dashboard/_
/admin/_

Students must not access:

/admin/\*

Staff/admin routes should be protected by role.

Do not trust role information from localStorage.

The backend remains the source of truth.

# ================================================== 36. API TYPES

Create TypeScript interfaces matching FastAPI responses.

Example:

interface ChatResponse {
success: boolean;
data: {
conversation_id: string;
message_id: string;
response: string;
intent: string;
confidence: number;
sources: Source[];
requires_human_support: boolean;
};
}

# ================================================== 37. LOADING EXPERIENCE

Do not show blank pages while loading.

Use:

Skeletons
Spinners
Typing indicators
Progress indicators

For document processing:

Show actual stages:

Uploading
Extracting
Chunking
Embedding
Indexing
Complete

# ================================================== 38. EMPTY STATES

Create polished empty states.

No conversations:

"You haven't started a conversation yet."

[Start a Conversation]

No tickets:

"No support requests yet."

[Ask the AI Assistant]

No notifications:

"You're all caught up."

No documents:

"No knowledge documents have been added yet."

[Upload Document]

# ================================================== 39. ERROR STATES

Create friendly errors.

Example:

"Unable to load your conversations."

[Try Again]

For API errors:

Do not display raw FastAPI errors.

Convert API errors into human-readable messages.

# ================================================== 40. SECURITY UI

Never expose:

API keys
MongoDB credentials
LLM configuration
Internal prompts
Embeddings
Backend secrets

# ================================================== 41. DASHBOARD SIDEBAR

Student navigation:

🏠 Dashboard

🤖 AI Assistant

💬 Conversations

🎫 Support Requests

🔔 Notifications

👤 Profile

Admin navigation:

📊 Dashboard

📚 Knowledge Base

❓ FAQs

🎫 Support Tickets

👥 Users

🏛 Departments

📈 Analytics

⚙ Settings

Use Lucide icons.

# ================================================== 42. HEADER

Header should contain:

Page title

Search where appropriate

Notifications

Theme toggle

Profile dropdown

Profile dropdown:

My Profile
Settings
Logout

# ================================================== 43. AI TRUST INDICATORS

Because this is an academic chatbot, clearly communicate that answers come from institutional information.

In the chat UI include subtle text such as:

"Answers are generated using the academic knowledge base."

For sourced answers:

"Based on verified academic documents."

For uncertain answers:

"I couldn't verify this information from the current knowledge base."

# ================================================== 44. SOURCE VIEWER

When a student clicks:

"View Source"

open a side panel.

Show:

Document title
Page number
Relevant text excerpt

Example:

Academic Handbook

Page 24

Relevant section:

"Students must complete registration before the deadline..."

Provide:

[Open Document]

if the backend provides a document URL.

# ================================================== 45. SEARCH

Implement frontend search interfaces for:

Conversations
Knowledge documents
FAQs
Tickets
Users

Debounce search inputs.

Use backend search APIs where appropriate.

# ================================================== 46. NOTIFICATION UX

Use toast notifications for:

Successful ticket creation
Profile update
Document upload
Document processing completion
FAQ creation
Successful login
Errors

Do not use alerts for normal interactions.

# ================================================== 47. FORMS

Use React Hook Form if necessary for complex forms.

Validate fields on the client.

However:

Backend validation remains authoritative.

# ================================================== 48. TABLES

Use responsive tables for admin pages.

Features:

Sorting
Filtering
Pagination
Search
Row actions

Mobile:

Transform tables into cards where practical.

# ================================================== 49. MODALS

Use shadcn Dialog.

Confirmation required for:

Delete document
Delete FAQ
Delete conversation
Deactivate user

Example:

"Delete Academic Handbook?"

"This document will no longer be available to the AI assistant."

[Cancel]

[Delete]

# ================================================== 50. CHAT UX DETAILS

When the user sends:

"How do I register my courses?"

Show:

User message

Then:

AI typing indicator

Then:

"Searching academic information..."

Then response.

Below:

Sources

Feedback

Ask follow-up

The user should be able to continue naturally:

"Where do I find the registration page?"

The conversation context should remain visible.

# ================================================== 51. CHAT CONTEXT

The frontend should send:

conversation_id

with subsequent messages.

Example:

POST /chat

{
"conversation_id": "abc123",
"message": "Where do I find it?"
}

The backend handles conversation context.

# ================================================== 52. PREVENT UI HALLUCINATION

The frontend must NEVER invent:

Academic dates
Fees
Course codes
University policies
Department information

All institutional information must come from the backend.

The frontend only displays backend responses.

# ================================================== 53. FINAL ROUTES

PUBLIC:

/
/login
/register
/forgot-password
/reset-password

STUDENT:

/dashboard
/dashboard/chat
/dashboard/conversations
/dashboard/tickets
/dashboard/tickets/[id]
/dashboard/notifications
/dashboard/profile

ADMIN:

/admin
/admin/knowledge
/admin/knowledge/[id]
/admin/faqs
/admin/tickets
/admin/tickets/[id]
/admin/users
/admin/departments
/admin/analytics
/admin/settings

# ================================================== 54. DESIGN QUALITY

The final interface should look like a real production application.

Do NOT make it look like:

- A school project
- A generic dashboard template
- A basic CRUD application
- A ChatGPT copy

It should feel like a real product that a university could deploy.

# ================================================== 55. FINAL USER EXPERIENCE

A student should be able to:

1. Register.
2. Login.
3. See their dashboard.
4. Ask an academic question.
5. Receive an AI answer.
6. See the sources used.
7. Ask follow-up questions.
8. Rate the answer.
9. Create a support ticket if necessary.
10. Track the ticket.
11. Receive notifications.
12. Manage their profile.

An administrator should be able to:

1. Login.
2. View system analytics.
3. Upload academic documents.
4. Process documents.
5. Manage the knowledge base.
6. Manage FAQs.
7. View support tickets.
8. Assign tickets.
9. Manage users.
10. Manage departments.
11. Monitor chatbot performance.

# ================================================== 56. IMPORTANT IMPLEMENTATION RULE

Do not build everything as one giant page.

Break the UI into reusable components.

Do not duplicate components.

Use TypeScript properly.

Do not use "any" unless absolutely unavoidable.

Create proper loading, error, empty, and success states.

Use realistic mock data ONLY when the API endpoint is not yet available.

Clearly isolate mock data so it can easily be removed when the FastAPI backend is connected.

# ================================================== 57. FINAL DELIVERABLE

Generate the complete Next.js frontend.

Include:

- Complete folder structure
- All pages
- All reusable components
- Responsive layouts
- Authentication UI
- Student dashboard
- AI chatbot
- Chat history
- Sources panel
- Support tickets
- Notifications
- Profile
- Admin dashboard
- Knowledge base
- Document upload
- FAQ management
- Ticket management
- User management
- Analytics
- API services
- TypeScript types
- React Query hooks
- Axios client
- Error handling
- Loading states
- Empty states
- Dark mode
- Mobile responsiveness

The result should be ready to connect to the FastAPI backend.

Do not stop after generating the dashboard.

Build the complete frontend experience.

Make sure to scan the academic-virtual-A-BD to get the endpoints and connect to frontend.

Make sure the base URL is in a .env file
