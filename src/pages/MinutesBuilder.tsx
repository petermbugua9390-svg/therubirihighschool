import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LayoutPreview } from "@/components/LayoutPreview";
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Calendar,
  Users,
  MapPin,
  ClipboardList,
  Loader2,
  CheckCircle,
  Clock,
  User,
  FileDown,
  LayoutTemplate,
  Palette,
  FileType
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, Header, Footer, PageNumber, NumberFormat } from "docx";

interface ActionItem {
  task: string;
  responsible: string;
  deadline: string;
  followUp?: string;
}

interface AgendaItem {
  number: string;
  title: string;
  presenter?: string;
  discussion: string;
  decisions: string[];
  actionItems: ActionItem[];
}

interface MatterArising {
  item: string;
  status: string;
  remarks?: string;
}

interface AOBItem {
  topic: string;
  raisedBy?: string;
  discussion?: string;
  outcome?: string;
}

interface NextMeetingInfo {
  date: string;
  time?: string;
  venue?: string;
  tentativeAgenda?: string[];
}

interface AdjournmentInfo {
  time?: string;
  closingRemarks?: string;
  closingPrayer?: string;
  vote_of_thanks?: string;
}

interface MinutesData {
  header: {
    title: string;
    date: string;
    time?: string;
    venue: string;
    attendees: string[];
    absentees?: string[];
    chairperson: string;
    secretary: string;
    quorum?: string;
  };
  callToOrder: string;
  previousMinutes: string;
  mattersArising?: MatterArising[];
  agendaItems: AgendaItem[];
  aob: string | { items: AOBItem[] };
  nextMeeting: string | NextMeetingInfo;
  adjournment: string | AdjournmentInfo;
  signatures?: {
    chairperson?: string;
    secretary?: string;
  };
}

type LayoutType = "corporate" | "academic" | "formal" | "modern" | "minimal" | "legal";

interface LayoutOption {
  id: LayoutType;
  name: string;
  description: string;
  icon: string;
  primaryColor: [number, number, number];
  secondaryColor: [number, number, number];
  accentColor: [number, number, number];
  headerStyle: "centered" | "left" | "boxed";
  useLines: boolean;
  useBorders: boolean;
  fontFamily: string;
}

const layoutOptions: LayoutOption[] = [
  {
    id: "corporate",
    name: "Corporate Professional",
    description: "Clean business layout with blue accents",
    icon: "🏢",
    primaryColor: [0, 82, 155],
    secondaryColor: [51, 51, 51],
    accentColor: [0, 122, 204],
    headerStyle: "centered",
    useLines: true,
    useBorders: true,
    fontFamily: "helvetica"
  },
  {
    id: "academic",
    name: "Academic Institutional",
    description: "Formal academic style with green tones",
    icon: "🎓",
    primaryColor: [0, 100, 0],
    secondaryColor: [34, 34, 34],
    accentColor: [34, 139, 34],
    headerStyle: "boxed",
    useLines: true,
    useBorders: true,
    fontFamily: "times"
  },
  {
    id: "formal",
    name: "Formal Government",
    description: "Official government-style document",
    icon: "🏛️",
    primaryColor: [25, 25, 112],
    secondaryColor: [0, 0, 0],
    accentColor: [70, 70, 150],
    headerStyle: "centered",
    useLines: true,
    useBorders: false,
    fontFamily: "times"
  },
  {
    id: "modern",
    name: "Modern Sleek",
    description: "Contemporary design with purple accents",
    icon: "✨",
    primaryColor: [102, 51, 153],
    secondaryColor: [64, 64, 64],
    accentColor: [138, 43, 226],
    headerStyle: "left",
    useLines: false,
    useBorders: true,
    fontFamily: "helvetica"
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple and distraction-free layout",
    icon: "📄",
    primaryColor: [60, 60, 60],
    secondaryColor: [100, 100, 100],
    accentColor: [80, 80, 80],
    headerStyle: "left",
    useLines: false,
    useBorders: false,
    fontFamily: "helvetica"
  },
  {
    id: "legal",
    name: "Legal Document",
    description: "Numbered paragraphs, formal legal style",
    icon: "⚖️",
    primaryColor: [0, 0, 0],
    secondaryColor: [50, 50, 50],
    accentColor: [100, 100, 100],
    headerStyle: "centered",
    useLines: true,
    useBorders: false,
    fontFamily: "times"
  }
];

interface MeetingTemplate {
  id: string;
  name: string;
  title: string;
  agendas: string;
  icon: string;
}

