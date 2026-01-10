import { useState } from "react";
import { BookOpen, Download, Search, FileText, GraduationCap, Calculator, Beaker, Globe, BookOpenCheck, Languages, Palette, Music, Dumbbell, Computer, Briefcase, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Material {
  title: string;
  description: string;
  category: string;
  subject: string;
  formLevel: string;
  downloadUrl: string;
  type: "notes" | "exam" | "revision" | "scheme" | "assignment";
  icon: React.ElementType;
  year?: string;
}

const materials: Material[] = [
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
    description: "Complete agriculture notes for KCSE preparation",
    category: "Notes",
    subject: "Agriculture",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-4-agriculture-notes/",
    type: "notes",
    icon: Globe,
  },

  // ==================== 2025 EXAMINATIONS ====================
  {
    title: "2025 End Term 3 Form 2, 3 Exams Set 2",
    description: "Complete end term examinations with marking schemes for Form 2 and 3 - Set 2",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-3",
    downloadUrl: "https://teacher.co.ke/2025-end-term-3-form-2-3-exams-plus-marking-scheme-set2/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 End Term 3 Form 2, 3, 4 Exams Set 1",
    description: "Complete end term examinations with marking schemes for Form 2, 3, and 4",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-4",
    downloadUrl: "https://teacher.co.ke/2025-end-term-3-form-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Term 3 Opener Form 2, 3, 4 Exams",
    description: "Opening term examinations with marking schemes for all forms",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-4",
    downloadUrl: "https://teacher.co.ke/2025-term-3-opener-form-2-3-4-exams-plus-marking-scheme-set-1/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 End Term 2 Form 2, 3, 4 Exams",
    description: "End of term 2 examinations with comprehensive marking schemes",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-4",
    downloadUrl: "https://teacher.co.ke/2025-end-term-2-form-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Mid Term 2 Form 2, 3, 4 Exams",
    description: "Mid-term examinations with marking schemes for revision",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-4",
    downloadUrl: "https://teacher.co.ke/2025-mid-term-2-form-2-3-4-exams-plus-marking-scheme-dup/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Term 2 Opener Form 2, 3, 4 Exams",
    description: "Term 2 opening examinations with marking schemes",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-4",
    downloadUrl: "https://teacher.co.ke/2025-term-2-opener-form-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Term 1 Opener Form 2, 3, 4 Exams",
    description: "Term 1 opening examinations with comprehensive marking schemes",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2-4",
    downloadUrl: "https://teacher.co.ke/2025-term-1-opener-form-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },

  // ==================== 2025 MOCK EXAMINATIONS ====================
  {
    title: "2025 Maranda High School F4 Mock",
    description: "Maranda High School Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-maranda-high-school-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Starehe Girls F4 Mock",
    description: "Starehe Girls Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-starehe-girls-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Pangani Girls F4 Mock",
    description: "Pangani Girls Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-pangani-girls-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Muranga East Joint F4 Mock",
    description: "Muranga East Joint Form 4 mock examination papers",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-muranga-east-joint-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 SULIMO Joint F4 Mock",
    description: "SULIMO Joint Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-sulimo-joint-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Kisii School F4 Mock",
    description: "Kisii School Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-kisii-school-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 Butere Girls F4 Mock",
    description: "Butere Girls Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-butere-girls-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },
  {
    title: "2025 BUKAKA Joint F4 Mock",
    description: "BUKAKA Joint Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2025-bukaka-joint-f4-mock-examination/",
    type: "exam",
    icon: FileText,
    year: "2025",
  },

  // ==================== 2024 EXAMINATIONS ====================
  {
    title: "2024 KCSE Past Papers with Marking Schemes",
    description: "Complete set of 2024 KCSE examination papers with official marking schemes",
    category: "Past Papers",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/2024-kcse-past-papers-with-marking-schemes/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 End Term 3 Set 3 Form 1-4 Exams",
    description: "End term 3 examinations Set 3 with marking schemes for all forms",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-end-term-3-set-3-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 End Term 3 Set 2 Form 1-4 Exams",
    description: "End term 3 examinations Set 2 with marking schemes for all forms",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-end-term-3-set-2-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 End Term 3 Set 1 Form 1-4 Exams",
    description: "End term 3 examinations Set 1 with marking schemes for all forms",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-end-term-3-set-1-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 End Term 2 Form 1-4 Exams",
    description: "End term 2 examinations with marking schemes for all forms",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-end-term-2-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 Mid Term 2 Form 1-4 Exams",
    description: "Mid-term 2 examinations with marking schemes for all forms",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-mid-term-2-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 End Term 1 Set 2 Form 1-4 Exams",
    description: "End term 1 Set 2 examinations with marking schemes",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-end-term-1-set-2-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },
  {
    title: "2024 End Term 1 Set 1 Form 1-4 Exams",
    description: "End term 1 Set 1 examinations with marking schemes",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 1-4",
    downloadUrl: "https://teacher.co.ke/2024-end-term-1-set-1-form-1-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
    year: "2024",
  },

  // ==================== HOLIDAY ASSIGNMENTS ====================
  {
    title: "Form 4 April 2024 Holiday Assignment",
    description: "Form Four holiday assignment for extended April holiday",
    category: "Assignment",
    subject: "All Subjects",
    formLevel: "Form 4",
    downloadUrl: "https://teacher.co.ke/form-four-2024-april-assignment-for-extended-holiday/",
    type: "assignment",
    icon: FileText,
    year: "2024",
  },
  {
    title: "Form 3 April 2024 Holiday Assignment",
    description: "Form Three holiday assignment for extended April holiday",
    category: "Assignment",
    subject: "All Subjects",
    formLevel: "Form 3",
    downloadUrl: "https://teacher.co.ke/form-three-2024-april-assignment-for-extended-holiday/",
    type: "assignment",
    icon: FileText,
    year: "2024",
  },
  {
    title: "Form 2 April 2024 Holiday Assignment",
    description: "Form Two holiday assignment for extended April holiday",
    category: "Assignment",
    subject: "All Subjects",
    formLevel: "Form 2",
    downloadUrl: "https://teacher.co.ke/form-two-2024-april-assignment-for-extended-holiday/",
    type: "assignment",
    icon: FileText,
    year: "2024",
  },

  // ==================== JUNIOR SECONDARY (GRADE 7-9) ====================
  {
    title: "Grade 7-9 Junior Secondary Materials",
    description: "Complete learning materials for Junior Secondary School (JSS) students",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "Grade 7-9",
    downloadUrl: "https://teacher.co.ke/download-grade-7-9-junior-secondary-school-materials/",
    type: "notes",
    icon: GraduationCap,
  },
  {
    title: "Grade 8 Notes - All Subjects",
    description: "Comprehensive Grade 8 notes covering all subjects under CBC curriculum",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "Grade 8",
    downloadUrl: "https://teacher.co.ke/grade-8-notes/",
    type: "notes",
    icon: GraduationCap,
  },
  {
    title: "Grade 8 Examinations Set 22",
    description: "Grade 8 examination papers with marking schemes",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Grade 8",
    downloadUrl: "https://teacher.co.ke/grade-8-set-22-exams/",
    type: "exam",
    icon: FileText,
  },

  // ==================== PRIMARY MATERIALS ====================
  {
    title: "Upper Primary Materials (Grade 1-6)",
    description: "Complete learning materials for upper primary students",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "Grade 1-6",
    downloadUrl: "https://teacher.co.ke/upper-primary-materials/",
    type: "notes",
    icon: GraduationCap,
  },
  {
    title: "Pre-Primary Materials (PP1-PP2)",
    description: "Free pre-primary learning materials for PP1 and PP2",
    category: "Notes",
    subject: "All Subjects",
    formLevel: "PP1-PP2",
    downloadUrl: "https://teacher.co.ke/download-free-pre-primary-1-2-materials-pp1-pp2/",
    type: "notes",
    icon: GraduationCap,
  },

  // ==================== SCHEMES OF WORK ====================
  {
    title: "Form 1-4 Complete Schemes of Work",
    description: "Complete schemes of work for all subjects from Form 1 to Form 4",
    category: "Schemes",
    subject: "All Subjects",
    formLevel: "All Forms",
    downloadUrl: "https://teacher.co.ke/form-1-4-materials-2/",
    type: "scheme",
    icon: BookOpen,
  },

  // ==================== TEACHER RESOURCES ====================
  {
    title: "Free Teaching Resources",
    description: "Collection of free teaching resources, lesson plans, and teaching aids",
    category: "Teaching",
    subject: "All Subjects",
    formLevel: "All Forms",
    downloadUrl: "https://teacher.co.ke/free-teaching-resources/",
    type: "revision",
    icon: GraduationCap,
  },
  {
    title: "Primary Teacher Education (PTE) Notes",
    description: "Study notes and exam revision papers for PTE students",
    category: "College",
    subject: "Education",
    formLevel: "College",
    downloadUrl: "https://teacher.co.ke/primary-teacher-education-study-notes-and-exam-revision-papers/",
    type: "notes",
    icon: GraduationCap,
  },
  {
    title: "KASNEB Resources",
    description: "KASNEB study materials and examination resources",
    category: "College",
    subject: "Accounting",
    formLevel: "College",
    downloadUrl: "https://teacher.co.ke/kuccps/teachers-colleges/kasneb-teachers-colleges/",
    type: "notes",
    icon: Briefcase,
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

const LearningMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formLevels = ["all", "Form 1", "Form 2", "Form 3", "Form 4", "Form 1-4", "Form 2-3", "Form 2-4", "Grade 7-9", "Grade 8", "Grade 1-6", "PP1-PP2", "College", "All Forms"];
  const subjects = ["all", ...new Set(materials.map(m => m.subject))];
  const years = ["all", "2025", "2024"];

  const filteredMaterials = materials.filter((material) => {
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

  const handleDownload = (url: string, title: string) => {
    // Open the material page in a new tab for direct download
    window.open(url, '_blank', 'noopener,noreferrer');
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
            Access {materials.length}+ free downloadable PDF notes, past papers, examinations, and revision materials 
            for Form 1-4 and CBC students. All resources sourced from teacher.co.ke.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              📚 {materials.filter(m => m.type === "notes").length} Notes
            </Badge>
            <Badge variant="secondary" className="text-sm">
              📝 {materials.filter(m => m.type === "exam").length} Exams
            </Badge>
            <Badge variant="secondary" className="text-sm">
              📖 {materials.filter(m => m.type === "revision").length} Revision
            </Badge>
            <Badge variant="secondary" className="text-sm">
              📋 {materials.filter(m => m.type === "scheme").length} Schemes
            </Badge>
          </div>
        </AnimatedSection>

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
              Showing {filteredMaterials.length} of {materials.length} materials
            </div>
          </div>
        </AnimatedSection>

        {/* Materials Tabs */}
        <AnimatedSection delay={0.2}>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2 bg-muted p-2 rounded-xl">
              <TabsTrigger value="all" className="rounded-lg">All ({filteredMaterials.length})</TabsTrigger>
              <TabsTrigger value="notes" className="rounded-lg">Notes ({filteredMaterials.filter(m => m.type === "notes").length})</TabsTrigger>
              <TabsTrigger value="exam" className="rounded-lg">Exams ({filteredMaterials.filter(m => m.type === "exam").length})</TabsTrigger>
              <TabsTrigger value="revision" className="rounded-lg">Revision</TabsTrigger>
              <TabsTrigger value="scheme" className="rounded-lg">Schemes</TabsTrigger>
              <TabsTrigger value="assignment" className="rounded-lg">Assignments</TabsTrigger>
            </TabsList>

            {["all", "notes", "exam", "revision", "scheme", "assignment"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaterials
                    .filter((m) => tab === "all" || m.type === tab)
                    .map((material, index) => {
                      const IconComponent = material.icon || subjectIcons[material.subject] || FileText;
                      return (
                        <Card 
                          key={index} 
                          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                <IconComponent className="h-6 w-6 text-accent" />
                              </div>
                              <div className="flex gap-2 flex-wrap justify-end">
                                <Badge className={getTypeColor(material.type)}>
                                  {material.category}
                                </Badge>
                                {material.year && (
                                  <Badge variant="outline" className="text-xs">
                                    {material.year}
                                  </Badge>
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
                              onClick={() => handleDownload(material.downloadUrl, material.title)}
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

                {filteredMaterials.filter((m) => tab === "all" || m.type === tab).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No materials found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
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
