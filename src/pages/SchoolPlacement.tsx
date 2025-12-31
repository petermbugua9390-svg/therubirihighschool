import { GraduationCap, School, Users, CheckCircle, AlertCircle, Phone, Mail, Calendar, FileText, MapPin, ArrowRight, BookOpen, HelpCircle, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import HeroSlideshow from "@/components/HeroSlideshow";
import KJSEACalculator from "@/components/KJSEACalculator";

const SchoolPlacement = () => {
  const selectionSteps = [
    {
      step: 1,
      title: "Choose Career Pathway",
      description: "Select from STEM, Arts & Sports Science, or Social Sciences based on your interests and career aspirations."
    },
    {
      step: 2,
      title: "Select Subject Track",
      description: "Within your chosen pathway, select a specific track (e.g., Pure Sciences, Business Studies, Performing Arts)."
    },
    {
      step: 3,
      title: "Pick 12 Preferred Schools",
      description: "Choose 12 senior schools: 7 for first choice pathway, 3 for second choice, and 2 for third choice."
    },
    {
      step: 4,
      title: "School Category Distribution",
      description: "Of the 12 schools: 9 boarding schools (4 in home county, 5 outside) and 3 day schools in home sub-county."
    },
    {
      step: 5,
      title: "Submit Selections",
      description: "Submit your selections through the official portal before the deadline."
    },
    {
      step: 6,
      title: "Await Placement Results",
      description: "Placement is based on KJSEA performance and school availability. Results are sent via SMS."
    }
  ];

  const placementCriteria = [
    {
      title: "Top Performers Priority",
      description: "Top 2 learners per gender in each STEM track per sub-county get first choice of boarding school.",
      icon: Trophy
    },
    {
      title: "Merit-Based Placement",
      description: "Higher KJSEA scores increase chances of placement in preferred schools.",
      icon: GraduationCap
    },
    {
      title: "Diversity Requirement",
      description: "No more than 5 learners from the same junior school can be placed in one boarding institution.",
      icon: Users
    },
    {
      title: "Special Needs Provision",
      description: "Learners with special needs are placed in schools equipped with appropriate facilities and support.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSlideshow
        title="Grade 10 School Placement Guide"
        subtitle="Everything Parents and Learners Need to Know About the CBC Senior School Transition"
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-accent/20 text-accent">Ministry of Education Update</Badge>
            <h2 className="text-4xl font-bold mb-6 text-foreground">Understanding the Grade 10 Placement Process</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The Ministry of Education has implemented a comprehensive digital platform for Grade 9 learners transitioning 
              to Senior School (Grade 10). This system, accessible through <strong>selection.education.go.ke</strong>, 
              allows learners to select their preferred career pathways, subject combinations, and senior schools.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The pioneer cohort of CBC learners joined Grade 10 in January 2026, marking a historic milestone in Kenya's 
              education transformation. The placement process is based on the <strong>Kenya Junior Secondary Education 
              Assessment (KJSEA)</strong> results, which comprehensively evaluate learners' competencies.
            </p>
            
            <Alert className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                The selection portal is for recording learner choices only. Actual placement is handled by the Ministry 
                of Education based on KJSEA performance and school capacity.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* KJSEA Assessment Structure */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center text-foreground">KJSEA Assessment Structure</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            The Kenya Junior Secondary Education Assessment determines learner placement through a comprehensive 
            evaluation system that considers both continuous assessment and summative examinations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="shadow-maroon text-center">
              <CardContent className="pt-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">20%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">KPSEA Scores</h3>
                <p className="text-muted-foreground text-sm">
                  Kenya Primary School Education Assessment results from Grade 6 completion
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon text-center">
              <CardContent className="pt-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-green-600">20%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">School-Based Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  Continuous assessments from Grades 7 and 8 including projects, portfolios, and practical work
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon text-center">
              <CardContent className="pt-8">
                <div className="w-24 h-24 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-accent">60%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Grade 9 Summative Exam</h3>
                <p className="text-muted-foreground text-sm">
                  Final comprehensive examination administered at the end of Grade 9
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto shadow-maroon">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Key Dates for 2025/2026 Placement</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      <strong>October - November 2025:</strong> KJSEA Examinations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      <strong>November 2025:</strong> School Selection Portal Opens
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      <strong>December 2025:</strong> Placement Results Released
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      <strong>January 2026:</strong> Grade 10 Commences
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
        </Card>
        </div>
      </section>

      {/* KJSEA Calculator Tool */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">KJSEA Score Calculator</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Use this tool to estimate your child's KJSEA performance and get placement recommendations 
              based on the official assessment weighting structure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <KJSEACalculator />
          </div>
        </div>
      </section>

      {/* Selection Process Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">How School Selection Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {selectionSteps.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <Card className="flex-1 shadow-maroon">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Placement Criteria */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Placement Criteria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {placementCriteria.map((criteria, index) => (
              <Card key={index} className="shadow-maroon">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <criteria.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{criteria.title}</h3>
                      <p className="text-muted-foreground text-sm">{criteria.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center text-foreground">School Selection Categories</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Learners select a total of 12 schools distributed across different categories to ensure balanced 
            placement options.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-maroon border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <School className="w-6 h-6 text-accent" />
                  Boarding Schools (9 Total)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>4 Schools</strong> within the learner's home county
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>5 Schools</strong> outside the learner's home county
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-maroon border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <School className="w-6 h-6 text-blue-500" />
                  Day Schools (3 Total)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>3 Schools</strong> within the learner's home sub-county or county of residence
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Day schools provide an option for learners who prefer to study from home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Check Results */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">How to Check Placement Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-maroon">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-accent" />
                  Via SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span>Open your phone's messaging app</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span>Type your <strong>KNEC Assessment Number</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span>Send the SMS to <strong>22263</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span>Receive your placement details via SMS</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="shadow-maroon">
              <CardHeader className="bg-blue-500/10">
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-500" />
                  Online Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span>Visit <strong>selection.education.go.ke</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span>Login with your assessment credentials</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span>View your placement results and admission letter</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span>Download and print your admission letter</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grievance Mechanism */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-maroon">
              <CardHeader>
                <CardTitle className="text-2xl">Grievance Redress Mechanism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  The Ministry of Education has established a clear process for addressing placement concerns. If you are 
                  dissatisfied with your placement outcome, follow these steps:
                </p>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <div>
                      <strong className="block">Report to Junior School Headteacher</strong>
                      <span className="text-muted-foreground">Submit your grievance in writing to the headteacher of your Junior Secondary School.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <div>
                      <strong className="block">Escalation to County Director</strong>
                      <span className="text-muted-foreground">The headteacher forwards valid grievances to the County Director of Education.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <div>
                      <strong className="block">Resolution Process</strong>
                      <span className="text-muted-foreground">The County Director reviews the case and facilitates appropriate resolution.</span>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
                <HelpCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions from parents about the CBC transition and Grade 10 placement
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What is the difference between the old 8-4-4 system and the new CBC system?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    The 8-4-4 system consisted of 8 years of primary, 4 years of secondary, and 4 years of university education. 
                    The new CBC (Competency Based Curriculum) follows a 2-6-3-3-3 structure:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>2 years</strong> - Pre-Primary (PP1 & PP2)</li>
                    <li><strong>6 years</strong> - Primary School (Grades 1-6)</li>
                    <li><strong>3 years</strong> - Junior Secondary (Grades 7-9)</li>
                    <li><strong>3 years</strong> - Senior Secondary (Grades 10-12)</li>
                    <li><strong>3 years</strong> - University/TVET</li>
                  </ul>
                  <p className="mt-3">
                    CBC focuses on developing competencies, skills, and practical application rather than just academic knowledge and examinations.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can my child change their career pathway after placement?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    Yes, pathway changes are possible but with some considerations:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Changes are typically allowed within the first term of Grade 10</li>
                    <li>The receiving school must offer the desired pathway</li>
                    <li>Changes require approval from the school principal and parents</li>
                    <li>Learners may need to catch up on subjects specific to the new pathway</li>
                  </ul>
                  <p className="mt-3">
                    It's advisable to carefully consider pathway choices during the selection process to minimize disruptions.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What happens if my child is not placed in any of their 12 preferred schools?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    If a learner is not placed in any of their selected schools, the Ministry of Education will:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Automatically place them in a school within their county that offers their chosen pathway</li>
                    <li>Prioritize schools with available capacity</li>
                    <li>Consider the learner's KJSEA performance</li>
                  </ul>
                  <p className="mt-3">
                    Parents can appeal the placement through the grievance redress mechanism if they are dissatisfied with the automatic placement.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Are there fees for Senior Secondary School under CBC?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    Yes, there are fees but the government provides substantial subsidies:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Day Schools:</strong> Government capitation covers most tuition; parents pay minimal levies for lunch and activities</li>
                    <li><strong>Boarding Schools:</strong> Parents pay boarding fees while government covers tuition subsidy</li>
                    <li><strong>Bursaries:</strong> Available for needy students through the Constituency Development Fund (CDF) and county bursaries</li>
                  </ul>
                  <p className="mt-3">
                    Specific fee structures are communicated by individual schools upon admission.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What subjects will my child study in Senior Secondary School?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    All learners study <strong>7 core subjects</strong> regardless of pathway:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 mb-3">
                    <li>English, Kiswahili, Mathematics</li>
                    <li>Religious Education (CRE/IRE/HRE)</li>
                    <li>Citizenship Education, Life Skills, Sports & Physical Education</li>
                  </ul>
                  <p className="mb-3">
                    Additionally, learners choose <strong>3 subjects</strong> from their selected pathway track:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>STEM:</strong> Physics, Chemistry, Biology, Computer Science, Mathematics, Agriculture, etc.</li>
                    <li><strong>Arts & Sports:</strong> Music, Theatre, Visual Arts, Sports Science, etc.</li>
                    <li><strong>Social Sciences:</strong> History, Geography, Business Studies, Languages, etc.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How is the KJSEA different from the old KCPE examination?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    The Kenya Junior Secondary Education Assessment (KJSEA) differs significantly from KCPE:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Continuous Assessment (40%):</strong> Includes KPSEA scores and school-based assessments from Grades 7-8</li>
                    <li><strong>Summative Exam (60%):</strong> End of Grade 9 examination</li>
                    <li><strong>Competency Focus:</strong> Tests practical skills and application, not just memorization</li>
                    <li><strong>Portfolio Assessment:</strong> Includes projects, practical work, and creative submissions</li>
                  </ul>
                  <p className="mt-3">
                    KJSEA provides a more holistic evaluation of learner abilities compared to the purely exam-based KCPE.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can my child attend a school outside their home county?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    Yes, learners can attend schools outside their home county. The selection structure allows:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>5 boarding schools</strong> outside the home county</li>
                    <li><strong>4 boarding schools</strong> within the home county</li>
                    <li><strong>3 day schools</strong> within the home sub-county</li>
                  </ul>
                  <p className="mt-3">
                    This structure encourages national integration while ensuring learners have options close to home.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What documents are required for Grade 10 admission?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    The following documents are typically required for Grade 10 admission:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Official Admission Letter (downloaded from the portal)</li>
                    <li>Birth Certificate (original and copy)</li>
                    <li>KJSEA Results Slip</li>
                    <li>National Education Management Information System (NEMIS) printout</li>
                    <li>Passport photos (recent)</li>
                    <li>Medical examination report</li>
                    <li>Transfer/Leaving certificate from Junior Secondary School</li>
                    <li>Any special needs documentation (if applicable)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What career opportunities are available after Senior Secondary?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    After Grade 12, learners have multiple pathways based on their Senior School performance:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>University Education:</strong> 3-4 year degree programmes at public and private universities</li>
                    <li><strong>TVET Institutions:</strong> Technical and vocational training for practical careers</li>
                    <li><strong>Apprenticeships:</strong> Direct industry training and certification</li>
                    <li><strong>Entrepreneurship:</strong> Start-up support for business-minded graduates</li>
                  </ul>
                  <p className="mt-3">
                    Each pathway (STEM, Arts & Sports, Social Sciences) opens specific career doors aligned with the subjects studied.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="bg-card rounded-lg shadow-maroon border-none px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How can I support my child during the CBC transition?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-3">
                    Parents can support their children through the CBC transition by:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Understanding the curriculum:</strong> Learn about CBC structure and expectations</li>
                    <li><strong>Supporting pathway choices:</strong> Discuss interests and career aspirations with your child</li>
                    <li><strong>Encouraging practical learning:</strong> Help with projects and portfolio development</li>
                    <li><strong>Attending school meetings:</strong> Stay informed about your child's progress</li>
                    <li><strong>Providing resources:</strong> Ensure access to textbooks, materials, and a conducive study environment</li>
                    <li><strong>Emotional support:</strong> Recognize that transitions can be challenging and offer encouragement</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Rubiri CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Rubiri High School</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The Rubiri High School is fully equipped to receive CBC Grade 10 learners across all three pathways. 
            Our experienced teachers and modern facilities ensure every student thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/cbc"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-maroon hover:shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              Learn About CBC at Rubiri
            </Link>
            <Link 
              to="/admissions"
              className="inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border border-primary-foreground/50 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              View Admission Requirements <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Need Help with School Selection?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            For questions about the school selection process, contact the Ministry of Education support team.
          </p>
          <a 
            href="mailto:selection.basic@education.go.ke"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            <Mail className="w-5 h-5" />
            selection.basic@education.go.ke
          </a>
        </div>
      </section>
    </div>
  );
};

// Add Trophy icon import that was used
const Trophy = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default SchoolPlacement;