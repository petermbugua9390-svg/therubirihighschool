import { 
  GraduationCap, 
  Globe, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Users, 
  Building, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  BookOpen,
  ClipboardList,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const KUCCPS = () => {
  const applicationSteps = [
    {
      step: 1,
      title: "Create an Account",
      description: "Visit the KUCCPS student portal and register using your KCSE index number, year of examination, and a valid email address."
    },
    {
      step: 2,
      title: "Login to Your Account",
      description: "Use your registered credentials to access the student portal. First-time users will need to verify their email."
    },
    {
      step: 3,
      title: "Select Your Programmes",
      description: "Browse available degree, diploma, and certificate programmes. Select up to 6 choices in order of preference."
    },
    {
      step: 4,
      title: "Check Cluster Requirements",
      description: "Ensure you meet the minimum subject requirements and cluster points for your chosen programmes."
    },
    {
      step: 5,
      title: "Submit Application",
      description: "Review your selections carefully and submit your application before the deadline."
    },
    {
      step: 6,
      title: "Await Placement Results",
      description: "Check the portal regularly for placement results. Accept or reject your placement within the stipulated timeframe."
    }
  ];

  const importantLinks = [
    {
      title: "KUCCPS Student Portal",
      url: "https://students.kuccps.net/",
      description: "Main portal for applications and placement"
    },
    {
      title: "KUCCPS Official Website",
      url: "https://www.kuccps.ac.ke/",
      description: "Official information and announcements"
    },
    {
      title: "Career Guidance Portal",
      url: "https://career.kuccps.net/",
      description: "Explore careers and programme requirements"
    },
    {
      title: "Institution Search",
      url: "https://www.kuccps.ac.ke/index.php/institutions",
      description: "Find accredited universities and colleges"
    }
  ];

  const eligibilityCriteria = [
    "Must have sat for KCSE examination",
    "Minimum grade of C+ for degree programmes",
    "Minimum grade of C for diploma programmes",
    "Minimum grade of C- or D+ for certificate programmes",
    "Must meet specific cluster subject requirements",
    "Must apply within the application window"
  ];

  const placementCategories = [
    {
      category: "Degree Programmes",
      minGrade: "C+ and above",
      duration: "4-6 years",
      institutions: "Public and Private Universities"
    },
    {
      category: "Diploma Programmes",
      minGrade: "C plain",
      duration: "2-3 years",
      institutions: "Universities, Polytechnics, TTIs"
    },
    {
      category: "Certificate Programmes",
      minGrade: "C- or D+",
      duration: "1-2 years",
      institutions: "Technical Institutions, Colleges"
    },
    {
      category: "Artisan Programmes",
      minGrade: "D plain",
      duration: "6 months - 1 year",
      institutions: "Vocational Training Centres"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Kenya Universities and Colleges Central Placement Service
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              KUCCPS Placement Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to know about university and college placement in Kenya - 
              from application to admission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="https://students.kuccps.net/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" /> Apply Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="https://career.kuccps.net/" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-4 h-4" /> Career Guidance
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About KUCCPS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is KUCCPS?</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                The <strong className="text-foreground">Kenya Universities and Colleges Central Placement Service (KUCCPS)</strong> 
                is a state corporation established under the Universities Act, 2012. It is mandated to coordinate 
                the placement of government-sponsored students to universities and colleges based on their 
                performance in the Kenya Certificate of Secondary Education (KCSE) examination.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="border-accent/30">
                  <CardContent className="pt-6 text-center">
                    <Building className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Central Coordination</h3>
                    <p className="text-sm text-muted-foreground">
                      Manages placement to over 100 public and private institutions across Kenya
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-accent/30">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Merit-Based Selection</h3>
                    <p className="text-sm text-muted-foreground">
                      Places students based on academic performance and programme requirements
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-accent/30">
                  <CardContent className="pt-6 text-center">
                    <GraduationCap className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Government Sponsorship</h3>
                    <p className="text-sm text-muted-foreground">
                      Facilitates access to government-funded education opportunities
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Links */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Important KUCCPS Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {importantLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full hover:shadow-lg hover:border-accent transition-all duration-300">
                  <CardContent className="pt-6">
                    <Globe className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                    <div className="flex items-center gap-1 text-accent text-sm mt-3 font-medium">
                      Visit <ExternalLink className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Apply for KUCCPS Placement</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these steps to successfully apply for university or college placement through KUCCPS
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicationSteps.map((item) => (
                <Card key={item.step} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg rounded-br-xl">
                    {item.step}
                  </div>
                  <CardContent className="pt-16 pb-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg" className="gap-2">
                <a href="https://students.kuccps.net/" target="_blank" rel="noopener noreferrer">
                  Start Your Application <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Eligibility Criteria</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {eligibilityCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{criteria}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Placement Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Placement Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {placementCategories.map((cat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-accent" />
                      {cat.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Minimum Grade:</span>
                        <span className="font-medium text-foreground">{cat.minGrade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium text-foreground">{cat.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Institutions:</span>
                        <span className="font-medium text-foreground text-right">{cat.institutions}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Key Application Periods</h2>
            <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Application Windows</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span><strong>First Application:</strong> Usually April - May (after KCSE results release)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span><strong>Revision Window:</strong> After initial placement results</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span><strong>Inter-Institution Transfer:</strong> After first semester</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm italic">
                      *Exact dates vary each year. Always check the official KUCCPS website for current deadlines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tips for Successful Application</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-accent" />
                    Research Your Choices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Use the KUCCPS career guidance portal to understand cluster requirements, 
                    cut-off points, and career prospects before selecting programmes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Diversify Your Selections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Choose programmes across different institutions and cut-off ranges 
                    to increase your chances of placement.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Meet Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Submit your application before the deadline. Late applications 
                    are not accepted under any circumstances.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    Verify Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Ensure your personal information and contact details are accurate. 
                    This is crucial for receiving placement notifications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contact KUCCPS</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+254 723 954 927</p>
                  <p className="text-muted-foreground">+254 734 879 662</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">info@kuccps.ac.ke</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">ACK Garden House, 1st Ngong Avenue, Nairobi</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/school-placement">KJSEA Calculator</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/cbc">CBC Resources</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/academics">Academic Programmes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KUCCPS;
