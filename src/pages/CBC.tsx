import { Lightbulb, Users, Target, Rocket, BookOpen, GraduationCap, Beaker, Palette, Trophy, Calculator, Globe, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import HeroSlideshow from "@/components/HeroSlideshow";

const CBC = () => {
  const coreSubjects = [
    "English",
    "Kiswahili / Kenya Sign Language (KSL)",
    "Community Service Learning",
    "Physical Education"
  ];

  const stemSubjects = [
    { track: "Pure Sciences", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"] },
    { track: "Applied Sciences", subjects: ["Mathematics", "Physics", "Chemistry", "Agriculture/Computer Science"] },
    { track: "Technical & Engineering", subjects: ["Mathematics", "Physics", "Technical Drawing", "Power Mechanics/Metalwork"] },
  ];

  const artsSportsSubjects = [
    { track: "Performing Arts", subjects: ["Music", "Theatre Arts", "Dance", "Film Studies"] },
    { track: "Visual Arts", subjects: ["Fine Art", "Graphic Design", "Photography", "Craft & Design"] },
    { track: "Sports Science", subjects: ["Sports Science", "Physical Education", "Nutrition", "Anatomy"] },
  ];

  const socialSciencesSubjects = [
    { track: "Humanities", subjects: ["History", "Geography", "Religious Education", "Philosophy"] },
    { track: "Business Studies", subjects: ["Economics", "Commerce", "Accounting", "Entrepreneurship"] },
    { track: "Languages", subjects: ["Literature", "French/German/Arabic", "Communication Skills", "Journalism"] },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSlideshow
        title="CBC Curriculum at Rubiri"
        subtitle="Competency-Based Curriculum: Building Skills, Creativity, and Character"
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-foreground">What is CBC?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The <span className="font-bold text-accent">Competency-Based Curriculum (CBC)</span> is Kenya's transformative 
              education system introduced by the Ministry of Education to replace the 8-4-4 system. Unlike traditional rote learning, 
              CBC emphasizes practical skills, creativity, collaboration, communication, and problem-solving abilities.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The new education structure follows a <strong>2-6-3-3-3</strong> system: 2 years of Pre-Primary, 6 years of Primary 
              School (Grades 1-6), 3 years of Junior Secondary (Grades 7-9), 3 years of Senior School (Grades 10-12), and 3 years of 
              tertiary education.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At The Rubiri High School, CBC learning is hands-on — learners think, create, and lead. The motto 
              <span className="font-bold text-accent"> "Committed to Excellence"</span> lives in every classroom and activity, 
              ensuring students are prepared for the challenges and opportunities of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* CBC Pillars */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">CBC Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Critical Thinking</h3>
                <p className="text-muted-foreground">
                  Developing analytical skills and creative problem-solving abilities
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Learning to work effectively in teams and value diverse perspectives
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Communication</h3>
                <p className="text-muted-foreground">
                  Expressing ideas clearly through speaking, writing, and digital media
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Rocket className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Creativity</h3>
                <p className="text-muted-foreground">
                  Encouraging innovation, imagination, and entrepreneurial thinking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Senior School Structure */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center text-foreground">Senior School Structure (Grades 10-12)</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Senior School represents the fourth level of Basic Education in CBC. Students study <strong>7 subjects</strong> total: 
            4 compulsory core subjects and 3 elective subjects based on their chosen career pathway.
          </p>

          {/* Core Subjects */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-maroon">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BookOpen className="w-8 h-8 text-accent" />
                  Compulsory Core Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coreSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium">{subject}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Pathways */}
          <h3 className="text-3xl font-bold mb-8 text-center text-foreground">Career Pathways & Subject Tracks</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* STEM Pathway */}
            <Card className="shadow-maroon border-t-4 border-t-blue-500">
              <CardHeader className="bg-blue-500/10">
                <CardTitle className="flex items-center gap-3">
                  <Beaker className="w-8 h-8 text-blue-500" />
                  <div>
                    <span className="block text-xl">STEM Pathway</span>
                    <Badge className="bg-blue-500/20 text-blue-700 mt-1">60% of Learners Expected</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Science, Technology, Engineering & Mathematics — for learners pursuing scientific and technical careers.
                </p>
                {stemSubjects.map((track, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-700 mb-2">{track.track}</h4>
                    <ul className="space-y-1">
                      {track.subjects.map((subject, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Arts & Sports Pathway */}
            <Card className="shadow-maroon border-t-4 border-t-purple-500">
              <CardHeader className="bg-purple-500/10">
                <CardTitle className="flex items-center gap-3">
                  <Palette className="w-8 h-8 text-purple-500" />
                  <div>
                    <span className="block text-xl">Arts & Sports Science</span>
                    <Badge className="bg-purple-500/20 text-purple-700 mt-1">15% of Learners Expected</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  For creative minds and athletes pursuing careers in arts, entertainment, and sports.
                </p>
                {artsSportsSubjects.map((track, index) => (
                  <div key={index} className="border-l-2 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-700 mb-2">{track.track}</h4>
                    <ul className="space-y-1">
                      {track.subjects.map((subject, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Sciences Pathway */}
            <Card className="shadow-maroon border-t-4 border-t-green-500">
              <CardHeader className="bg-green-500/10">
                <CardTitle className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-green-500" />
                  <div>
                    <span className="block text-xl">Social Sciences</span>
                    <Badge className="bg-green-500/20 text-green-700 mt-1">25% of Learners Expected</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  For future leaders in business, law, governance, and humanities.
                </p>
                {socialSciencesSubjects.map((track, index) => (
                  <div key={index} className="border-l-2 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-700 mb-2">{track.track}</h4>
                    <ul className="space-y-1">
                      {track.subjects.map((subject, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Structure */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">KJSEA Assessment Structure</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            The Kenya Junior Secondary Education Assessment (KJSEA) is the comprehensive evaluation that determines 
            learners' transition from Junior Secondary (Grade 9) to Senior School (Grade 10).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-maroon text-center">
              <CardContent className="pt-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">20%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">KPSEA Results</h3>
                <p className="text-muted-foreground text-sm">
                  Kenya Primary School Education Assessment scores from Grade 6
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon text-center">
              <CardContent className="pt-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">20%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">School-Based Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  Continuous assessment from Grades 7 and 8 including projects and portfolios
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon text-center">
              <CardContent className="pt-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">60%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Grade 9 Summative Exam</h3>
                <p className="text-muted-foreground text-sm">
                  Final summative evaluation at the end of Grade 9
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CBC at Rubiri */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">CBC Implementation at Rubiri High</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">CBC-Trained Teachers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our teaching staff has undergone comprehensive CBC training to deliver engaging, learner-centred education. 
                Teachers serve as facilitators, guiding students through discovery and hands-on experiences.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Mentorship Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every student at Rubiri is paired with a mentor who provides personalised guidance, career counselling, and 
                emotional support throughout their educational journey.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">All Three Pathways Available</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rubiri High School is equipped to offer all three CBC pathways — STEM, Arts & Sports Science, and Social Sciences — 
                allowing students to pursue their passions and align their education with their career aspirations.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Modern Laboratories & ICT Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rubiri High is equipped with state-of-the-art science labs, computer rooms, and digital learning tools that 
                support practical, technology-enhanced education required for all CBC pathways.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Digital Tools & Workshops</h3>
              <p className="text-muted-foreground leading-relaxed">
                Students gain digital literacy through coding classes, robotics clubs, graphic design workshops, and access to 
                online learning platforms.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Field Learning & Community Engagement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Education extends beyond classroom walls with field trips, community service projects, and partnerships with 
                local organisations that provide real-world learning experiences.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Value-Based Education</h3>
              <p className="text-muted-foreground leading-relaxed">
                CBC at Rubiri integrates moral values, citizenship, and character development into every subject, producing 
                responsible, ethical leaders.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Project & Portfolio Assessments</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rather than relying solely on exams, CBC uses project-based assessments and student portfolios to measure 
                competency and growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* School Placement CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-maroon">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Grade 10 School Placement</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn about the Ministry of Education's Grade 10 placement process, how schools are selected, 
                    and what parents and learners need to know about the transition to Senior School.
                  </p>
                  <Link 
                    to="/school-placement"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    Read the School Placement Guide <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-12 h-12 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl font-semibold text-foreground italic mb-4">
              "At Rubiri, CBC learning is hands-on — learners think, create, and lead."
            </blockquote>
            <p className="text-lg text-muted-foreground">
              Every day is an opportunity for students to develop new skills, explore their passions, and prepare for a 
              bright future in Kenya's evolving education landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Important Educational Resources */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center text-foreground">Important Educational Resources</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Stay informed with official resources from the Ministry of Education and partner organizations. 
            These links provide essential information for parents, learners, and teachers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Official Government Resources */}
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <GraduationCap className="w-6 h-6 text-accent" />
                  Ministry of Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <a 
                  href="https://www.education.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Official MoE Website
                </a>
                <a 
                  href="https://selection.education.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> School Selection Portal
                </a>
                <a 
                  href="https://nemis.education.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> NEMIS Portal
                </a>
              </CardContent>
            </Card>

            {/* KICD Resources */}
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <BookOpen className="w-6 h-6 text-accent" />
                  KICD Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <a 
                  href="https://kicd.ac.ke/cbc-materials/curriculum-designs/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> CBC Curriculum Designs
                </a>
                <a 
                  href="https://kicd.ac.ke/cbc-materials/curriculum-designs/grade-ten/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Grade 10 Materials
                </a>
                <a 
                  href="https://kicd.ac.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> KICD Official Website
                </a>
              </CardContent>
            </Card>

            {/* KNEC Resources */}
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <FileText className="w-6 h-6 text-accent" />
                  KNEC Examinations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <a 
                  href="https://www.knec.ac.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> KNEC Official Website
                </a>
                <a 
                  href="https://www.knec.ac.ke/results/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Results Portal
                </a>
                <a 
                  href="https://cp2.knec.ac.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> KNEC CP2 Portal
                </a>
              </CardContent>
            </Card>

            {/* Digital Learning */}
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Lightbulb className="w-6 h-6 text-accent" />
                  Digital Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <a 
                  href="https://kenyaeducationcloud.co.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Kenya Education Cloud
                </a>
                <a 
                  href="https://elimika.co.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Elimika Platform
                </a>
                <a 
                  href="https://www.kbc.co.ke/education/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> KBC Education
                </a>
              </CardContent>
            </Card>

            {/* Teacher Resources */}
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Users className="w-6 h-6 text-accent" />
                  Teacher Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <a 
                  href="https://www.tsc.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> TSC Portal
                </a>
                <a 
                  href="https://tpad2.tsc.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> TPAD Portal
                </a>
                <a 
                  href="https://tpay.tsc.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> TPAY Payslips
                </a>
                <a 
                  href="https://eacc.go.ke/default/wealth-declaration/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Wealth Declaration (EACC)
                </a>
                <a 
                  href="https://tpd.tsc.go.ke/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> TPD Training Portal
                </a>
              </CardContent>
            </Card>

            {/* KJSEA Calculator Tool */}
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300 border-2 border-accent">
              <CardHeader className="bg-accent/20">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Calculator className="w-6 h-6 text-accent" />
                  KJSEA Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Estimate your child's KJSEA score and Grade 10 placement potential with our free calculator tool.
                </p>
                <Link 
                  to="/school-placement"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors text-sm"
                >
                  Open Calculator <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grade 10 Ready */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for CBC Grade 10, 2026</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The Rubiri High School welcomes the first cohort of CBC Grade 10 students with excitement and preparedness. 
            Join us in shaping Kenya's educational future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://kicd.ac.ke/cbc-materials/curriculum-designs/grade-ten/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-maroon hover:shadow-lg"
            >
              View KICD Curriculum Designs
            </a>
            <a 
              href="https://selection.education.go.ke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border border-primary-foreground/50 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              School Selection Portal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CBC;