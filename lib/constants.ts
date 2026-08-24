export const APP_NAME = "Academic Virtual Assistant";
export const APP_DESCRIPTION = "Intelligent AI-Powered University Academic & Administrative Support";

export const ACADEMIC_CATEGORIES = [
  {
    id: "course_registration",
    title: "Course Registration",
    description: "Get assistance with course enrollment, add/drop procedures, and requisites.",
    prompt: "How do I register for my courses this semester and what are the prerequisites?",
    iconName: "BookOpen",
    color: "blue",
  },
  {
    id: "examination",
    title: "Examinations",
    description: "Check exam timetables, venue rules, seating, and examination guidelines.",
    prompt: "Where can I find the upcoming examination timetable and hall regulations?",
    iconName: "FileCheck",
    color: "indigo",
  },
  {
    id: "results",
    title: "Results & Grading",
    description: "Inquire about semester GPA, grade point calculation, and transcript requests.",
    prompt: "How are GPA calculations handled and how do I apply for an official transcript?",
    iconName: "Award",
    color: "purple",
  },
  {
    id: "academic_calendar",
    title: "Academic Calendar",
    description: "Stay updated on semester commencement, revision weeks, and holiday dates.",
    prompt: "What are the key dates on the current semester academic calendar?",
    iconName: "Calendar",
    color: "emerald",
  },
  {
    id: "student_portal",
    title: "Student Portal",
    description: "Resolve login difficulties, password resets, and bio-data verification.",
    prompt: "I am experiencing issues logging into the student portal. How do I reset my credentials?",
    iconName: "Globe",
    color: "sky",
  },
  {
    id: "admission",
    title: "Admissions",
    description: "Learn about clearance procedures, faculty requirements, and matriculation.",
    prompt: "What are the required clearance documents for newly admitted students?",
    iconName: "GraduationCap",
    color: "amber",
  },
  {
    id: "fees",
    title: "Fees & Payments",
    description: "Get verified information on tuition payment schedules and receipt validation.",
    prompt: "How do I generate a payment invoice and verify my school fees receipt?",
    iconName: "CreditCard",
    color: "teal",
  },
  {
    id: "departmental_issue",
    title: "Department Support",
    description: "Connect with course advisors, departmental secretaries, and faculty officers.",
    prompt: "How do I book an appointment with my department course advisor?",
    iconName: "Building2",
    color: "rose",
  },
];

export const TICKET_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const TICKET_STATUSES = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "waiting", label: "Waiting for Student" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

export const FEEDBACK_REASONS = [
  "Incorrect information",
  "Not relevant to my question",
  "Didn't understand my inquiry",
  "Missing detailed procedure",
  "Outdated policy referenced",
];
