import { useState, useEffect } from "react";
import { BookOpen, Download, Search, FileText, GraduationCap, Calculator, Beaker, Globe, BookOpenCheck, Languages, Palette, Music, Dumbbell, Computer, Briefcase, Filter, ChevronDown, Upload, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Material {
  id?: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  formLevel: string;
  downloadUrl: string;
  type: "notes" | "exam" | "revision" | "scheme" | "assignment";
  icon: React.ElementType;
  year?: string;
  isDatabase?: boolean;
  uploadedBy?: string;
}

interface DatabaseMaterial {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  class_level: string | null;
  file_url: string | null;
  file_type: string | null;
  uploaded_by: string | null;
  created_at: string;
}

// Static materials from teacher.co.ke
const staticMaterials: Material[] = [
  // ==================== FORM 1 NOTES ====================
  {
    title: "Form 1 Mathematics Notes",
    description: "Comprehensive mathematics notes covering algebra, geometry, and arithmetic operations",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 1 English Notes",
    description: "English language and literature notes including grammar, comprehension, and essay writing",
    category: "Notes",
    subject: "English",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 1 Kiswahili Notes",
    description: "Kiswahili notes covering grammar, fasihi, and composition skills",
    category: "Notes",
    subject: "Kiswahili",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-kiswahili-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 1 Biology Notes",
    description: "Introduction to biology covering cell biology, classification, and ecology basics",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 1 Chemistry Notes",
    description: "Chemistry fundamentals including matter, atomic structure, and chemical equations",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 1 Physics Notes",
    description: "Physics basics covering measurements, force, and simple machines",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-physics-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 1 History Notes",
    description: "History and government notes covering early civilization and African history",
    category: "Notes",
    subject: "History",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-history-notes/",
    type: "notes",
    icon: BookOpenCheck,
  },
  {
    title: "Form 1 Geography Notes",
    description: "Geography notes covering physical geography, maps, and climate",
    category: "Notes",
    subject: "Geography",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-geography-notes/",
    type: "notes",
    icon: Globe,
  },
  {
    title: "Form 1 CRE Notes",
    description: "Christian Religious Education notes on creation, prophets, and the Bible",
    category: "Notes",
    subject: "CRE",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-cre-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "Form 1 Computer Studies Notes",
    description: "Introduction to computers, hardware, software, and basic operations",
    category: "Notes",
    subject: "Computer Studies",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-computer-studies-notes/",
    type: "notes",
    icon: Computer,
  },
  {
    title: "Form 1 Business Studies Notes",
    description: "Introduction to business concepts, entrepreneurship basics, and economic fundamentals",
    category: "Notes",
    subject: "Business Studies",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-business-studies-notes/",
    type: "notes",
    icon: Briefcase,
  },
  {
    title: "Form 1 Agriculture Notes",
    description: "Agricultural basics covering soil science, crop production, and farm management",
    category: "Notes",
    subject: "Agriculture",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-agriculture-notes/",
    type: "notes",
    icon: Globe,
  },

  // ==================== FORM 2 NOTES ====================
  {
    title: "Form 2 Mathematics Notes",
    description: "Advanced mathematics covering quadratic equations, trigonometry, and statistics",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 2 English Notes",
    description: "Advanced English notes on literary devices, poetry analysis, and formal writing",
    category: "Notes",
    subject: "English",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 2 Kiswahili Notes",
    description: "Advanced Kiswahili covering fasihi simulizi, riwaya, and advanced grammar",
    category: "Notes",
    subject: "Kiswahili",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-kiswahili-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 2 Biology Notes",
    description: "Biology notes covering transport in plants and animals, respiration, and excretion",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 2 Chemistry Notes",
    description: "Chemistry notes on acids, bases, salts, and organic chemistry introduction",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 2 Physics Notes",
    description: "Physics notes covering electricity, magnetism, and waves",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-physics-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 2 History Notes",
    description: "History notes on colonialism, nationalism, and political developments",
    category: "Notes",
    subject: "History",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-history-notes/",
    type: "notes",
    icon: BookOpenCheck,
  },
  {
    title: "Form 2 Geography Notes",
    description: "Geography notes on climate, vegetation, and economic activities",
    category: "Notes",
    subject: "Geography",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-geography-notes/",
    type: "notes",
    icon: Globe,
  },
  {
    title: "Form 2 Business Studies Notes",
    description: "Business studies covering trade, marketing, and basic accounting principles",
    category: "Notes",
    subject: "Business Studies",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-business-studies-notes/",
    type: "notes",
    icon: Briefcase,
  },
  {
    title: "Form 2 CRE Notes",
    description: "CRE notes on the life of Jesus, early church, and Christian ethics",
    category: "Notes",
    subject: "CRE",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-cre-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "Form 2 Computer Studies Notes",
    description: "Word processing, spreadsheets, and introduction to programming",
    category: "Notes",
    subject: "Computer Studies",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-computer-studies-notes/",
    type: "notes",
    icon: Computer,
  },
  {
    title: "Form 2 Agriculture Notes",
    description: "Crop husbandry, livestock production, and farm economics",
    category: "Notes",
    subject: "Agriculture",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-agriculture-notes/",
    type: "notes",
    icon: Globe,
  },

  // ==================== FORM 3 NOTES ====================
  {
    title: "Form 3 Mathematics Notes",
    description: "Mathematics notes covering calculus introduction, vectors, and probability",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 3 English Notes",
    description: "English notes on set books, critical analysis, and advanced composition",
    category: "Notes",
    subject: "English",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 3 Kiswahili Notes",
    description: "Advanced Kiswahili covering tamthilia, ushairi, and insha",
    category: "Notes",
    subject: "Kiswahili",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-kiswahili-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 3 Biology Notes",
    description: "Biology notes on genetics, evolution, and ecology",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 3 Chemistry Notes",
    description: "Chemistry notes on organic chemistry, reaction rates, and electrochemistry",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 3 Physics Notes",
    description: "Physics notes covering thermodynamics, optics, and nuclear physics",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-physics-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 3 History Notes",
    description: "History notes on world wars, independence movements, and modern governments",
    category: "Notes",
    subject: "History",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-history-notes/",
    type: "notes",
    icon: BookOpenCheck,
  },
  {
    title: "Form 3 Geography Notes",
    description: "Geography notes on population, urbanization, and regional studies",
    category: "Notes",
    subject: "Geography",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-geography-notes/",
    type: "notes",
    icon: Globe,
  },
  {
    title: "Form 3 Business Studies Notes",
    description: "Advanced business concepts, financial statements, and business law",
    category: "Notes",
    subject: "Business Studies",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-business-studies-notes/",
    type: "notes",
    icon: Briefcase,
  },
  {
    title: "Form 3 CRE Notes",
    description: "CRE notes on Christian approaches to selected issues and African heritage",
    category: "Notes",
    subject: "CRE",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-cre-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "Form 3 Computer Studies Notes",
    description: "Database management, programming concepts, and system development",
    category: "Notes",
    subject: "Computer Studies",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-computer-studies-notes/",
    type: "notes",
    icon: Computer,
  },
  {
    title: "Form 3 Agriculture Notes",
    description: "Advanced crop production, animal health, and agricultural economics",
    category: "Notes",
    subject: "Agriculture",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-agriculture-notes/",
    type: "notes",
    icon: Globe,
  },

  // ==================== FORM 4 NOTES ====================
  {
    title: "Form 4 Mathematics Notes",
    description: "KCSE preparation mathematics covering all topics for final exams",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 4 English Notes",
    description: "KCSE English preparation including set books and paper analysis",
    category: "Notes",
    subject: "English",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 4 Kiswahili Notes",
    description: "Complete Kiswahili notes for KCSE including all set books",
    category: "Notes",
    subject: "Kiswahili",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-kiswahili-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 4 Biology Notes",
    description: "Complete biology notes for KCSE preparation",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 4 Chemistry Notes",
    description: "Comprehensive chemistry notes for KCSE revision",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 4 Physics Notes",
    description: "Complete physics notes for KCSE preparation",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-physics-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 4 History Notes",
    description: "Complete history and government notes for KCSE",
    category: "Notes",
    subject: "History",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-history-notes/",
    type: "notes",
    icon: BookOpenCheck,
  },
  {
    title: "Form 4 Geography Notes",
    description: "Comprehensive geography notes for KCSE preparation",
    category: "Notes",
    subject: "Geography",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-geography-notes/",
    type: "notes",
    icon: Globe,
  },
  {
    title: "Form 4 Business Studies Notes",
    description: "Complete business studies notes for KCSE examination",
    category: "Notes",
    subject: "Business Studies",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-business-studies-notes/",
    type: "notes",
    icon: Briefcase,
  },
  {
    title: "Form 4 CRE Notes",
    description: "Complete CRE notes for KCSE preparation",
    category: "Notes",
    subject: "CRE",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-cre-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "Form 4 Computer Studies Notes",
    description: "Complete computer studies notes for KCSE",
    category: "Notes",
    subject: "Computer Studies",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-computer-studies-notes/",
    type: "notes",
    icon: Computer,
  },
  {
    title: "Form 4 Agriculture Notes",
    description: "Complete agriculture notes for KCSE examination",
    category: "Notes",
    subject: "Agriculture",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-agriculture-notes/",
    type: "notes",
    icon: Globe,
  },

  // ==================== KCSE PAST PAPERS ====================
  {
    title: "2024 KCSE Past Papers with Marking Schemes",
    description: "Complete 2024 KCSE examination papers with official marking schemes for all subjects",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2024-kcse-past-papers-with-marking-schemes/",
    type: "exam",
    icon: GraduationCap,
    year: "2024",
  },
  {
    title: "2023 KCSE Past Papers",
    description: "2023 KCSE examination papers with marking schemes",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2023-kcse-past-papers/",
    type: "exam",
    icon: GraduationCap,
    year: "2023",
  },

  // ==================== MOCK EXAMINATIONS ====================
  {
    title: "2025 Maranda High School Form 4 Mock",
    description: "Latest 2025 mock examination papers from Maranda High School",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-maranda-high-school-f4-mock-examination/",
    type: "exam",
    icon: GraduationCap,
    year: "2025",
  },
  {
    title: "2025 Alliance High School Mock",
    description: "2025 mock examination papers from Alliance High School",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-alliance-mock-exams/",
    type: "exam",
    icon: GraduationCap,
    year: "2025",
  },
  {
    title: "2024 KCSE County Mocks",
    description: "County mock examinations from various counties across Kenya",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2024-kcse-county-mocks/",
    type: "exam",
    icon: GraduationCap,
    year: "2024",
  },

  // ==================== CBC MATERIALS ====================
  {
    title: "Grade 7 CBC Notes - All Subjects",
    description: "Comprehensive Grade 7 notes aligned with CBC curriculum",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "Grade 7-9",
    downloadUrl: "https://teacher.co.ke/grade-7-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "Grade 8 CBC Notes - All Subjects",
    description: "Complete Grade 8 notes for Junior Secondary curriculum",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "Grade 8",
    downloadUrl: "https://teacher.co.ke/grade-8-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "CBC Primary Notes (Grade 1-6)",
    description: "Primary school notes aligned with CBC curriculum",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "Grade 1-6",
    downloadUrl: "https://teacher.co.ke/cbc-primary-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "PP1-PP2 CBC Resources",
    description: "Pre-primary learning resources and activities for CBC",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "PP1-PP2",
    downloadUrl: "https://teacher.co.ke/pp1-pp2-resources/",
    type: "notes",
    icon: BookOpen,
  },

  // ==================== SCHEMES OF WORK ====================
  {
    title: "Form 1-4 Schemes of Work",
    description: "Complete schemes of work for all subjects Form 1 to Form 4",
    category: "Scheme",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/schemes-of-work/",
    type: "scheme",
    icon: FileText,
  },
  {
    title: "CBC Schemes of Work",
    description: "Schemes of work aligned with Competency Based Curriculum",
    category: "Scheme",
    subject: "All Subjects",
    formLevel: "Grade 1-6",
    downloadUrl: "https://teacher.co.ke/cbc-schemes-of-work/",
    type: "scheme",
    icon: FileText,
  },
  {
    title: "Junior Secondary Schemes of Work",
    description: "Schemes of work for Grade 7-9 Junior Secondary",
    category: "Scheme",
    subject: "All Subjects",
    formLevel: "Grade 7-9",
    downloadUrl: "https://teacher.co.ke/junior-secondary-schemes/",
    type: "scheme",
    icon: FileText,
  },

  // ==================== HOLIDAY ASSIGNMENTS ====================
  {
    title: "Form 1-4 Holiday Assignments",
    description: "Holiday revision assignments for all forms and subjects",
    category: "Assignment",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/holiday-assignments/",
    type: "assignment",
    icon: FileText,
  },
  {
    title: "December Holiday Assignments 2024",
    description: "End of year holiday revision assignments with answers",
    category: "Assignment",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/december-2024-assignments/",
    type: "assignment",
    icon: FileText,
    year: "2024",
  },

  // ==================== TEACHER RESOURCES ====================
  {
    title: "Free Teaching Resources",
    description: "Teaching aids, lesson plans, and classroom resources",
    category: "Notes",
    subject: "Education",
    formLevel: "All Forms",
    downloadUrl: "https://teacher.co.ke/free-teaching-resources/",
    type: "notes",
    icon: GraduationCap,
  },
  {
    title: "KNEC Syllabi",
    description: "Official KNEC syllabi for secondary school subjects",
    category: "Scheme",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/knec-syllabi/",
    type: "scheme",
    icon: FileText,
  },

  // ==================== COLLEGE/TERTIARY ====================
  {
    title: "KNEC Diploma Past Papers",
    description: "KNEC diploma examination past papers for various courses",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "College",
    downloadUrl: "https://teacher.co.ke/knec-diploma-past-papers/",
    type: "exam",
    icon: GraduationCap,
  },
  {
    title: "KASNEB Past Papers",
    description: "KASNEB CPA, ATD, CS past papers with answers",
    category: "Exam",
    subject: "Accounting",
    formLevel: "College",
    downloadUrl: "https://teacher.co.ke/kasneb-past-papers/",
    type: "exam",
    icon: Briefcase,
  },

  // ==================== END OF TERM EXAMS ====================
  {
    title: "Form 1 End of Term Exams",
    description: "End of term examinations with marking schemes for Form 1",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 1",
    downloadUrl: "https://teacher.co.ke/form-1-end-term-exams/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "Form 2 End of Term Exams",
    description: "End of term examinations with marking schemes for Form 2",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-2-end-term-exams/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "Form 3 End of Term Exams",
    description: "End of term examinations with marking schemes for Form 3",
    category: "Exam",
    subject: "All Subjects",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-3-end-term-exams/",
    type: "exam",
    icon: FileText,
  },

  // ==================== REVISION MATERIALS ====================
  {
    title: "KCSE Revision Materials",
    description: "Comprehensive revision materials for KCSE examination preparation",
    category: "Revision",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2020-kcpe-results/",
    type: "revision",
    icon: GraduationCap,
  },
];

const subjectIcons: Record<string, React.ElementType> = {
  "Mathematics": Calculator,
  "English": Languages,
  "Kiswahili": Languages,
  "Biology": Beaker,
  "Chemistry": Beaker,
  "Physics": Beaker,
  "History": BookOpenCheck,
  "Geography": Globe,
  "CRE": BookOpen,
  "Computer Studies": Computer,
  "Business Studies": Briefcase,
  "Agriculture": Globe,
  "Art & Design": Palette,
  "Music": Music,
  "PE": Dumbbell,
  "All Subjects": GraduationCap,
  "Education": GraduationCap,
  "Accounting": Briefcase,
};

const subjectOptions = [
  "Mathematics",
  "English",
  "Kiswahili",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Geography",
  "CRE",
  "Computer Studies",
  "Business Studies",
  "Agriculture",
  "Art & Design",
  "Music",
  "PE",
];

const classLevelOptions = [
  "Form 1",
  "Form 2",
  "Form 3",
  "Form 4",
  "Grade 1-6",
  "Grade 7-9",
  "PP1-PP2",
  "College",
];

const fileTypeOptions = [
  { value: "notes", label: "Notes" },
  { value: "exam", label: "Exam/Past Paper" },
  { value: "revision", label: "Revision Material" },
  { value: "scheme", label: "Scheme of Work" },
  { value: "assignment", label: "Assignment" },
];

const LearningMaterials = () => {
  const { user, role, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [databaseMaterials, setDatabaseMaterials] = useState<DatabaseMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadSubject, setUploadSubject] = useState("");
  const [uploadClassLevel, setUploadClassLevel] = useState("");
  const [uploadFileType, setUploadFileType] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const canUpload = role === "teacher" || role === "staff" || isAdmin;

  // Fetch database materials
  useEffect(() => {
    fetchDatabaseMaterials();
  }, []);

  const fetchDatabaseMaterials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("learning_materials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDatabaseMaterials(data || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Convert database materials to Material format
  const convertedDbMaterials: Material[] = databaseMaterials.map((dbMaterial) => ({
    id: dbMaterial.id,
    title: dbMaterial.title,
    description: dbMaterial.description || "",
    category: dbMaterial.file_type ? fileTypeOptions.find(f => f.value === dbMaterial.file_type)?.label || "Notes" : "Notes",
    subject: dbMaterial.subject || "All Subjects",
    formLevel: dbMaterial.class_level || "All Forms",
    downloadUrl: dbMaterial.file_url || "",
    type: (dbMaterial.file_type as Material["type"]) || "notes",
    icon: subjectIcons[dbMaterial.subject || "All Subjects"] || FileText,
    isDatabase: true,
    uploadedBy: dbMaterial.uploaded_by || undefined,
  }));

  // Combine static and database materials
  const allMaterials = [...convertedDbMaterials, ...staticMaterials];

  const formLevels = ["all", "Form 1", "Form 2", "Form 3", "Form 4", "Form 1-4", "Form 2-3", "Form 2-4", "Grade 7-9", "Grade 8", "Grade 1-6", "PP1-PP2", "College", "All Forms"];
  const subjects = ["all", ...new Set(allMaterials.map(m => m.subject))];
  const years = ["all", "2025", "2024"];

  const filteredMaterials = allMaterials.filter((material) => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesForm = selectedForm === "all" || material.formLevel === selectedForm || material.formLevel === "All Forms" || material.formLevel.includes(selectedForm.replace("Form ", ""));
    const matchesSubject = selectedSubject === "all" || material.subject === selectedSubject;
    const matchesYear = selectedYear === "all" || material.year === selectedYear || !material.year;

    return matchesSearch && matchesForm && matchesSubject && matchesYear;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "notes":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-300";
      case "exam":
        return "bg-red-500/20 text-red-700 dark:text-red-300";
      case "revision":
        return "bg-green-500/20 text-green-700 dark:text-green-300";
      case "scheme":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-300";
      case "assignment":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleDownload = (url: string, title: string, isDatabase?: boolean) => {
    if (isDatabase) {
      // Direct download for database files
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Open the material page in a new tab for teacher.co.ke
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle || !uploadSubject || !uploadClassLevel || !uploadFileType) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to upload materials");
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${uploadFile.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("learning-materials")
        .upload(fileName, uploadFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("learning-materials")
        .getPublicUrl(fileName);

      // Insert record into database
      const { error: dbError } = await supabase
        .from("learning_materials")
        .insert({
          title: uploadTitle,
          description: uploadDescription,
          subject: uploadSubject,
          class_level: uploadClassLevel,
          file_type: uploadFileType,
          file_url: publicUrl,
          uploaded_by: user.id,
        });

      if (dbError) throw dbError;

      toast.success("Material uploaded successfully!");
      setIsUploadOpen(false);
      resetUploadForm();
      fetchDatabaseMaterials();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload material");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;

    try {
      // Get the material to find its file URL
      const material = databaseMaterials.find(m => m.id === materialId);
      if (material?.file_url) {
        // Extract file path from URL and delete from storage
        const urlParts = material.file_url.split('/learning-materials/');
        if (urlParts[1]) {
          await supabase.storage
            .from("learning-materials")
            .remove([urlParts[1]]);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from("learning_materials")
        .delete()
        .eq("id", materialId);

      if (error) throw error;

      toast.success("Material deleted successfully!");
      fetchDatabaseMaterials();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete material");
    }
  };

  const resetUploadForm = () => {
    setUploadTitle("");
    setUploadDescription("");
    setUploadSubject("");
    setUploadClassLevel("");
    setUploadFileType("");
    setUploadFile(null);
  };

  return (
    <main className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Learning <span className="text-accent">Materials</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access {allMaterials.length}+ free downloadable PDF notes, past papers, examinations, and revision materials 
            for Form 1-4 and CBC students. 
            {databaseMaterials.length > 0 && ` Including ${databaseMaterials.length} materials uploaded by our teachers.`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              📚 {allMaterials.filter(m => m.type === "notes").length} Notes
            </Badge>
            <Badge variant="secondary" className="text-sm">
              📝 {allMaterials.filter(m => m.type === "exam").length} Exams
            </Badge>
            <Badge variant="secondary" className="text-sm">
              📖 {allMaterials.filter(m => m.type === "revision").length} Revision
            </Badge>
            <Badge variant="secondary" className="text-sm">
              📋 {allMaterials.filter(m => m.type === "scheme").length} Schemes
            </Badge>
            {databaseMaterials.length > 0 && (
              <Badge variant="default" className="text-sm">
                🏫 {databaseMaterials.length} School Uploads
              </Badge>
            )}
          </div>
        </AnimatedSection>

        {/* Upload Button for Teachers/Admins */}
        {canUpload && (
          <AnimatedSection delay={0.05} className="mb-8">
            <div className="flex justify-center">
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Learning Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Upload Learning Material</DialogTitle>
                    <DialogDescription>
                      Share your educational resources with students. Upload notes, exams, or revision materials.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Form 3 Chemistry Notes - Organic Chemistry"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the content..."
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subject *</Label>
                        <Select value={uploadSubject} onValueChange={setUploadSubject}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Class Level *</Label>
                        <Select value={uploadClassLevel} onValueChange={setUploadClassLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {classLevelOptions.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Material Type *</Label>
                      <Select value={uploadFileType} onValueChange={setUploadFileType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fileTypeOptions.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">File (PDF, DOC, DOCX) *</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      />
                      {uploadFile && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleUpload} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedSection>
        )}

        {/* Search and Filters */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex flex-col gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search materials by title, subject, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={selectedForm}
                      onChange={(e) => setSelectedForm(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      {formLevels.map((form) => (
                        <option key={form} value={form}>
                          {form === "all" ? "All Levels" : form}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject === "all" ? "All Subjects" : subject}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year === "all" ? "All Years" : year}
                        </option>
                      ))}
                    </select>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredMaterials.length} of {allMaterials.length} materials
            </div>
          </div>
        </AnimatedSection>

        {/* Materials Tabs */}
        <AnimatedSection delay={0.2}>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 gap-2 bg-muted p-2 rounded-xl">
              <TabsTrigger value="all" className="rounded-lg">All ({filteredMaterials.length})</TabsTrigger>
              <TabsTrigger value="uploaded" className="rounded-lg">🏫 Uploaded ({filteredMaterials.filter(m => m.isDatabase).length})</TabsTrigger>
              <TabsTrigger value="notes" className="rounded-lg">Notes ({filteredMaterials.filter(m => m.type === "notes").length})</TabsTrigger>
              <TabsTrigger value="exam" className="rounded-lg">Exams ({filteredMaterials.filter(m => m.type === "exam").length})</TabsTrigger>
              <TabsTrigger value="revision" className="rounded-lg">Revision</TabsTrigger>
              <TabsTrigger value="scheme" className="rounded-lg">Schemes</TabsTrigger>
              <TabsTrigger value="assignment" className="rounded-lg">Assignments</TabsTrigger>
            </TabsList>

            {["all", "uploaded", "notes", "exam", "revision", "scheme", "assignment"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaterials
                    .filter((m) => {
                      if (tab === "all") return true;
                      if (tab === "uploaded") return m.isDatabase;
                      return m.type === tab;
                    })
                    .map((material, index) => {
                      const IconComponent = material.icon || subjectIcons[material.subject] || FileText;
                      const canDelete = material.isDatabase && (isAdmin || material.uploadedBy === user?.id);
                      
                      return (
                        <Card 
                          key={material.id || index} 
                          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                <IconComponent className="h-6 w-6 text-accent" />
                              </div>
                              <div className="flex gap-2 flex-wrap justify-end items-start">
                                <Badge className={getTypeColor(material.type)}>
                                  {material.category}
                                </Badge>
                                {material.isDatabase && (
                                  <Badge variant="default" className="text-xs">
                                    🏫 School
                                  </Badge>
                                )}
                                {material.year && (
                                  <Badge variant="outline" className="text-xs">
                                    {material.year}
                                  </Badge>
                                )}
                                {canDelete && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteMaterial(material.id!);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            <CardTitle className="text-lg mt-3 group-hover:text-accent transition-colors">
                              {material.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {material.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                              <span className="flex items-center gap-1">
                                <GraduationCap size={14} />
                                {material.formLevel}
                              </span>
                              <span>{material.subject}</span>
                            </div>
                            <Button 
                              onClick={() => handleDownload(material.downloadUrl, material.title, material.isDatabase)}
                              className="w-full group-hover:bg-accent group-hover:text-accent-foreground"
                              variant="outline"
                            >
                              <Download size={16} className="mr-2" />
                              Download PDF
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>

                {filteredMaterials.filter((m) => {
                  if (tab === "all") return true;
                  if (tab === "uploaded") return m.isDatabase;
                  return m.type === tab;
                }).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No materials found</h3>
                    <p className="text-muted-foreground">
                      {tab === "uploaded" ? "No materials have been uploaded by teachers yet." : "Try adjusting your search or filter criteria"}
                    </p>
                    {tab === "uploaded" && canUpload && (
                      <Button className="mt-4" onClick={() => setIsUploadOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload First Material
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>

        {/* Quick Downloads Section */}
        <AnimatedSection delay={0.3} className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Downloads by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "2024 KCSE Papers", url: "https://teacher.co.ke/2024-kcse-past-papers-with-marking-schemes/", icon: FileText, count: "All Subjects" },
              { title: "Form 1-4 Notes", url: "https://teacher.co.ke/form-1-4-materials-2/", icon: BookOpen, count: "Complete" },
              { title: "2025 Mock Exams", url: "https://teacher.co.ke/2025-maranda-high-school-f4-mock-examination/", icon: GraduationCap, count: "Top Schools" },
              { title: "Teaching Resources", url: "https://teacher.co.ke/free-teaching-resources/", icon: Download, count: "Free" },
            ].map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20">
                  <link.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <span className="font-medium group-hover:text-accent transition-colors block">
                    {link.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{link.count}</span>
                </div>
                <Download className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Source Attribution */}
        <AnimatedSection delay={0.4} className="mt-12">
          <div className="bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 rounded-2xl p-8 text-center border border-accent/30">
            <h3 className="text-2xl font-bold mb-4">
              All Materials Sourced from Teacher.co.ke
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We partner with Teacher.co.ke to bring you thousands of free educational resources. 
              Click any download button to access materials directly from the source.
              {canUpload && " As a teacher, you can also upload your own materials to share with students."}
            </p>
            <Button asChild size="lg">
              <a 
                href="https://teacher.co.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download size={20} />
                Visit Teacher.co.ke for More
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default LearningMaterials;
