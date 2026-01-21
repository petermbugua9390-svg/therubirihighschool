import { Trophy, Medal, Music, FlaskConical, Calculator, Award, Users, Target, Star, BookOpen, Mic, Lightbulb, Brain, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";

const Achievements = () => {
  const academicAchievements = [
    {
      year: "2024",
      title: "KCSE Excellence",
      description: "Record-breaking performance with 85% university direct entry qualification",
      highlight: "15 students scored A plain",
    },
    {
      year: "2023",
      title: "County Top Performer",
      description: "Ranked 3rd best school in Nyeri County KCSE examinations",
      highlight: "Mean grade of B+",
    },
    {
      year: "2023",
      title: "Mathematics Champions",
      description: "Best performing school in KNEC Mathematics assessment",
      highlight: "County champions",
    },
    {
      year: "2022",
      title: "Science Excellence Award",
      description: "Outstanding performance in Biology, Chemistry, and Physics",
      highlight: "Regional recognition",
    },
  ];

  const musicFestivalAchievements = [
    {
      level: "National",
      event: "Kenya Music Festival 2024",
      achievements: [
        "1st Place - Choral Verse Speaking",
        "2nd Place - Traditional Dance",
        "3rd Place - Folk Song",
      ],
      icon: Music,
    },
    {
      level: "Regional",
      event: "Central Region Music Festival 2024",
      achievements: [
        "Overall Best School",
        "1st Place - Western Instrumentation",
        "1st Place - Set Piece Choir",
      ],
      icon: Mic,
    },
    {
      level: "County",
      event: "Nyeri County Music Festival",
      achievements: [
        "Grand Champions 2023 & 2024",
        "Best Choreography Award",
        "Most Improved School Award",
      ],
      icon: Award,
    },
  ];

  const scienceFairAchievements = [
    {
      title: "National Science & Engineering Fair 2024",
      project: "Solar-Powered Water Purification System",
      award: "Gold Medal - Environmental Innovation",
      students: "Form 4 Physics Club",
    },
    {
      title: "Kenya Science Congress 2023",
      project: "Biodegradable Packaging from Banana Fibres",
      award: "Best Innovation Award",
      students: "Agriculture & Chemistry Club",
    },
    {
      title: "STEM Kenya Competition 2024",
      project: "Smart Irrigation System Using IoT",
      award: "2nd Place National Level",
      students: "Computer Studies Club",
    },
    {
      title: "Young Scientists Kenya 2023",
      project: "Organic Pest Control Methods",
      award: "Certificate of Excellence",
      students: "Biology Club",
    },
  ];

  const contestsAchievements = [
    {
      category: "Debate & Public Speaking",
      icon: Mic,
      achievements: [
        "National Schools Debate Championship - Semi-finalists 2024",
        "Lions Club Public Speaking - County Winners 2023",
        "Model United Nations - Best Delegation Award",
      ],
    },
    {
      category: "Mathematics & Quiz",
      icon: Calculator,
      achievements: [
        "Kenya Mathematics Olympiad - Regional Champions",
        "Brain Battle Quiz - Top 5 Nationally",
        "STEM Challenge Competition - Gold Award",
      ],
    },
    {
      category: "Essay & Creative Writing",
      icon: BookOpen,
      achievements: [
        "National Essay Competition - 2nd Place",
        "Swahili Insha Competition - County Winners",
        "Environmental Awareness Essay - Recognition Award",
      ],
    },
  ];

  const internalCompetitions = [
    {
      name: "Inter-House Academic Olympics",
      description: "Quarterly academic competition covering all subjects with house points",
      frequency: "Termly",
      icon: Brain,
    },
    {
      name: "Science Fair Week",
      description: "Annual exhibition where students showcase innovative projects and experiments",
      frequency: "Annual",
      icon: FlaskConical,
    },
    {
      name: "Talent Show & Cultural Day",
      description: "Celebration of diverse talents including music, dance, poetry, and drama",
      frequency: "Annual",
      icon: Star,
    },
    {
      name: "Debate Championship",
      description: "Inter-class debate series developing critical thinking and oratory skills",
      frequency: "Termly",
      icon: Mic,
    },
    {
      name: "Sports Day & House Championships",
      description: "Athletic competitions fostering teamwork, fitness, and healthy competition",
      frequency: "Annual",
      icon: Trophy,
    },
    {
      name: "Mathematics Challenge",
      description: "Problem-solving competition to identify and nurture mathematical talent",
      frequency: "Termly",
      icon: Calculator,
    },
  ];

  const importancePoints = [
    {
      title: "Holistic Development",
      description: "Competitions develop the whole student - intellectually, emotionally, socially, and physically, preparing them for life beyond academics.",
      icon: Users,
    },
    {
      title: "Skill Discovery",
      description: "Students discover hidden talents and passions they may never have known existed, opening doors to future career paths.",
      icon: Lightbulb,
    },
    {
      title: "Confidence Building",
      description: "Participating in competitions builds self-confidence, public speaking skills, and the ability to perform under pressure.",
      icon: Target,
    },
    {
      title: "Character Formation",
      description: "Learning to win graciously and lose with dignity builds resilience, sportsmanship, and strong moral character.",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Achievements & Awards
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Celebrating excellence, recognising effort, and inspiring greatness at The Rubiri Senior School
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Academic Excellence
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our students consistently excel in national examinations, setting benchmarks for academic achievement
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 gap-6">
            {academicAchievements.map((achievement, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                        {achievement.year}
                      </Badge>
                      <Medal className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl text-primary">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <p className="text-sm font-semibold text-accent">
                      ★ {achievement.highlight}
                    </p>
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Music Festival Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Music Festival Triumphs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From county to national level, our students showcase exceptional talent in music, dance, and drama
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-3 gap-6">
            {musicFestivalAchievements.map((festival, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary rounded-full">
                        <festival.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <Badge className="mb-1">{festival.level}</Badge>
                        <CardTitle className="text-lg text-primary">
                          {festival.event}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {festival.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <Star className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                          <span>{item}</span>
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

      {/* Science Fair Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Science & Innovation
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fostering innovation and scientific inquiry through participation in science fairs and STEM competitions
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 gap-6">
            {scienceFairAchievements.map((science, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <FlaskConical className="h-8 w-8 text-accent" />
                      <CardTitle className="text-lg text-primary">
                        {science.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Project:</p>
                        <p className="font-semibold">{science.project}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Award:</p>
                        <Badge className="bg-accent text-accent-foreground">{science.award}</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">By:</p>
                        <p className="text-sm">{science.students}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Contests & Competitions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Contests & Competitions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Excellence in debate, quiz competitions, essay writing, and creative endeavours
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-3 gap-6">
            {contestsAchievements.map((contest, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <contest.icon className="h-6 w-6" />
                      <CardTitle className="text-lg">{contest.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      {contest.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <Trophy className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
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

      {/* Internal Competitions Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Internal Competitions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Regular in-school competitions that nurture talent, build character, and foster healthy competition
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalCompetitions.map((competition, index) => (
              <StaggeredItem key={index}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <competition.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-2">{competition.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {competition.description}
                        </p>
                        <Badge variant="outline">{competition.frequency}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Competitions Matter
              </h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                At The Rubiri Senior School, we believe competitions are vital to shaping well-rounded individuals
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importancePoints.map((point, index) => (
              <StaggeredItem key={index}>
                <div className="text-center p-6 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <div className="inline-flex p-4 bg-accent rounded-full mb-4">
                    <point.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{point.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{point.description}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredContainer>

          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <blockquote className="text-xl md:text-2xl italic font-light max-w-3xl mx-auto">
                "Competition brings out the best in products and the worst in people. But at Rubiri, 
                we've made it our mission to bring out the best in both."
              </blockquote>
              <p className="mt-4 font-medium">— School Philosophy on Competition</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Card className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-r from-muted to-muted/50">
              <CardContent>
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Be Part of Our Success Story
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  At The Rubiri Senior School, every student has the opportunity to discover their 
                  potential, compete at the highest levels, and bring glory to themselves and the school.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/admissions"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Join Our School
                  </a>
                  <a
                    href="/co-curricular"
                    className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                  >
                    Explore Activities
                  </a>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
