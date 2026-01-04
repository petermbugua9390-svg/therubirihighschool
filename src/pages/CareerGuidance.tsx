import { AnimatedSection, StaggeredContainer, StaggeredItem } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  GraduationCap, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen,
  Building2,
  Stethoscope,
  Scale,
  Calculator,
  Palette,
  Cpu,
  Plane,
  Heart,
  Megaphone,
  Wrench,
  Leaf,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  FileText,
  MessageCircle,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CareerGuidance = () => {
  const careerClusters = [
    {
      icon: Stethoscope,
      title: "Health Sciences",
      description: "Medicine, Nursing, Pharmacy, Public Health, Laboratory Technology",
      subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
      careers: ["Doctor", "Nurse", "Pharmacist", "Lab Technician", "Dentist", "Physiotherapist"],
      universities: ["University of Nairobi", "Moi University", "JKUAT", "Kenyatta University"],
      salary: "KSh 80,000 - 500,000+/month"
    },
    {
      icon: Scale,
      title: "Law & Governance",
      description: "Legal Practice, Public Administration, Diplomacy, Human Rights",
      subjects: ["History", "English", "CRE/IRE", "Kiswahili"],
      careers: ["Lawyer", "Judge", "Diplomat", "Policy Analyst", "Human Rights Officer"],
      universities: ["University of Nairobi", "Strathmore", "Moi University", "KU"],
      salary: "KSh 60,000 - 400,000+/month"
    },
    {
      icon: Calculator,
      title: "Business & Finance",
      description: "Accounting, Banking, Economics, Entrepreneurship, Management",
      subjects: ["Mathematics", "Business Studies", "Economics", "Computer Studies"],
      careers: ["Accountant", "Banker", "Financial Analyst", "Entrepreneur", "HR Manager"],
      universities: ["Strathmore", "USIU", "University of Nairobi", "KCA University"],
      salary: "KSh 50,000 - 350,000+/month"
    },
    {
      icon: Cpu,
      title: "Technology & Engineering",
      description: "Software Development, Engineering, Data Science, Cybersecurity",
      subjects: ["Mathematics", "Physics", "Computer Studies", "Chemistry"],
      careers: ["Software Developer", "Data Scientist", "Engineer", "IT Manager", "Cybersecurity Analyst"],
      universities: ["JKUAT", "Technical University of Kenya", "Strathmore", "Dedan Kimathi"],
      salary: "KSh 70,000 - 500,000+/month"
    },
    {
      icon: Palette,
      title: "Arts & Creative Industries",
      description: "Design, Media, Entertainment, Fashion, Architecture",
      subjects: ["Art & Design", "English", "Music", "Drama"],
      careers: ["Graphic Designer", "Architect", "Film Director", "Fashion Designer", "Musician"],
      universities: ["University of Nairobi", "Kenyatta University", "Buruburu Institute"],
      salary: "KSh 40,000 - 300,000+/month"
    },
    {
      icon: Building2,
      title: "Education & Training",
      description: "Teaching, Educational Administration, Curriculum Development",
      subjects: ["Any Strong Subjects", "Education Psychology", "Communication Skills"],
      careers: ["Teacher", "Lecturer", "Education Officer", "Curriculum Developer", "School Principal"],
      universities: ["Kenyatta University", "Moi University", "University of Nairobi", "Maseno"],
      salary: "KSh 35,000 - 200,000+/month"
    },
    {
      icon: Leaf,
      title: "Agriculture & Environment",
      description: "Agribusiness, Environmental Science, Forestry, Veterinary Medicine",
      subjects: ["Biology", "Chemistry", "Agriculture", "Geography"],
      careers: ["Agronomist", "Vet Doctor", "Environmental Scientist", "Food Scientist", "Farmer"],
      universities: ["Egerton University", "University of Nairobi", "JKUAT", "Chuka University"],
      salary: "KSh 45,000 - 250,000+/month"
    },
    {
      icon: Plane,
      title: "Hospitality & Tourism",
      description: "Hotel Management, Tourism, Event Planning, Culinary Arts",
      subjects: ["Geography", "Business Studies", "Languages", "Home Science"],
      careers: ["Hotel Manager", "Tour Guide", "Event Planner", "Chef", "Airline Crew"],
      universities: ["Kenya Utalii College", "Strathmore", "Moi University"],
      salary: "KSh 35,000 - 200,000+/month"
    }
  ];

  const careerPlanningSteps = [
    {
      step: 1,
      title: "Self-Assessment",
      description: "Understand your interests, values, skills, and personality traits",
      activities: [
        "Take career aptitude tests",
        "Identify your strongest subjects",
        "List activities you enjoy",
        "Consider your work preferences (indoors/outdoors, team/solo)",
        "Reflect on what motivates you"
      ]
    },
    {
      step: 2,
      title: "Career Exploration",
      description: "Research different careers and industries",
      activities: [
        "Read about various professions",
        "Interview professionals in fields of interest",
        "Attend career fairs and workshops",
        "Job shadow or intern during holidays",
        "Watch career documentaries and videos"
      ]
    },
    {
      step: 3,
      title: "Goal Setting",
      description: "Define clear short-term and long-term career goals",
      activities: [
        "Set SMART career goals",
        "Create a vision board",
        "Write a personal mission statement",
        "Identify milestone achievements",
        "Plan your educational pathway"
      ]
    },
    {
      step: 4,
      title: "Skill Development",
      description: "Build the skills and qualifications needed for your chosen career",
      activities: [
        "Focus on relevant subjects",
        "Join clubs and societies",
        "Develop soft skills",
        "Pursue online certifications",
        "Volunteer and gain experience"
      ]
    },
    {
      step: 5,
      title: "Action & Adaptation",
      description: "Take concrete steps and adjust your plan as needed",
      activities: [
        "Apply to universities/colleges",
        "Seek mentorship",
        "Build professional networks",
        "Create a portfolio/CV",
        "Stay updated on industry trends"
      ]
    }
  ];

  const skillsForSuccess = [
    {
      category: "Communication Skills",
      icon: MessageCircle,
      skills: ["Public Speaking", "Writing", "Active Listening", "Presentation", "Negotiation"]
    },
    {
      category: "Leadership Skills",
      icon: Users,
      skills: ["Team Management", "Decision Making", "Conflict Resolution", "Motivation", "Delegation"]
    },
    {
      category: "Technical Skills",
      icon: Cpu,
      skills: ["Computer Literacy", "Data Analysis", "Digital Tools", "Research", "Problem Solving"]
    },
    {
      category: "Personal Skills",
      icon: Heart,
      skills: ["Time Management", "Adaptability", "Critical Thinking", "Creativity", "Resilience"]
    }
  ];

  const alumniMentors = [
    {
      name: "Dr. James Mwangi",
      class: "Class of 2005",
      role: "Surgeon, Kenyatta National Hospital",
      expertise: "Medical Careers, KCSE Preparation",
      available: "Saturdays 2-4 PM"
    },
    {
      name: "Wanjiku Kamau",
      class: "Class of 2010",
      role: "Software Engineer, Safaricom",
      expertise: "Tech Careers, Coding, STEM",
      available: "Wednesdays 5-7 PM"
    },
    {
      name: "Peter Ochieng",
      class: "Class of 2008",
      role: "Advocate, High Court of Kenya",
      expertise: "Law, Public Speaking, Debate",
      available: "Fridays 4-6 PM"
    },
    {
      name: "Grace Njeri",
      class: "Class of 2012",
      role: "Financial Analyst, Equity Bank",
      expertise: "Finance, Business, Economics",
      available: "Tuesdays 5-7 PM"
    }
  ];

  const scholarshipOpportunities = [
    {
      name: "HELB Undergraduate Loan",
      provider: "Higher Education Loans Board",
      eligibility: "All Kenyan students joining university",
      deadline: "Rolling (after admission)",
      link: "/helb"
    },
    {
      name: "Equity Wings to Fly",
      provider: "Equity Bank Foundation",
      eligibility: "Bright, needy secondary students",
      deadline: "January each year",
      link: "https://equitygroupfoundation.com"
    },
    {
      name: "MasterCard Foundation Scholars",
      provider: "MasterCard Foundation",
      eligibility: "Academically talented, economically disadvantaged",
      deadline: "Varies by university",
      link: "https://mastercardfdn.org"
    },
    {
      name: "Aga Khan Foundation Scholarship",
      provider: "Aga Khan Development Network",
      eligibility: "Outstanding students with financial need",
      deadline: "March each year",
      link: "https://akdn.org"
    },
    {
      name: "KCB Foundation Scholarship",
      provider: "KCB Foundation",
      eligibility: "Top KCSE performers from disadvantaged backgrounds",
      deadline: "February each year",
      link: "https://kcbgroup.com"
    }
  ];

  const faqs = [
    {
      question: "How do I choose the right career?",
      answer: "Start by understanding yourself - your interests, strengths, values, and personality. Take career aptitude tests, research different professions, talk to professionals, and consider factors like job availability, salary, work environment, and growth potential. Remember, your first career choice doesn't have to be permanent."
    },
    {
      question: "What subjects should I focus on for my desired career?",
      answer: "Research the university requirements for your desired course. Most courses have specific subject requirements - for example, Medicine requires Biology, Chemistry, Physics, and Mathematics. Focus on these subjects while maintaining good grades across all subjects to keep your options open."
    },
    {
      question: "How important is KCSE grade for my career?",
      answer: "KCSE grades determine your immediate options for university admission and course selection. However, they are just the starting point. Many successful professionals didn't get straight A's but developed skills, gained experience, and pursued alternative pathways. Focus on learning, not just grades."
    },
    {
      question: "Can I change my career later in life?",
      answer: "Absolutely! Career changes are increasingly common. Many skills are transferable between careers. Continuous learning, professional development, and networking can help you transition to new fields. Some of the most successful people changed careers multiple times."
    },
    {
      question: "How can I gain work experience while still in school?",
      answer: "Take advantage of holiday attachments, internships, and volunteer opportunities. Join school clubs related to your interests, participate in competitions, and take on leadership roles. Online courses and certifications can also add to your experience."
    },
    {
      question: "What if I can't afford university?",
      answer: "There are many options: HELB loans, scholarships from various foundations (Equity, MasterCard, Aga Khan), university bursaries, and work-study programs. Technical colleges and TVET institutions also offer quality, affordable education. Don't let finances stop you - research all available options."
    },
    {
      question: "Are TVET courses as good as university degrees?",
      answer: "TVET courses can be excellent choices! They offer practical, hands-on training that makes graduates job-ready. Many TVET graduates earn competitive salaries and have lower unemployment rates than some degree holders. Choose based on your career goals, not societal pressure."
    },
    {
      question: "How do I prepare for job interviews?",
      answer: "Research the company thoroughly, practice common interview questions, prepare examples of your achievements, dress professionally, arrive early, bring extra copies of your CV, ask thoughtful questions, and send a thank-you note after. Practice with friends or mentors beforehand."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-6">
                <Briefcase className="h-5 w-5 text-accent" />
                <span className="text-accent font-medium">Career Guidance Centre</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Shape Your Future
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Comprehensive career guidance for students and alumni. Discover your path, 
                develop your skills, and achieve your dreams with Rubiri High School's support.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    Your Career Journey Starts Here
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    At Rubiri High School, we believe that academic excellence is just the beginning. 
                    Our Career Guidance Centre is dedicated to helping students and alumni navigate 
                    the complex world of career choices, higher education, and professional development.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Whether you're a Form One student exploring possibilities, a Form Four student 
                    preparing for KUCCPS applications, or an alumnus seeking career advancement, 
                    we're here to guide you every step of the way.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link to="/kuccps">KUCCPS Guide</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/alumni">Alumni Network</Link>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-primary/5 border-primary/10">
                    <CardContent className="p-6 text-center">
                      <GraduationCap className="h-10 w-10 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-2xl text-primary">500+</h3>
                      <p className="text-sm text-muted-foreground">Students Guided</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/5 border-accent/10">
                    <CardContent className="p-6 text-center">
                      <Briefcase className="h-10 w-10 text-primary mx-auto mb-3" />
                      <h3 className="font-bold text-2xl text-accent">50+</h3>
                      <p className="text-sm text-muted-foreground">Career Paths</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/5 border-accent/10">
                    <CardContent className="p-6 text-center">
                      <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                      <h3 className="font-bold text-2xl text-accent">20+</h3>
                      <p className="text-sm text-muted-foreground">Alumni Mentors</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/10">
                    <CardContent className="p-6 text-center">
                      <Award className="h-10 w-10 text-accent mx-auto mb-3" />
                      <h3 className="font-bold text-2xl text-primary">95%</h3>
                      <p className="text-sm text-muted-foreground">Placement Rate</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Career Planning Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                5 Steps to Career Success
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow this proven framework to discover, plan, and achieve your career goals
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <StaggeredContainer className="space-y-6">
              {careerPlanningSteps.map((step, index) => (
                <StaggeredItem key={index}>
                  <Card className="overflow-hidden border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {step.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                                <span>{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
        </div>
      </section>

      {/* Career Clusters */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Explore Career Clusters
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover different career pathways and find the one that matches your interests and abilities
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerClusters.map((cluster, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-t-4 border-t-accent">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <cluster.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg text-primary">{cluster.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cluster.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Key Subjects</h4>
                      <div className="flex flex-wrap gap-1">
                        {cluster.subjects.map((subject, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Sample Careers</h4>
                      <p className="text-xs text-muted-foreground">
                        {cluster.careers.slice(0, 4).join(" • ")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Salary Range</h4>
                      <p className="text-sm font-medium text-accent">{cluster.salary}</p>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Skills for Success */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Essential Skills for Success
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Beyond academic knowledge, these skills will set you apart in any career
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skillsForSuccess.map((category, index) => (
              <StaggeredItem key={index}>
                <Card className="bg-primary-foreground/10 border-primary-foreground/20 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-primary-foreground">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-primary-foreground/80">
                          <ArrowRight className="h-4 w-4 text-accent" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Alumni Mentorship */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Alumni Mentorship Program
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with successful Rubiri alumni who volunteer their time to guide current students
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {alumniMentors.map((mentor, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-bold text-primary mb-1">{mentor.name}</h3>
                    <p className="text-xs text-accent font-medium mb-2">{mentor.class}</p>
                    <p className="text-sm text-muted-foreground mb-3">{mentor.role}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-center gap-1">
                        <Lightbulb className="h-3 w-3 text-accent" />
                        <span>{mentor.expertise}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span>{mentor.available}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>

          <AnimatedSection className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Interested in joining the mentorship program as a mentor or mentee?
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">Contact Career Guidance Office</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Scholarship Opportunities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Scholarship & Funding Opportunities
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't let finances hold you back. Explore these funding options for your education
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <StaggeredContainer className="space-y-4">
              {scholarshipOpportunities.map((scholarship, index) => (
                <StaggeredItem key={index}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-start gap-3">
                            <Award className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-bold text-primary">{scholarship.name}</h3>
                              <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                              <p className="text-sm mt-2">
                                <span className="font-medium">Eligibility:</span> {scholarship.eligibility}
                              </p>
                              <p className="text-sm text-accent">
                                <span className="font-medium text-foreground">Deadline:</span> {scholarship.deadline}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                          <Link to={scholarship.link}>
                            Learn More <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Career Resources
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tools and links to help you in your career journey
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StaggeredItem>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-primary mb-2">University Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete guide to KUCCPS application, course selection, and university admission
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/kuccps">View KUCCPS Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </StaggeredItem>

            <StaggeredItem>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <FileText className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-primary mb-2">HELB Loans</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step guide to applying for HELB loans and bursaries
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/helb">View HELB Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </StaggeredItem>

            <StaggeredItem>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-primary mb-2">CBC Pathways</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Understanding career pathways under the new CBC curriculum
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/cbc">View CBC Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </StaggeredItem>
          </StaggeredContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Common questions about careers, education, and professional development
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-6">
                    <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-accent via-accent/95 to-accent/90">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center text-accent-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Take the Next Step?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Visit our Career Guidance Office for personalized counseling, career assessments, 
                and one-on-one mentorship. Your future starts with a single step.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/contact">Book a Session</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  <Link to="/alumni">Join Alumni Network</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold text-primary mb-4">Career Guidance Office</h3>
              <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  <span>Administration Block, Room 12</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Mon-Fri: 8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <span>careers@rubirihigh.ac.ke</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CareerGuidance;
