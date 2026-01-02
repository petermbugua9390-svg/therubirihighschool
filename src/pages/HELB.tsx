import { 
  Banknote, 
  Globe, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Users, 
  GraduationCap,
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  BookOpen,
  ClipboardList,
  AlertCircle,
  ExternalLink,
  CreditCard,
  Clock,
  Shield,
  HelpCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HELB = () => {
  const loanTypes = [
    {
      title: "Undergraduate Loan",
      amount: "Up to KES 60,000 per year",
      eligibility: "Students in public and private universities",
      description: "Covers tuition, accommodation, books, and upkeep for degree students."
    },
    {
      title: "TVET Loan",
      amount: "Up to KES 50,000 per year",
      eligibility: "Students in polytechnics and technical colleges",
      description: "Financial support for diploma and certificate students in technical institutions."
    },
    {
      title: "Postgraduate Loan",
      amount: "Up to KES 100,000 per year",
      eligibility: "Masters and PhD students",
      description: "Supports advanced studies for students pursuing postgraduate degrees."
    },
    {
      title: "Afya Elimu Fund",
      amount: "Varies based on programme",
      eligibility: "Medical and health science students",
      description: "Special funding for students pursuing medical and health-related courses."
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Create HELB Account",
      description: "Visit the HELB portal and register using your national ID, KCSE index number, and valid email address."
    },
    {
      step: 2,
      title: "Complete Personal Details",
      description: "Fill in your personal information, family background, and financial status accurately."
    },
    {
      step: 3,
      title: "Upload Required Documents",
      description: "Submit scanned copies of your ID, KCSE certificate, admission letter, and parents/guardian documents."
    },
    {
      step: 4,
      title: "Means Testing Assessment",
      description: "HELB evaluates your financial need based on family income and other factors to determine loan amount."
    },
    {
      step: 5,
      title: "Loan Processing",
      description: "Wait for your application to be reviewed. You can track status through the portal."
    },
    {
      step: 6,
      title: "Sign Loan Agreement",
      description: "Once approved, digitally sign the loan agreement form to confirm acceptance of terms."
    }
  ];

  const importantLinks = [
    {
      title: "HELB Student Portal",
      url: "https://www.helb.co.ke/",
      description: "Main portal for loan applications"
    },
    {
      title: "Loan Application",
      url: "https://studentportal.helb.co.ke/",
      description: "Apply for new loans online"
    },
    {
      title: "Loan Repayment",
      url: "https://www.helb.co.ke/loan-repayment/",
      description: "Check balance and make payments"
    },
    {
      title: "Bursary Application",
      url: "https://www.helb.co.ke/scholarships-bursaries/",
      description: "Apply for bursaries and scholarships"
    }
  ];

  const eligibilityRequirements = [
    "Must be a Kenyan citizen with a valid National ID",
    "Must have a KCSE certificate with minimum university entry grade",
    "Must have a valid admission letter from a recognized institution",
    "First-time applicants must apply within the first year of study",
    "Must not be a beneficiary of any other government scholarship",
    "Must demonstrate financial need through means testing"
  ];

  const requiredDocuments = [
    { doc: "National ID", description: "Copy of your national identity card (both sides)" },
    { doc: "KCSE Certificate", description: "Original KCSE result slip or certificate" },
    { doc: "Admission Letter", description: "Official admission letter from your institution" },
    { doc: "Passport Photo", description: "Recent passport-size photograph" },
    { doc: "Parent/Guardian ID", description: "Copy of parent or guardian national ID" },
    { doc: "Death Certificate", description: "If orphaned, provide parents death certificates" },
    { doc: "Fee Structure", description: "Current academic year fee structure" },
    { doc: "School ID", description: "Copy of your student identification card" }
  ];

  const repaymentInfo = [
    {
      title: "Grace Period",
      icon: Clock,
      description: "One year grace period after completing studies before repayment begins."
    },
    {
      title: "Interest Rate",
      icon: Banknote,
      description: "4% annual interest rate on the outstanding loan balance."
    },
    {
      title: "Monthly Deductions",
      icon: CreditCard,
      description: "Automatic salary deductions for employed beneficiaries."
    },
    {
      title: "Flexible Payments",
      icon: Shield,
      description: "Multiple payment options including M-Pesa, bank, and Lipa Na HELB."
    }
  ];

  const bursaryTypes = [
    {
      name: "HELB Bursary",
      target: "Needy undergraduate students",
      amount: "Up to KES 30,000"
    },
    {
      name: "Constituency Bursary (NG-CDF)",
      target: "Students from specific constituencies",
      amount: "Varies by constituency"
    },
    {
      name: "County Bursary",
      target: "Students from specific counties",
      amount: "Varies by county government"
    },
    {
      name: "Presidential Scholarship",
      target: "Orphaned and vulnerable students",
      amount: "Full tuition coverage"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Banknote className="w-4 h-4" />
              Higher Education Loans Board
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              HELB Loans &amp; Bursaries Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your complete guide to accessing student loans, bursaries, and financial aid 
              for higher education in Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="https://studentportal.helb.co.ke/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" /> Apply for Loan
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="https://www.helb.co.ke/loan-repayment/" target="_blank" rel="noopener noreferrer">
                  <CreditCard className="w-4 h-4" /> Loan Repayment
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About HELB */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is HELB?</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                The <strong className="text-foreground">Higher Education Loans Board (HELB)</strong> is 
                a state corporation established in 1995 under the HELB Act. It is mandated to source 
                funds and provide loans, scholarships, and bursaries to Kenyan students pursuing 
                higher education in recognized institutions.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="border-accent/30">
                  <CardContent className="pt-6 text-center">
                    <Banknote className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Student Loans</h3>
                    <p className="text-sm text-muted-foreground">
                      Affordable loans with low interest rates for university and college students
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-accent/30">
                  <CardContent className="pt-6 text-center">
                    <GraduationCap className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Scholarships</h3>
                    <p className="text-sm text-muted-foreground">
                      Merit-based scholarships for exceptional students in various fields
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-accent/30">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Bursaries</h3>
                    <p className="text-sm text-muted-foreground">
                      Financial assistance for needy students based on economic status
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Types of HELB Loans</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-accent" />
                    {loan.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-accent">{loan.amount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{loan.description}</p>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded">
                      <strong>Eligibility:</strong> {loan.eligibility}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Important HELB Links</h2>
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Apply for HELB Loan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these steps to successfully apply for a HELB student loan
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
                <a href="https://studentportal.helb.co.ke/" target="_blank" rel="noopener noreferrer">
                  Start Your Application <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Required Documents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {requiredDocuments.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground">{item.doc}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Eligibility Requirements</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {eligibilityRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Repayment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Loan Repayment Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {repaymentInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <info.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Important Repayment Notice</h3>
                    <p className="text-muted-foreground">
                      Loan repayment is mandatory after the one-year grace period. Defaulting on HELB 
                      loan repayment can result in listing with Credit Reference Bureaus (CRB), affecting 
                      your credit score and ability to access financial services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bursaries */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Available Bursaries</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {bursaryTypes.map((bursary, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-accent" />
                      {bursary.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target Group:</span>
                        <span className="font-medium text-foreground text-right">{bursary.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium text-accent">{bursary.amount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">When should I apply for HELB?</h3>
                      <p className="text-muted-foreground text-sm">
                        First-year students should apply immediately after receiving their admission letter, 
                        preferably before the deadline announced by HELB (usually around April-June each year).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Can I apply if I am in a private university?</h3>
                      <p className="text-muted-foreground text-sm">
                        Yes, HELB provides loans to students in both public and private universities and colleges 
                        that are recognized by the Commission for University Education (CUE).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">How is the loan amount determined?</h3>
                      <p className="text-muted-foreground text-sm">
                        HELB uses a means testing process that considers your family income, number of dependents, 
                        and other socio-economic factors to determine your loan amount.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Can I apply for both loan and bursary?</h3>
                      <p className="text-muted-foreground text-sm">
                        Yes, you can apply for a HELB loan and separately apply for bursaries from NG-CDF, 
                        county governments, or other organizations. These are not mutually exclusive.
                      </p>
                    </div>
                  </div>
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
            <h2 className="text-3xl font-bold mb-8">Contact HELB</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">0711 052 000</p>
                  <p className="text-muted-foreground">+254 20 2278000</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">info@helb.co.ke</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Anniversary Towers, University Way, Nairobi</p>
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
                <Link to="/kuccps">KUCCPS Guide</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/school-placement">KJSEA Calculator</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/cbc">CBC Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HELB;