const meetingTemplates: MeetingTemplate[] = [
  {
    id: "staff-meeting",
    name: "Staff Meeting",
    title: "Staff Meeting",
    icon: "👥",
    agendas: `1. Opening prayer and welcome
2. Confirmation of previous minutes
3. Matters arising from previous minutes
4. Principal's report
5. Academic performance review
6. Departmental reports
7. Student discipline matters
8. Infrastructure and facilities update
9. Staff welfare matters
10. Any Other Business (AOB)
11. Date of next meeting
12. Closing prayer`
  },
  {
    id: "board-meeting",
    name: "Board of Management",
    title: "Board of Management Meeting",
    icon: "🏛️",
    agendas: `1. Opening prayer and introductions
2. Confirmation and adoption of previous minutes
3. Matters arising from previous minutes
4. Chairperson's remarks
5. Principal's comprehensive report
6. Financial report and budget review
7. Infrastructure development projects
8. Academic performance analysis
9. Policy review and adoption
10. Human resource matters
11. Strategic planning
12. Any Other Business (AOB)
13. Date of next meeting
14. Closing remarks and prayer`
  },
  {
    id: "pta-meeting",
    name: "PTA Meeting",
    title: "Parents Teachers Association Meeting",
    icon: "👨‍👩‍👧",
    agendas: `1. Opening prayer and national anthem
2. Welcome address by PTA Chairperson
3. Confirmation of previous minutes
4. Matters arising
5. Principal's report
6. Academic performance update
7. School fees and financial matters
8. School development projects
9. Student welfare and discipline
10. Parent-teacher collaboration
11. Election of new officials (if applicable)
12. Any Other Business (AOB)
13. Vote of thanks
14. Closing prayer`
  },
  {
    id: "departmental-meeting",
    name: "Departmental Meeting",
    title: "Departmental Meeting",
    icon: "📚",
    agendas: `1. Opening and attendance
2. Review of previous minutes
3. Matters arising
4. Syllabus coverage review
5. Student performance analysis
6. Teaching methodologies and resources
7. Examination preparation
8. Remedial programs
9. Co-curricular activities
10. Any Other Business (AOB)
11. Next meeting date`
  },
  {
    id: "student-council",
    name: "Student Council",
    title: "Student Council Meeting",
    icon: "🎓",
    agendas: `1. Opening prayer
2. Confirmation of previous minutes
3. Matters arising
4. President's address
5. Student welfare issues
6. Academic concerns
7. Co-curricular activities planning
8. School events coordination
9. Discipline and conduct
10. Suggestions and recommendations
11. Any Other Business (AOB)
12. Next meeting date`
  },
  {
    id: "emergency-meeting",
    name: "Emergency Meeting",
    title: "Emergency Meeting",
    icon: "🚨",
    agendas: `1. Call to order and declaration of emergency
2. Statement of the emergency situation
3. Review of facts and circumstances
4. Risk assessment
5. Immediate response measures
6. Resource allocation
7. Communication strategy
8. Action plan and timeline
9. Roles and responsibilities assignment
10. Follow-up procedures
11. Adjournment`
  },
  {
    id: "academic-review",
    name: "Academic Review",
    title: "Academic Performance Review Meeting",
    icon: "📊",
    agendas: `1. Opening and attendance
2. Overview of examination results
3. Subject-by-subject analysis
4. Class-by-class performance comparison
5. Top performers recognition
6. Underperforming subjects discussion
7. Contributing factors analysis
8. Improvement strategies
9. Target setting for next term
10. Teacher support and training needs
11. Parental involvement strategies
12. Action plan and timelines
13. Any Other Business
14. Closing`
  },
  {
    id: "discipline-committee",
    name: "Discipline Committee",
    title: "Student Discipline Committee Meeting",
    icon: "⚖️",
    agendas: `1. Opening and introductions
2. Review of previous cases and follow-ups
3. New cases presentation
4. Student hearings (case by case)
5. Evidence review and deliberation
6. Verdict and recommendations
7. Parental notifications
8. Counseling referrals
9. Prevention strategies discussion
10. Policy review recommendations
11. Any Other Business
12. Next meeting date`
  },
  {
    id: "finance-committee",
    name: "Finance Committee",
    title: "Finance Committee Meeting",
    icon: "💰",
    agendas: `1. Opening prayer and welcome
2. Confirmation of previous minutes
3. Matters arising
4. Financial statements review
5. Budget performance analysis
6. Income and expenditure report
7. Outstanding fees collection update
8. Capital projects funding
9. Procurement matters
10. Audit findings (if any)
11. Financial policies review
12. Budget proposals for approval
13. Any Other Business
14. Date of next meeting`
  },
  {
    id: "health-safety",
    name: "Health & Safety",
    title: "Health and Safety Committee Meeting",
    icon: "🏥",
    agendas: `1. Opening and attendance
2. Review of previous minutes
3. Incident reports review
4. Health facility inspection report
5. Safety audit findings
6. First aid and emergency preparedness
7. Sanitation and hygiene update
8. Mental health programs
9. COVID-19/disease prevention measures
10. Fire safety and drills
11. Security assessment
12. Training needs
13. Any Other Business
14. Next meeting date`
  },
  {
    id: "sports-committee",
    name: "Sports Committee",
    title: "Sports and Games Committee Meeting",
    icon: "⚽",
    agendas: `1. Opening prayer
2. Confirmation of previous minutes
3. Matters arising
4. Sports calendar review
5. Team selections and training schedules
6. Equipment and facilities status
7. Inter-school competitions planning
8. Budget allocation for sports
9. Sports day preparations
10. Coaching staff matters
11. Talent identification program
12. Any Other Business
13. Next meeting date`
  },
  {
    id: "clubs-societies",
    name: "Clubs & Societies",
    title: "Clubs and Societies Coordination Meeting",
    icon: "🎭",
    agendas: `1. Opening and roll call
2. Review of previous minutes
3. Club registration and membership update
4. Activity reports from each club
5. Inter-school competitions
6. Funding and resources allocation
7. Events calendar coordination
8. Leadership training
9. Community service projects
10. Awards and recognition
11. Any Other Business
12. Date of next meeting`
  },
  {
    id: "curriculum-meeting",
    name: "Curriculum Meeting",
    title: "Curriculum Review and Development Meeting",
    icon: "📖",
    agendas: `1. Opening and introductions
2. Review of previous minutes
3. Curriculum implementation status
4. CBC/8-4-4 transition progress
5. Teaching resources assessment
6. Professional development needs
7. Assessment and evaluation strategies
8. Technology integration in teaching
9. Special needs education provisions
10. Career guidance integration
11. Recommendations for improvement
12. Any Other Business
13. Action items and timelines`
  },
  {
    id: "welfare-committee",
    name: "Staff Welfare",
    title: "Staff Welfare Committee Meeting",
    icon: "❤️",
    agendas: `1. Opening prayer
2. Review of previous minutes
3. Matters arising
4. Staff welfare fund report
5. Pending welfare cases
6. New welfare requests
7. Staff development programs
8. Work-life balance initiatives
9. Recognition and appreciation programs
10. Grievance handling
11. Team building activities
12. Any Other Business
13. Next meeting date`
  },
  {
    id: "admission-committee",
    name: "Admission Committee",
    title: "Admission Committee Meeting",
    icon: "📝",
    agendas: `1. Opening and attendance
2. Review of previous minutes
3. Admission statistics report
4. Review of pending applications
5. Special admission cases
6. Transfer requests review
7. Capacity assessment
8. Admission criteria review
9. Fee structure for new admissions
10. Documentation requirements
11. Orientation program planning
12. Any Other Business
13. Adjournment`
  },
  {
    id: "infrastructure-committee",
    name: "Infrastructure",
    title: "Infrastructure Development Committee Meeting",
    icon: "🏗️",
    agendas: `1. Opening prayer
2. Review of previous minutes
3. Matters arising
4. Ongoing projects status report
5. Completed projects handover
6. New projects proposals
7. Maintenance schedule review
8. Budget utilization report
9. Contractor performance evaluation
10. Environmental compliance
11. Prioritization of projects
12. Funding strategies
13. Any Other Business
14. Next meeting date`
  },
  {
    id: "exam-committee",
    name: "Examination Committee",
    title: "Examination Committee Meeting",
    icon: "📋",
    agendas: `1. Opening and attendance
2. Review of previous minutes
3. Examination calendar confirmation
4. Invigilation schedule
5. Examination materials preparation
6. Security arrangements
7. Special needs accommodations
8. Marking scheme coordination
9. Results processing timeline
10. Appeals handling procedure
11. Examination malpractice prevention
12. Post-examination review
13. Any Other Business
14. Adjournment`
  },
  {
    id: "guidance-counseling",
    name: "Guidance & Counseling",
    title: "Guidance and Counseling Department Meeting",
    icon: "🧠",
    agendas: `1. Opening prayer
2. Review of previous minutes
3. Counseling cases summary (confidential)
4. Career guidance programs
5. Mentorship program update
6. Peer counseling training
7. Mental health awareness campaigns
8. Substance abuse prevention
9. Academic counseling needs
10. Parent engagement strategies
11. Referral procedures
12. Resource needs
13. Any Other Business
14. Next meeting date`
  },
  {
    id: "ict-committee",
    name: "ICT Committee",
    title: "ICT Committee Meeting",
    icon: "💻",
    agendas: `1. Opening and attendance
2. Review of previous minutes
3. ICT infrastructure status
4. Computer lab utilization report
5. Internet connectivity issues
6. Digital learning implementation
7. Staff ICT training needs
8. Student digital literacy programs
9. Equipment maintenance and upgrades
10. Cybersecurity measures
11. Budget for ICT resources
12. E-learning platforms
13. Any Other Business
14. Next meeting date`
  },
  {
    id: "annual-general",
    name: "Annual General Meeting",
    title: "Annual General Meeting",
    icon: "📅",
    agendas: `1. Opening prayer and national anthem
2. Welcome address
3. Confirmation of previous AGM minutes
4. Matters arising
5. Chairperson's annual report
6. Principal's comprehensive annual report
7. Academic performance summary
8. Financial report and audited accounts
9. Budget approval for new financial year
10. Development projects report
11. Strategic plan review
12. Election of new officials
13. Resolutions and motions
14. Any Other Business
15. Vote of thanks
16. Closing prayer`
  }
];

