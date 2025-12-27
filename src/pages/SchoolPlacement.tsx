import { GraduationCap, School, Users, CheckCircle, AlertCircle, Phone, Mail, Calendar, FileText, MapPin, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import HeroSlideshow from "@/components/HeroSlideshow";

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