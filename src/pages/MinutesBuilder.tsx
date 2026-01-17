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
  User
} from "lucide-react";

interface ActionItem {
  task: string;
  responsible: string;
  deadline: string;
}

interface AgendaItem {
  number: string;
  title: string;
  discussion: string;
  decisions: string[];
  actionItems: ActionItem[];
}

interface MinutesData {
  header: {
    title: string;
    date: string;
    venue: string;
    attendees: string[];
    absentees?: string[];
    chairperson: string;
    secretary: string;
  };
  callToOrder: string;
  previousMinutes: string;
  agendaItems: AgendaItem[];
  aob: string;
  nextMeeting: string;
  adjournment: string;
}

const MinutesBuilder = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [venue, setVenue] = useState("");
  const [attendees, setAttendees] = useState("");
  const [agendas, setAgendas] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMinutes, setGeneratedMinutes] = useState<MinutesData | null>(null);
  const { toast } = useToast();

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

  const formatMinutesAsText = (): string => {
    if (!generatedMinutes) return "";

    const { header, callToOrder, previousMinutes, agendaItems, aob, nextMeeting, adjournment } = generatedMinutes;

    let text = `
═══════════════════════════════════════════════════════════════
                        MEETING MINUTES
═══════════════════════════════════════════════════════════════

MEETING: ${header.title}
DATE: ${header.date}
VENUE: ${header.venue}
CHAIRPERSON: ${header.chairperson}
SECRETARY: ${header.secretary}

ATTENDEES:
${header.attendees.map(a => `  • ${a}`).join("\n")}

${header.absentees?.length ? `APOLOGIES:\n${header.absentees.map(a => `  • ${a}`).join("\n")}\n` : ""}
───────────────────────────────────────────────────────────────

1. CALL TO ORDER
${callToOrder}

2. CONFIRMATION OF PREVIOUS MINUTES
${previousMinutes}

───────────────────────────────────────────────────────────────
                        AGENDA ITEMS
───────────────────────────────────────────────────────────────

`;

    agendaItems.forEach((item, index) => {
      text += `
${index + 3}. ${item.title.toUpperCase()}

Discussion:
${item.discussion}

Decisions:
${item.decisions.map(d => `  ✓ ${d}`).join("\n")}

Action Items:
${item.actionItems.map(a => `  → ${a.task}
    Responsible: ${a.responsible}
    Deadline: ${a.deadline}`).join("\n\n")}

`;
    });

    text += `
───────────────────────────────────────────────────────────────

ANY OTHER BUSINESS (AOB)
${aob}

NEXT MEETING
${nextMeeting}

ADJOURNMENT
${adjournment}

═══════════════════════════════════════════════════════════════
                    END OF MINUTES
═══════════════════════════════════════════════════════════════
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
                    Enter meeting information and paste your agenda items
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                  <div className="flex items-center justify-between">
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
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadMinutes}>
                          <Download className="w-4 h-4 mr-1" />
                          Download
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
                          <p className="text-sm text-muted-foreground">{generatedMinutes.aob}</p>
                        </div>

                        {/* Next Meeting */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Next Meeting</h4>
                          <p className="text-sm text-muted-foreground">{generatedMinutes.nextMeeting}</p>
                        </div>

                        {/* Adjournment */}
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Adjournment</h4>
                          <p className="text-sm text-muted-foreground">{generatedMinutes.adjournment}</p>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <FileText className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg font-medium">No minutes generated yet</p>
                      <p className="text-sm text-center max-w-sm mt-2">
                        Enter your meeting details and paste your agenda items, then click "Generate Minutes" to create professional meeting minutes.
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