const MinutesBuilder = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [venue, setVenue] = useState("");
  const [attendees, setAttendees] = useState("");
  const [agendas, setAgendas] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMinutes, setGeneratedMinutes] = useState<MinutesData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("corporate");
  const { toast } = useToast();

  const applyTemplate = (templateId: string) => {
    const template = meetingTemplates.find(t => t.id === templateId);
    if (template) {
      setMeetingTitle(template.title);
      setAgendas(template.agendas);
      setSelectedTemplate(templateId);
      toast({
        title: "Template Applied",
        description: `${template.name} template has been loaded.`,
      });
    }
  };

  const generateMinutes = async () => {
    if (!agendas.trim()) {
      toast({
        title: "Agendas Required",
        description: "Please paste or enter your meeting agendas.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedMinutes(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-minutes", {
        body: {
          agendas,
          meetingTitle,
          meetingDate,
          attendees,
          venue,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedMinutes(data.minutes);
      toast({
        title: "Minutes Generated!",
        description: "Your meeting minutes have been created successfully.",
      });
    } catch (error) {
      console.error("Error generating minutes:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate minutes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper functions to format complex types
  const formatAOB = (aob: string | { items: AOBItem[] }): string => {
    if (typeof aob === 'string') return aob;
    if (aob.items && Array.isArray(aob.items)) {
      return aob.items.map((item, i) => 
        `${i + 1}. ${item.topic}${item.raisedBy ? ` (Raised by: ${item.raisedBy})` : ''}\n   ${item.discussion || ''}\n   Outcome: ${item.outcome || 'Noted'}`
      ).join('\n\n');
    }
    return 'No additional business discussed.';
  };

  const formatNextMeeting = (next: string | NextMeetingInfo): string => {
    if (typeof next === 'string') return next;
    let result = `Date: ${next.date}`;
    if (next.time) result += `\nTime: ${next.time}`;
    if (next.venue) result += `\nVenue: ${next.venue}`;
    if (next.tentativeAgenda && next.tentativeAgenda.length > 0) {
      result += `\n\nTentative Agenda:\n${next.tentativeAgenda.map((a, i) => `  ${i + 1}. ${a}`).join('\n')}`;
    }
    return result;
  };

  const formatAdjournment = (adj: string | AdjournmentInfo): string => {
    if (typeof adj === 'string') return adj;
    let result = '';
    if (adj.time) result += `The meeting was adjourned at ${adj.time}.`;
    if (adj.closingRemarks) result += `\n\n${adj.closingRemarks}`;
    if (adj.vote_of_thanks) result += `\n\nVote of Thanks: ${adj.vote_of_thanks}`;
    if (adj.closingPrayer) result += `\n\nClosing Prayer: ${adj.closingPrayer}`;
    return result || 'The meeting was duly adjourned.';
  };

  const formatMinutesAsText = (): string => {
    if (!generatedMinutes) return "";

    const { header, callToOrder, previousMinutes, mattersArising, agendaItems, aob, nextMeeting, adjournment } = generatedMinutes;

    let text = `
═══════════════════════════════════════════════════════════════
                        MEETING MINUTES
═══════════════════════════════════════════════════════════════

MEETING: ${header.title}
DATE: ${header.date}${header.time ? `\nTIME: ${header.time}` : ''}
VENUE: ${header.venue}
CHAIRPERSON: ${header.chairperson}
SECRETARY: ${header.secretary}
${header.quorum ? `QUORUM: ${header.quorum}` : ''}

ATTENDEES:
${header.attendees.map(a => `  • ${a}`).join("\n")}

${header.absentees?.length ? `APOLOGIES:\n${header.absentees.map(a => `  • ${a}`).join("\n")}\n` : ""}
───────────────────────────────────────────────────────────────

1. CALL TO ORDER
${callToOrder}

2. CONFIRMATION OF PREVIOUS MINUTES
${previousMinutes}

`;

    // Add Matters Arising if present
    if (mattersArising && mattersArising.length > 0) {
      text += `3. MATTERS ARISING FROM PREVIOUS MINUTES
${mattersArising.map((m, i) => `  ${i + 1}. ${m.item}\n     Status: ${m.status}${m.remarks ? `\n     Remarks: ${m.remarks}` : ''}`).join('\n\n')}

`;
    }

    text += `───────────────────────────────────────────────────────────────
                        AGENDA ITEMS
───────────────────────────────────────────────────────────────

`;

    const startNumber = mattersArising && mattersArising.length > 0 ? 4 : 3;
    agendaItems.forEach((item, index) => {
      text += `
${startNumber + index}. ${item.title.toUpperCase()}
${item.presenter ? `Presented by: ${item.presenter}\n` : ''}
Discussion:
${item.discussion}

Decisions:
${item.decisions.map(d => `  ✓ ${d}`).join("\n")}

Action Items:
${item.actionItems.map(a => `  → ${a.task}
    Responsible: ${a.responsible}
    Deadline: ${a.deadline}${a.followUp ? `\n    Follow-up: ${a.followUp}` : ''}`).join("\n\n")}

`;
    });

    text += `
───────────────────────────────────────────────────────────────

ANY OTHER BUSINESS (AOB)
${formatAOB(aob)}

NEXT MEETING
${formatNextMeeting(nextMeeting)}

ADJOURNMENT
${formatAdjournment(adjournment)}

═══════════════════════════════════════════════════════════════
                    END OF MINUTES
═══════════════════════════════════════════════════════════════

_________________________                    _________________________
Chairperson's Signature                      Secretary's Signature

Date: ___________________                    Date: ___________________
`;

    return text;
  };

  const copyToClipboard = () => {
    const text = formatMinutesAsText();
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Minutes copied to clipboard.",
    });
  };

  const downloadMinutes = () => {
    const text = formatMinutesAsText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `minutes-${meetingTitle || "meeting"}-${meetingDate || new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Minutes saved as text file.",
    });
  };

  const downloadAsPDF = () => {
    if (!generatedMinutes) return;

    const layout = layoutOptions.find(l => l.id === selectedLayout) || layoutOptions[0];
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Official document margins (25mm left/right, 25mm top/bottom)
    const leftMargin = 25;
    const rightMargin = 25;
    const topMargin = 25;
    const bottomMargin = 30;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    const lineHeight = 6;
    let yPosition = topMargin;
    let pageNumber = 1;

    const fontFamily = layout.fontFamily as "helvetica" | "times" | "courier";

    const addPageNumber = () => {
      pdf.setFontSize(9);
      pdf.setFont(fontFamily, "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 15, { align: "center" });
    };

    const checkPageBreak = (requiredSpace: number = lineHeight * 2) => {
      if (yPosition > pageHeight - bottomMargin - requiredSpace) {
        addPageNumber();
        pdf.addPage();
        pageNumber++;
        yPosition = topMargin;
        return true;
      }
      return false;
    };

    const addText = (text: string, fontSize: number = 11, isBold: boolean = false, color: [number, number, number] = layout.secondaryColor, indent: number = 0) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, isBold ? "bold" : "normal");
      pdf.setTextColor(color[0], color[1], color[2]);
      
      const lines = pdf.splitTextToSize(text, contentWidth - indent);
      
      lines.forEach((line: string) => {
        checkPageBreak();
        pdf.text(line, leftMargin + indent, yPosition);
        yPosition += lineHeight;
      });
    };

    const addCenteredText = (text: string, fontSize: number = 11, isBold: boolean = false, color: [number, number, number] = layout.secondaryColor) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, isBold ? "bold" : "normal");
      pdf.setTextColor(color[0], color[1], color[2]);
      
      checkPageBreak();
      pdf.text(text, pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight;
    };

    const addSectionHeader = (text: string) => {
      checkPageBreak(lineHeight * 3);
      yPosition += 4;
      pdf.setFontSize(12);
      pdf.setFont(fontFamily, "bold");
      pdf.setTextColor(layout.primaryColor[0], layout.primaryColor[1], layout.primaryColor[2]);
      pdf.text(text, leftMargin, yPosition);
      yPosition += lineHeight + 2;
    };

    const addHorizontalLine = (thick: boolean = false) => {
      checkPageBreak();
      pdf.setDrawColor(layout.primaryColor[0], layout.primaryColor[1], layout.primaryColor[2]);
      pdf.setLineWidth(thick ? 0.8 : 0.3);
      pdf.line(leftMargin, yPosition, pageWidth - rightMargin, yPosition);
      yPosition += 6;
    };

    const addSpace = (space: number = 4) => {
      yPosition += space;
    };

    // === DOCUMENT HEADER ===
    // Top border line
    addHorizontalLine(true);
    addSpace(2);

    // Title section
    addCenteredText("OFFICIAL MEETING MINUTES", 16, true, layout.primaryColor);
    addSpace(2);
    addCenteredText(generatedMinutes.header.title.toUpperCase(), 13, true, layout.accentColor);
    addSpace(4);
    addHorizontalLine(true);
    addSpace(6);

    // Meeting Details Table
    const detailsData = [
      ["Date:", generatedMinutes.header.date + (generatedMinutes.header.time ? ` at ${generatedMinutes.header.time}` : "")],
      ["Venue:", generatedMinutes.header.venue],
      ["Chairperson:", generatedMinutes.header.chairperson],
      ["Secretary:", generatedMinutes.header.secretary],
    ];

    if (generatedMinutes.header.quorum) {
      detailsData.push(["Quorum:", generatedMinutes.header.quorum]);
    }

    detailsData.forEach(([label, value]) => {
      checkPageBreak();
      pdf.setFontSize(11);
      pdf.setFont(fontFamily, "bold");
      pdf.setTextColor(layout.secondaryColor[0], layout.secondaryColor[1], layout.secondaryColor[2]);
      pdf.text(label, leftMargin, yPosition);
      pdf.setFont(fontFamily, "normal");
      pdf.text(value, leftMargin + 35, yPosition);
      yPosition += lineHeight;
    });

    addSpace(4);

    // Attendees section
    addText("PRESENT:", 11, true, layout.primaryColor);
    generatedMinutes.header.attendees.forEach((attendee, i) => {
      addText(`${i + 1}. ${attendee}`, 10, false, layout.secondaryColor, 5);
    });

    // Apologies section
    if (generatedMinutes.header.absentees && generatedMinutes.header.absentees.length > 0) {
      addSpace(4);
      addText("APOLOGIES:", 11, true, layout.primaryColor);
      generatedMinutes.header.absentees.forEach((absentee, i) => {
        addText(`${i + 1}. ${absentee}`, 10, false, layout.secondaryColor, 5);
      });
    }

    addSpace(6);
    addHorizontalLine();

    // === MINUTE SECTIONS ===
    let sectionNumber = 1;

    // Call to Order
    addSectionHeader(`MIN ${sectionNumber}/2025: CALL TO ORDER`);
    sectionNumber++;
    addText(generatedMinutes.callToOrder, 10, false, layout.secondaryColor, 0);
    addSpace(4);

    // Previous Minutes
    addSectionHeader(`MIN ${sectionNumber}/2025: CONFIRMATION OF PREVIOUS MINUTES`);
    sectionNumber++;
    addText(generatedMinutes.previousMinutes, 10, false, layout.secondaryColor, 0);
    addSpace(4);

    // Matters Arising
    if (generatedMinutes.mattersArising && generatedMinutes.mattersArising.length > 0) {
      addSectionHeader(`MIN ${sectionNumber}/2025: MATTERS ARISING`);
      sectionNumber++;
      generatedMinutes.mattersArising.forEach((matter, i) => {
        addText(`${i + 1}. ${matter.item}`, 10, true, layout.secondaryColor, 5);
        addText(`Status: ${matter.status}`, 10, false, layout.accentColor, 10);
        if (matter.remarks) {
          addText(`Remarks: ${matter.remarks}`, 10, false, layout.secondaryColor, 10);
        }
        addSpace(2);
      });
      addSpace(2);
    }

    addHorizontalLine();
    addCenteredText("AGENDA ITEMS", 13, true, layout.primaryColor);
    addSpace(4);

    // Agenda Items
    generatedMinutes.agendaItems.forEach((item, index) => {
      checkPageBreak(40);
      
      addSectionHeader(`MIN ${sectionNumber}/2025: ${item.title.toUpperCase()}`);
      sectionNumber++;

      if (item.presenter) {
        addText(`Presented by: ${item.presenter}`, 10, false, layout.accentColor, 0);
        addSpace(2);
      }

      addText("Discussion:", 10, true, layout.secondaryColor, 0);
      addText(item.discussion, 10, false, layout.secondaryColor, 5);
      addSpace(3);

      if (item.decisions.length > 0) {
        addText("RESOLVED:", 10, true, layout.primaryColor, 0);
        item.decisions.forEach((decision, i) => {
          addText(`${i + 1}. ${decision}`, 10, false, layout.secondaryColor, 5);
        });
        addSpace(2);
      }

      if (item.actionItems.length > 0) {
        addText("ACTION ITEMS:", 10, true, layout.primaryColor, 0);
        item.actionItems.forEach((action, i) => {
          addText(`${i + 1}. ${action.task}`, 10, false, layout.secondaryColor, 5);
          addText(`Responsible: ${action.responsible}`, 9, false, layout.accentColor, 10);
          addText(`Deadline: ${action.deadline}`, 9, false, layout.accentColor, 10);
          if (action.followUp) {
            addText(`Follow-up: ${action.followUp}`, 9, false, layout.accentColor, 10);
          }
          addSpace(2);
        });
      }

      addSpace(4);
    });

    addHorizontalLine();

    // AOB
    addSectionHeader(`MIN ${sectionNumber}/2025: ANY OTHER BUSINESS`);
    sectionNumber++;
    const aobText = formatAOB(generatedMinutes.aob);
    addText(aobText, 10, false, layout.secondaryColor, 0);
    addSpace(4);

    // Next Meeting
    addSectionHeader(`MIN ${sectionNumber}/2025: DATE OF NEXT MEETING`);
    sectionNumber++;
    const nextMeetingText = formatNextMeeting(generatedMinutes.nextMeeting);
    addText(nextMeetingText, 10, false, layout.secondaryColor, 0);
    addSpace(4);

    // Adjournment
    addSectionHeader(`MIN ${sectionNumber}/2025: ADJOURNMENT`);
    const adjournmentText = formatAdjournment(generatedMinutes.adjournment);
    addText(adjournmentText, 10, false, layout.secondaryColor, 0);
    addSpace(8);

    addHorizontalLine(true);
    addCenteredText("END OF MINUTES", 11, true, layout.primaryColor);
    addSpace(10);

    // Signature Section
    checkPageBreak(50);
    addCenteredText("CONFIRMATION OF MINUTES", 12, true, layout.primaryColor);
    addSpace(8);
    addText("These minutes are a true and accurate record of the proceedings.", 10, false, layout.secondaryColor, 0);
    addSpace(15);

    // Signature lines with proper spacing
    const sigStartY = yPosition;
    const sigWidth = 70;
    const sigGap = 20;

    // Chairperson signature
    pdf.setDrawColor(layout.secondaryColor[0], layout.secondaryColor[1], layout.secondaryColor[2]);
    pdf.line(leftMargin, sigStartY, leftMargin + sigWidth, sigStartY);
    pdf.setFontSize(9);
    pdf.setFont(fontFamily, "bold");
    pdf.text("CHAIRPERSON", leftMargin, sigStartY + 5);
    pdf.setFont(fontFamily, "normal");
    pdf.text(`Name: ${generatedMinutes.header.chairperson}`, leftMargin, sigStartY + 10);
    pdf.text("Date: ____________________", leftMargin, sigStartY + 15);

    // Secretary signature
    const secX = leftMargin + sigWidth + sigGap;
    pdf.line(secX, sigStartY, secX + sigWidth, sigStartY);
    pdf.setFont(fontFamily, "bold");
    pdf.text("SECRETARY", secX, sigStartY + 5);
    pdf.setFont(fontFamily, "normal");
    pdf.text(`Name: ${generatedMinutes.header.secretary}`, secX, sigStartY + 10);
    pdf.text("Date: ____________________", secX, sigStartY + 15);

    yPosition = sigStartY + 25;

    // Add final page number
    addPageNumber();

    // Save the PDF
    const fileName = `MINUTES-${(meetingTitle || "Meeting").replace(/\s+/g, "-")}-${meetingDate || new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(fileName);

    toast({
      title: "PDF Downloaded!",
      description: `Official minutes saved with ${layout.name} layout.`,
    });
  };

  const downloadAsWord = async () => {
    if (!generatedMinutes) return;

    try {
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch = 1440 twips
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: generatedMinutes.header.title,
                      size: 20,
                      color: "666666",
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Page ",
                      size: 18,
                    }),
                    new TextRun({
                      children: [PageNumber.CURRENT],
                      size: 18,
                    }),
                    new TextRun({
                      text: " of ",
                      size: 18,
                    }),
                    new TextRun({
                      children: [PageNumber.TOTAL_PAGES],
                      size: 18,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          },
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: "OFFICIAL MEETING MINUTES",
                  bold: true,
                  size: 32,
                  color: "000080",
                }),
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: generatedMinutes.header.title.toUpperCase(),
                  bold: true,
                  size: 26,
                  color: "333333",
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
              border: {
                bottom: { style: BorderStyle.DOUBLE, size: 6, color: "000080" },
              },
            }),

            // Meeting Details
            new Paragraph({
              children: [
                new TextRun({ text: "Date: ", bold: true }),
                new TextRun({ text: generatedMinutes.header.date + (generatedMinutes.header.time ? ` at ${generatedMinutes.header.time}` : "") }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Venue: ", bold: true }),
                new TextRun({ text: generatedMinutes.header.venue }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Chairperson: ", bold: true }),
                new TextRun({ text: generatedMinutes.header.chairperson }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Secretary: ", bold: true }),
                new TextRun({ text: generatedMinutes.header.secretary }),
              ],
              spacing: { after: 200 },
            }),

            // Attendees
            new Paragraph({
              children: [
                new TextRun({ text: "PRESENT:", bold: true, color: "000080" }),
              ],
              spacing: { after: 120 },
            }),
            ...generatedMinutes.header.attendees.map((attendee, i) =>
              new Paragraph({
                children: [new TextRun({ text: `${i + 1}. ${attendee}` })],
                indent: { left: 360 },
                spacing: { after: 80 },
              })
            ),

            // Apologies
            ...(generatedMinutes.header.absentees && generatedMinutes.header.absentees.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({ text: "APOLOGIES:", bold: true, color: "000080" }),
                ],
                spacing: { before: 200, after: 120 },
              }),
              ...generatedMinutes.header.absentees.map((absentee, i) =>
                new Paragraph({
                  children: [new TextRun({ text: `${i + 1}. ${absentee}` })],
                  indent: { left: 360 },
                  spacing: { after: 80 },
                })
              ),
            ] : []),

            // Separator
            new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" } },
              spacing: { before: 300, after: 300 },
            }),

            // Call to Order
            new Paragraph({
              children: [
                new TextRun({ text: "1. CALL TO ORDER", bold: true, size: 24, color: "000080" }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [new TextRun({ text: generatedMinutes.callToOrder })],
              spacing: { after: 200 },
            }),

            // Previous Minutes
            new Paragraph({
              children: [
                new TextRun({ text: "2. CONFIRMATION OF PREVIOUS MINUTES", bold: true, size: 24, color: "000080" }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [new TextRun({ text: generatedMinutes.previousMinutes })],
              spacing: { after: 200 },
            }),

            // Matters Arising
            ...(generatedMinutes.mattersArising && generatedMinutes.mattersArising.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({ text: "3. MATTERS ARISING", bold: true, size: 24, color: "000080" }),
                ],
                spacing: { after: 120 },
              }),
              ...generatedMinutes.mattersArising.flatMap((matter, i) => [
                new Paragraph({
                  children: [new TextRun({ text: `${i + 1}. ${matter.item}`, bold: true })],
                  indent: { left: 360 },
                  spacing: { after: 80 },
                }),
                new Paragraph({
                  children: [new TextRun({ text: `Status: ${matter.status}`, italics: true })],
                  indent: { left: 720 },
                  spacing: { after: 80 },
                }),
              ]),
            ] : []),

            // Agenda Items Header
            new Paragraph({
              children: [
                new TextRun({ text: "AGENDA ITEMS", bold: true, size: 26, color: "000080" }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 300, after: 200 },
              border: {
                top: { style: BorderStyle.SINGLE, size: 6, color: "000080" },
                bottom: { style: BorderStyle.SINGLE, size: 6, color: "000080" },
              },
            }),

            // Agenda Items
            ...generatedMinutes.agendaItems.flatMap((item, index) => {
              const baseNumber = (generatedMinutes.mattersArising && generatedMinutes.mattersArising.length > 0) ? 4 : 3;
              return [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${baseNumber + index}. ${item.title.toUpperCase()}`, bold: true, size: 24, color: "000080" }),
                  ],
                  spacing: { before: 200, after: 120 },
                }),
                ...(item.presenter ? [
                  new Paragraph({
                    children: [new TextRun({ text: `Presented by: ${item.presenter}`, italics: true, color: "666666" })],
                    spacing: { after: 80 },
                  }),
                ] : []),
                new Paragraph({
                  children: [new TextRun({ text: "Discussion:", bold: true })],
                  spacing: { after: 80 },
                }),
                new Paragraph({
                  children: [new TextRun({ text: item.discussion })],
                  spacing: { after: 120 },
                }),
                ...(item.decisions.length > 0 ? [
                  new Paragraph({
                    children: [new TextRun({ text: "RESOLVED:", bold: true, color: "006400" })],
                    spacing: { after: 80 },
                  }),
                  ...item.decisions.map((decision, i) =>
                    new Paragraph({
                      children: [new TextRun({ text: `${i + 1}. ${decision}` })],
                      indent: { left: 360 },
                      spacing: { after: 80 },
                    })
                  ),
                ] : []),
                ...(item.actionItems.length > 0 ? [
                  new Paragraph({
                    children: [new TextRun({ text: "ACTION ITEMS:", bold: true, color: "8B0000" })],
                    spacing: { before: 120, after: 80 },
                  }),
                  ...item.actionItems.flatMap((action, i) => [
                    new Paragraph({
                      children: [new TextRun({ text: `${i + 1}. ${action.task}`, bold: true })],
                      indent: { left: 360 },
                      spacing: { after: 40 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: `Responsible: ${action.responsible}`, size: 20 }),
                        new TextRun({ text: ` | Deadline: ${action.deadline}`, size: 20 }),
                      ],
                      indent: { left: 720 },
                      spacing: { after: 80 },
                    }),
                  ]),
                ] : []),
              ];
            }),

            // Separator
            new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" } },
              spacing: { before: 300, after: 300 },
            }),

            // AOB
            new Paragraph({
              children: [
                new TextRun({ text: "ANY OTHER BUSINESS", bold: true, size: 24, color: "000080" }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [new TextRun({ text: formatAOB(generatedMinutes.aob) })],
              spacing: { after: 200 },
            }),

            // Next Meeting
            new Paragraph({
              children: [
                new TextRun({ text: "DATE OF NEXT MEETING", bold: true, size: 24, color: "000080" }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [new TextRun({ text: formatNextMeeting(generatedMinutes.nextMeeting) })],
              spacing: { after: 200 },
            }),

            // Adjournment
            new Paragraph({
              children: [
                new TextRun({ text: "ADJOURNMENT", bold: true, size: 24, color: "000080" }),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [new TextRun({ text: formatAdjournment(generatedMinutes.adjournment) })],
              spacing: { after: 300 },
            }),

            // End of Minutes
            new Paragraph({
              children: [
                new TextRun({ text: "END OF MINUTES", bold: true, size: 22, color: "000080" }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 400 },
              border: {
                top: { style: BorderStyle.DOUBLE, size: 6, color: "000080" },
                bottom: { style: BorderStyle.DOUBLE, size: 6, color: "000080" },
              },
            }),

            // Confirmation Section
            new Paragraph({
              children: [
                new TextRun({ text: "CONFIRMATION OF MINUTES", bold: true, size: 24, color: "000080" }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "These minutes are a true and accurate record of the proceedings.", italics: true }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // Signature Table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "_".repeat(30) })] }),
                        new Paragraph({ children: [new TextRun({ text: "CHAIRPERSON", bold: true })], spacing: { before: 80 } }),
                        new Paragraph({ children: [new TextRun({ text: `Name: ${generatedMinutes.header.chairperson}` })], spacing: { before: 80 } }),
                        new Paragraph({ children: [new TextRun({ text: "Date: ____________________" })], spacing: { before: 80 } }),
                      ],
                      borders: { top: { size: 0, style: BorderStyle.NONE }, bottom: { size: 0, style: BorderStyle.NONE }, left: { size: 0, style: BorderStyle.NONE }, right: { size: 0, style: BorderStyle.NONE } },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "_".repeat(30) })] }),
                        new Paragraph({ children: [new TextRun({ text: "SECRETARY", bold: true })], spacing: { before: 80 } }),
                        new Paragraph({ children: [new TextRun({ text: `Name: ${generatedMinutes.header.secretary}` })], spacing: { before: 80 } }),
                        new Paragraph({ children: [new TextRun({ text: "Date: ____________________" })], spacing: { before: 80 } }),
                      ],
                      borders: { top: { size: 0, style: BorderStyle.NONE }, bottom: { size: 0, style: BorderStyle.NONE }, left: { size: 0, style: BorderStyle.NONE }, right: { size: 0, style: BorderStyle.NONE } },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MINUTES-${(meetingTitle || "Meeting").replace(/\s+/g, "-")}-${meetingDate || new Date().toISOString().split("T")[0]}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Word Document Downloaded!",
        description: "Official minutes saved as DOCX file.",
      });
    } catch (error) {
      console.error("Error generating Word document:", error);
      toast({
        title: "Download Failed",
        description: "Failed to generate Word document. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Tool
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meeting Minutes Builder
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your meeting agendas into professional, detailed minutes with AI assistance.
              Just paste your agenda items and let AI do the rest.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <AnimatedSection delay={0.1}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    Meeting Details & Agendas
                  </CardTitle>
                  <CardDescription>
                    Choose a template or enter meeting information manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Template Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <LayoutTemplate className="w-4 h-4" />
                      Choose a Template
                    </Label>
                    <Select value={selectedTemplate} onValueChange={applyTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a meeting template..." />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-[300px]">
                          {meetingTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              <span className="flex items-center gap-2">
                                <span>{template.icon}</span>
                                <span>{template.name}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Select a template to auto-fill agenda items, or enter your own below.
                    </p>
                  </div>

                  <Separator />

                  {/* Meeting Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Meeting Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Staff Meeting, Board Meeting, PTA Meeting"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                  </div>

                  {/* Date and Venue */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Venue
                      </Label>
                      <Input
                        id="venue"
                        placeholder="e.g., Conference Room, Main Hall"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Attendees */}
                  <div className="space-y-2">
                    <Label htmlFor="attendees" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Attendees (comma-separated)
                    </Label>
                    <Input
                      id="attendees"
                      placeholder="e.g., John Doe (Chair), Jane Smith, Peter Ochieng"
                      value={attendees}
                      onChange={(e) => setAttendees(e.target.value)}
                    />
                  </div>

                  {/* Agendas */}
                  <div className="space-y-2">
                    <Label htmlFor="agendas" className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4" />
                      Agenda Items *
                    </Label>
                    <Textarea
                      id="agendas"
                      placeholder={`Paste your agenda items here, e.g.:

1. Opening prayer and welcome
2. Confirmation of previous minutes
3. Matters arising
4. Academic performance review
5. Infrastructure development update
6. Student discipline report
7. Budget allocation for next term
8. Any Other Business (AOB)
9. Closing remarks`}
                      value={agendas}
                      onChange={(e) => setAgendas(e.target.value)}
                      className="min-h-[250px] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: The more detailed your agenda items, the better the generated minutes will be.
                    </p>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={generateMinutes}
                    disabled={isGenerating || !agendas.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Minutes...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Minutes with AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Output Section */}
            <AnimatedSection delay={0.2}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Generated Minutes
                      </CardTitle>
                      <CardDescription>
                        Your AI-generated meeting minutes will appear here
                      </CardDescription>
                    </div>
                    {generatedMinutes && (
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadMinutes}>
                          <Download className="w-4 h-4 mr-1" />
                          TXT
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadAsWord}>
                          <FileType className="w-4 h-4 mr-1" />
                          DOCX
                        </Button>
                        <Button variant="default" size="sm" onClick={downloadAsPDF}>
                          <FileDown className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
                      <p className="text-lg font-medium">Generating your minutes...</p>
                      <p className="text-sm">This may take a moment</p>
                    </div>
                  ) : generatedMinutes ? (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        {/* Layout Selection with Previews */}
                        <div className="bg-muted/30 rounded-lg p-4 border">
                          <div className="flex items-center gap-2 mb-3">
                            <Palette className="w-4 h-4 text-primary" />
                            <h4 className="text-sm font-medium">Choose PDF Layout</h4>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {layoutOptions.map((layout) => (
                              <LayoutPreview
                                key={layout.id}
                                layout={layout}
                                isSelected={selectedLayout === layout.id}
                                onClick={() => setSelectedLayout(layout.id)}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">
                            Selected: <span className="font-medium text-foreground">{layoutOptions.find(l => l.id === selectedLayout)?.name}</span>
                          </p>
                        </div>

                        {/* Header */}
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                          <h3 className="text-xl font-bold text-center mb-4">
                            {generatedMinutes.header.title}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Date:</span>
                              <span className="font-medium">{generatedMinutes.header.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Venue:</span>
                              <span className="font-medium">{generatedMinutes.header.venue}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Chair:</span>
                              <span className="font-medium">{generatedMinutes.header.chairperson}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Secretary:</span>
                              <span className="font-medium">{generatedMinutes.header.secretary}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm text-muted-foreground mb-1">Attendees:</p>
                            <div className="flex flex-wrap gap-1">
                              {generatedMinutes.header.attendees.map((attendee, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {attendee}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Call to Order */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">1. Call to Order</h4>
                          <p className="text-sm text-muted-foreground">{generatedMinutes.callToOrder}</p>
                        </div>

                        {/* Previous Minutes */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">2. Confirmation of Previous Minutes</h4>
                          <p className="text-sm text-muted-foreground">{generatedMinutes.previousMinutes}</p>
                        </div>

                        <Separator />

                        {/* Agenda Items */}
                        <div>
                          <h4 className="font-semibold text-primary mb-4">Agenda Items</h4>
                          <div className="space-y-6">
                            {generatedMinutes.agendaItems.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-muted/30 rounded-lg p-4 border"
                              >
                                <h5 className="font-semibold mb-3">
                                  {item.number}. {item.title}
                                </h5>
                                
                                <div className="space-y-3 text-sm">
                                  <div>
                                    <p className="text-muted-foreground font-medium mb-1">Discussion:</p>
                                    <p className="text-foreground">{item.discussion}</p>
                                  </div>

                                  {item.decisions.length > 0 && (
                                    <div>
                                      <p className="text-muted-foreground font-medium mb-1">Decisions:</p>
                                      <ul className="space-y-1">
                                        {item.decisions.map((decision, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{decision}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {item.actionItems.length > 0 && (
                                    <div>
                                      <p className="text-muted-foreground font-medium mb-2">Action Items:</p>
                                      <div className="space-y-2">
                                        {item.actionItems.map((action, i) => (
                                          <div key={i} className="bg-background/50 rounded p-2 border border-primary/10">
                                            <p className="font-medium text-primary">{action.task}</p>
                                            <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                                              <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {action.responsible}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {action.deadline}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* AOB */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Any Other Business</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{formatAOB(generatedMinutes.aob)}</p>
                        </div>

                        {/* Next Meeting */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Next Meeting</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{formatNextMeeting(generatedMinutes.nextMeeting)}</p>
                        </div>

                        {/* Adjournment */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Adjournment</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{formatAdjournment(generatedMinutes.adjournment)}</p>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <FileText className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg font-medium">No minutes generated yet</p>
                      <p className="text-sm text-center max-w-sm mt-2">
                        Choose a template or enter your meeting details and paste your agenda items, then click "Generate Minutes" to create professional meeting minutes.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinutesBuilder;
