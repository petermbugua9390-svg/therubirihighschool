import { Lightbulb, Users, Target, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CBC = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">CBC Curriculum at Rubiri</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Competency-Based Curriculum: Building Skills, Creativity, and Character
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-foreground">What is CBC?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The <span className="font-bold text-accent">Competency-Based Curriculum (CBC)</span> is Kenya's innovative education 
              system designed to equip learners with practical knowledge and skills for modern life. Unlike traditional rote learning, 
              CBC emphasizes creativity, collaboration, communication, and problem-solving.
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

      {/* CBC at Rubiri */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">CBC Implementation at Rubiri High</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">CBC-Trained Teachers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our teaching staff has undergone comprehensive CBC training to deliver engaging, learner-centered education. 
                Teachers serve as facilitators, guiding students through discovery and hands-on experiences.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Mentorship Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every student at Rubiri is paired with a mentor who provides personalized guidance, career counseling, and 
                emotional support throughout their educational journey.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">STEM, Arts & Sports Pathways</h3>
              <p className="text-muted-foreground leading-relaxed">
                Students can explore different pathways based on their interests and talents — whether in Science, Technology, 
                Engineering, Mathematics, Creative Arts, or Sports Excellence.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-bold mb-3">Modern Laboratories & ICT Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rubiri High is equipped with state-of-the-art science labs, computer rooms, and digital learning tools that 
                support practical, technology-enhanced education.
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
                local organizations that provide real-world learning experiences.
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

      {/* Quote Section */}
      <section className="py-16 bg-secondary">
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

      {/* Grade 10 Ready */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for CBC Grade 10, 2026</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The Rubiri High School welcomes the first cohort of CBC Grade 10 students with excitement and preparedness. 
            Join us in shaping Kenya's educational future.
          </p>
          <a 
            href="https://kicd.ac.ke/cbc-materials/curriculum-designs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-maroon hover:shadow-lg"
          >
            Learn More About CBC
          </a>
        </div>
      </section>
    </div>
  );
};

export default CBC;
