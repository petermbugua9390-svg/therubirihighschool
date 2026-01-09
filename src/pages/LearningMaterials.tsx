import { useState } from "react";
import { BookOpen, Download, ExternalLink, Search, FileText, GraduationCap, Calculator, Beaker, Globe, BookOpenCheck, Languages, Palette, Music, Dumbbell, Computer, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Material {
  title: string;
  description: string;
  category: string;
  subject: string;
  formLevel: string;
  externalUrl: string;
  type: "notes" | "exam" | "revision" | "scheme";
  icon: React.ElementType;
}

const materials: Material[] = [
  // Form 1 Materials
  {
    title: "Form 1 Mathematics Notes",
    description: "Comprehensive mathematics notes covering algebra, geometry, and arithmetic operations",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 1 English Notes",
    description: "English language and literature notes including grammar, comprehension, and essay writing",
    category: "Notes",
    subject: "English",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 1 Kiswahili Notes",
    description: "Kiswahili notes covering grammar, fasihi, and composition skills",
    category: "Notes",
    subject: "Kiswahili",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-kiswahili-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 1 Biology Notes",
    description: "Introduction to biology covering cell biology, classification, and ecology basics",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 1 Chemistry Notes",
    description: "Chemistry fundamentals including matter, atomic structure, and chemical equations",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 1 Physics Notes",
    description: "Physics basics covering measurements, force, and simple machines",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-physics-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 1 History Notes",
    description: "History and government notes covering early civilization and African history",
    category: "Notes",
    subject: "History",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-history-notes/",
    type: "notes",
    icon: BookOpenCheck,
  },
  {
    title: "Form 1 Geography Notes",
    description: "Geography notes covering physical geography, maps, and climate",
    category: "Notes",
    subject: "Geography",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-geography-notes/",
    type: "notes",
    icon: Globe,
  },
  {
    title: "Form 1 CRE Notes",
    description: "Christian Religious Education notes on creation, prophets, and the Bible",
    category: "Notes",
    subject: "CRE",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-cre-notes/",
    type: "notes",
    icon: BookOpen,
  },
  {
    title: "Form 1 Computer Studies Notes",
    description: "Introduction to computers, hardware, software, and basic operations",
    category: "Notes",
    subject: "Computer Studies",
    formLevel: "Form 1",
    externalUrl: "https://teacher.co.ke/form-1-computer-studies-notes/",
    type: "notes",
    icon: Computer,
  },

  // Form 2 Materials
  {
    title: "Form 2 Mathematics Notes",
    description: "Advanced mathematics covering quadratic equations, trigonometry, and statistics",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 2 English Notes",
    description: "Advanced English notes on literary devices, poetry analysis, and formal writing",
    category: "Notes",
    subject: "English",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 2 Biology Notes",
    description: "Biology notes covering transport in plants and animals, respiration, and excretion",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 2 Chemistry Notes",
    description: "Chemistry notes on acids, bases, salts, and organic chemistry introduction",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 2 Physics Notes",
    description: "Physics notes covering electricity, magnetism, and waves",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-physics-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 2 History Notes",
    description: "History notes on colonialism, nationalism, and political developments",
    category: "Notes",
    subject: "History",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-history-notes/",
    type: "notes",
    icon: BookOpenCheck,
  },
  {
    title: "Form 2 Geography Notes",
    description: "Geography notes on climate, vegetation, and economic activities",
    category: "Notes",
    subject: "Geography",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-geography-notes/",
    type: "notes",
    icon: Globe,
  },
  {
    title: "Form 2 Business Studies Notes",
    description: "Introduction to business, entrepreneurship, and basic accounting",
    category: "Notes",
    subject: "Business Studies",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/form-2-business-studies-notes/",
    type: "notes",
    icon: Briefcase,
  },

  // Form 3 Materials
  {
    title: "Form 3 Mathematics Notes",
    description: "Mathematics notes covering calculus introduction, vectors, and probability",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 3",
    externalUrl: "https://teacher.co.ke/form-3-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 3 English Notes",
    description: "English notes on set books, critical analysis, and advanced composition",
    category: "Notes",
    subject: "English",
    formLevel: "Form 3",
    externalUrl: "https://teacher.co.ke/form-3-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 3 Biology Notes",
    description: "Biology notes on genetics, evolution, and ecology",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 3",
    externalUrl: "https://teacher.co.ke/form-3-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 3 Chemistry Notes",
    description: "Chemistry notes on organic chemistry, reaction rates, and electrochemistry",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 3",
    externalUrl: "https://teacher.co.ke/form-3-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 3 Physics Notes",
    description: "Physics notes covering thermodynamics, optics, and nuclear physics",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 3",
    externalUrl: "https://teacher.co.ke/form-3-physics-notes/",
    type: "notes",
    icon: Beaker,
  },

  // Form 4 Materials
  {
    title: "Form 4 Mathematics Notes",
    description: "KCSE preparation mathematics covering all topics for final exams",
    category: "Notes",
    subject: "Mathematics",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/form-4-mathematics-notes/",
    type: "notes",
    icon: Calculator,
  },
  {
    title: "Form 4 English Notes",
    description: "KCSE English preparation including set books and paper analysis",
    category: "Notes",
    subject: "English",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/form-4-english-notes/",
    type: "notes",
    icon: Languages,
  },
  {
    title: "Form 4 Biology Notes",
    description: "Complete biology notes for KCSE preparation",
    category: "Notes",
    subject: "Biology",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/form-4-biology-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 4 Chemistry Notes",
    description: "Comprehensive chemistry notes for KCSE revision",
    category: "Notes",
    subject: "Chemistry",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/form-4-chemistry-notes/",
    type: "notes",
    icon: Beaker,
  },
  {
    title: "Form 4 Physics Notes",
    description: "Complete physics notes for KCSE preparation",
    category: "Notes",
    subject: "Physics",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/form-4-physics-notes/",
    type: "notes",
    icon: Beaker,
  },

  // Exams & Past Papers
  {
    title: "2024 KCSE Past Papers with Marking Schemes",
    description: "Complete set of 2024 KCSE examination papers with official marking schemes",
    category: "Past Papers",
    subject: "All Subjects",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/2024-kcse-past-papers-with-marking-schemes/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "2025 Form 2 End Term Exams",
    description: "Form 2 end term examinations with marking schemes for all subjects",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 2",
    externalUrl: "https://teacher.co.ke/2025-end-term-3-form-2-3-exams-plus-marking-scheme-set2/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "2025 Form 3 End Term Exams",
    description: "Form 3 end term examinations with marking schemes for all subjects",
    category: "Exams",
    subject: "All Subjects",
    formLevel: "Form 3",
    externalUrl: "https://teacher.co.ke/2025-end-term-3-form-2-3-4-exams-plus-marking-scheme/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "2025 Form 4 Mock Examinations",
    description: "Mock examination papers from top schools across Kenya",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/2025-maranda-high-school-f4-mock-examination/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "2025 Starehe Girls Mock Exams",
    description: "Starehe Girls Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/2025-starehe-girls-f4-mock-examination/",
    type: "exam",
    icon: FileText,
  },
  {
    title: "2025 Pangani Girls Mock Exams",
    description: "Pangani Girls Form 4 mock examination papers with marking schemes",
    category: "Mocks",
    subject: "All Subjects",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/2025-pangani-girls-f4-mock-examination/",
    type: "exam",
    icon: FileText,
  },

  // Schemes of Work
  {
    title: "Form 1-4 Schemes of Work",
    description: "Complete schemes of work for all subjects from Form 1 to Form 4",
    category: "Schemes",
    subject: "All Subjects",
    formLevel: "All Forms",
    externalUrl: "https://teacher.co.ke/form-1-4-materials-2/",
    type: "scheme",
    icon: BookOpen,
  },

  // Revision Materials
  {
    title: "KCSE Revision Materials",
    description: "Comprehensive revision materials for KCSE examination preparation",
    category: "Revision",
    subject: "All Subjects",
    formLevel: "Form 4",
    externalUrl: "https://teacher.co.ke/2020-kcpe-results/",
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
  "Art & Design": Palette,
  "Music": Music,
  "PE": Dumbbell,
  "All Subjects": GraduationCap,
};

const LearningMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const formLevels = ["all", "Form 1", "Form 2", "Form 3", "Form 4", "All Forms"];
  const subjects = ["all", ...new Set(materials.map(m => m.subject))];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesForm = selectedForm === "all" || material.formLevel === selectedForm || material.formLevel === "All Forms";
    const matchesSubject = selectedSubject === "all" || material.subject === selectedSubject;

    return matchesSearch && matchesForm && matchesSubject;
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
      default:
        return "bg-muted text-muted-foreground";
    }
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
            Access free downloadable PDF notes, past papers, examinations, and revision materials 
            for Form 1-4 students. Resources curated from teacher.co.ke to support your academic journey.
          </p>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search materials by title, subject, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  {formLevels.map((form) => (
                    <option key={form} value={form}>
                      {form === "all" ? "All Forms" : form}
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
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Materials Tabs */}
        <AnimatedSection delay={0.2}>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-muted p-2 rounded-xl">
              <TabsTrigger value="all" className="rounded-lg">All Materials</TabsTrigger>
              <TabsTrigger value="notes" className="rounded-lg">Notes</TabsTrigger>
              <TabsTrigger value="exam" className="rounded-lg">Exams & Papers</TabsTrigger>
              <TabsTrigger value="revision" className="rounded-lg">Revision</TabsTrigger>
              <TabsTrigger value="scheme" className="rounded-lg">Schemes</TabsTrigger>
            </TabsList>

            {["all", "notes", "exam", "revision", "scheme"].map((tab) => (
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
                              <div className="flex gap-2">
                                <Badge className={getTypeColor(material.type)}>
                                  {material.category}
                                </Badge>
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
                              asChild
                              className="w-full group-hover:bg-accent group-hover:text-accent-foreground"
                              variant="outline"
                            >
                              <a 
                                href={material.externalUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                <ExternalLink size={16} />
                                Access Material
                              </a>
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

        {/* External Resource Banner */}
        <AnimatedSection delay={0.3} className="mt-12">
          <div className="bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 rounded-2xl p-8 text-center border border-accent/30">
            <h3 className="text-2xl font-bold mb-4">
              Looking for More Resources?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visit Teacher.co.ke for thousands of free educational resources including 
              notes, past papers, schemes of work, and exam revision materials for all levels.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a 
                  href="https://teacher.co.ke/form-1-4-materials-2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download size={20} />
                  Form 1-4 Materials
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a 
                  href="https://teacher.co.ke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={20} />
                  Visit Teacher.co.ke
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Links Section */}
        <AnimatedSection delay={0.4} className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Access Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "KCSE Past Papers", url: "https://teacher.co.ke/2024-kcse-past-papers-with-marking-schemes/", icon: FileText },
              { title: "Form 1-4 Notes", url: "https://teacher.co.ke/form-1-4-materials-2/", icon: BookOpen },
              { title: "Mock Examinations", url: "https://teacher.co.ke/2025-maranda-high-school-f4-mock-examination/", icon: GraduationCap },
              { title: "Free Teaching Resources", url: "https://teacher.co.ke/free-teaching-resources/", icon: Download },
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
                <span className="font-medium group-hover:text-accent transition-colors">
                  {link.title}
                </span>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-accent" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default LearningMaterials;
