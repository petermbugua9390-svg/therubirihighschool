import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, BookOpen, Brain, Plus, X, Sparkles, Download, RefreshCw, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Subject {
  name: string;
  priority: "high" | "medium" | "low";
  hoursNeeded: number;
}

interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  duration: string;
  activity: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const StudyTimetable = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [hoursNeeded, setHoursNeeded] = useState(2);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(4);
  const [examDate, setExamDate] = useState("");
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const addSubject = () => {
    if (!newSubject.trim()) {
      toast({ title: "Please enter a subject name", variant: "destructive" });
      return;
    }
    
    setSubjects([...subjects, { name: newSubject, priority, hoursNeeded }]);
    setNewSubject("");
    setPriority("medium");
    setHoursNeeded(2);
    toast({ title: "Subject added successfully" });
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const generateTimetable = async () => {
    if (subjects.length === 0) {
      toast({ title: "Please add at least one subject", variant: "destructive" });
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Generate a detailed weekly study timetable for a student preparing for exams. 

Subjects and their details:
${subjects.map(s => `- ${s.name}: Priority ${s.priority}, needs ${s.hoursNeeded} hours per week`).join('\n')}

Available study hours per day: ${studyHoursPerDay} hours
${examDate ? `Exam date: ${examDate}` : 'No specific exam date set'}

Please create a structured timetable in JSON format with the following structure:
[
  {"day": "Monday", "time": "4:00 PM - 5:30 PM", "subject": "Mathematics", "duration": "1.5 hours", "activity": "Practice algebra problems"},
  ...
]

Include:
1. Balanced distribution across the week
2. Prioritize high-priority subjects with more slots
3. Include short breaks between sessions
4. Mix difficult and easier subjects throughout the day
5. Include revision sessions for previously covered material
6. Add specific study activities for each slot

Return ONLY the JSON array, no other text.`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-timetable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate timetable");
      }

      const data = await response.json();
      
      if (data.timetable) {
        setTimetable(data.timetable);
        toast({ title: "Timetable generated successfully!" });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating timetable:", error);
      toast({ 
        title: "Failed to generate timetable", 
        description: "Please try again later",
        variant: "destructive" 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const context = `Student's subjects: ${subjects.map(s => s.name).join(', ')}. 
      Study hours per day: ${studyHoursPerDay}. 
      ${examDate ? `Exam date: ${examDate}` : ''}
      ${timetable.length > 0 ? `Current timetable has ${timetable.length} study sessions.` : 'No timetable generated yet.'}`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          context: `Study timetable assistant. ${context}. Help the student with study planning, time management, and revision strategies.`
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantMessage += content;
                  setChatMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last?.role === "assistant") {
                      return prev.map((m, i) => 
                        i === prev.length - 1 ? { ...m, content: assistantMessage } : m
                      );
                    }
                    return [...prev, { role: "assistant", content: assistantMessage }];
                  });
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const downloadTimetable = () => {
    if (timetable.length === 0) return;

    let content = "STUDY TIMETABLE\n";
    content += "================\n\n";

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    days.forEach(day => {
      const dayEntries = timetable.filter(e => e.day === day);
      if (dayEntries.length > 0) {
        content += `${day.toUpperCase()}\n`;
        content += "-".repeat(40) + "\n";
        dayEntries.forEach(entry => {
          content += `${entry.time} - ${entry.subject} (${entry.duration})\n`;
          content += `  Activity: ${entry.activity}\n`;
        });
        content += "\n";
      }
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "study-timetable.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Brain className="w-3 h-3 mr-1" />
                AI-Powered Planning
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Study Timetable Generator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create personalized study schedules with AI assistance to maximize your revision efficiency
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Input Form */}
            <div className="lg:col-span-1 space-y-6">
              <AnimatedSection delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Add Subjects
                    </CardTitle>
                    <CardDescription>
                      Add the subjects you need to study
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject Name</Label>
                      <Input
                        id="subject"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="e.g., Mathematics"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select value={priority} onValueChange={(v: "high" | "medium" | "low") => setPriority(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="hours">Hours Needed per Week</Label>
                      <Input
                        id="hours"
                        type="number"
                        min={1}
                        max={20}
                        value={hoursNeeded}
                        onChange={(e) => setHoursNeeded(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    
                    <Button onClick={addSubject} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subject
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Subject List */}
              {subjects.length > 0 && (
                <AnimatedSection delay={0.2}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Subjects ({subjects.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {subjects.map((subject, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{subject.name}</span>
                              <Badge className={getPriorityColor(subject.priority)}>
                                {subject.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{subject.hoursNeeded}h/week</span>
                              <Button variant="ghost" size="icon" onClick={() => removeSubject(index)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )}

              <AnimatedSection delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Study Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="studyHours">Study Hours per Day</Label>
                      <Input
                        id="studyHours"
                        type="number"
                        min={1}
                        max={12}
                        value={studyHoursPerDay}
                        onChange={(e) => setStudyHoursPerDay(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="examDate">Exam Date (Optional)</Label>
                      <Input
                        id="examDate"
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={generateTimetable} 
                      className="w-full" 
                      disabled={isGenerating || subjects.length === 0}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Timetable
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Middle Column - Timetable Display */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.4}>
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Your Timetable
                      </CardTitle>
                      <CardDescription>
                        AI-generated study schedule
                      </CardDescription>
                    </div>
                    {timetable.length > 0 && (
                      <Button variant="outline" size="sm" onClick={downloadTimetable}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {timetable.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Add subjects and generate your timetable</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
                          const dayEntries = timetable.filter(e => e.day === day);
                          if (dayEntries.length === 0) return null;
                          
                          return (
                            <div key={day}>
                              <h3 className="font-semibold text-primary mb-2">{day}</h3>
                              <div className="space-y-2">
                                {dayEntries.map((entry, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-3 rounded-lg bg-muted/50 border border-border"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <span className="font-medium">{entry.subject}</span>
                                        <p className="text-sm text-muted-foreground">{entry.activity}</p>
                                      </div>
                                      <div className="text-right text-sm">
                                        <p className="text-primary">{entry.time}</p>
                                        <p className="text-muted-foreground">{entry.duration}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Right Column - AI Assistant */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.5}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      AI Study Assistant
                    </CardTitle>
                    <CardDescription>
                      Ask questions about study strategies, time management, or get help with your timetable
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto mb-4 pr-2">
                      {chatMessages.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="mb-4">Ask me anything about:</p>
                          <div className="space-y-2 text-sm">
                            <p>• Study techniques and strategies</p>
                            <p>• Time management tips</p>
                            <p>• How to improve your timetable</p>
                            <p>• Subject-specific revision advice</p>
                          </div>
                        </div>
                      ) : (
                        chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground ml-8"
                                : "bg-muted mr-8"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        ))
                      )}
                      {isChatLoading && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about study strategies..."
                        className="resize-none"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendChatMessage();
                          }
                        }}
                      />
                      <Button 
                        onClick={sendChatMessage} 
                        disabled={isChatLoading || !chatInput.trim()}
                        size="icon"
                        className="h-auto"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimetable;
