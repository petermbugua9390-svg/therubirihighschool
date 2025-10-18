import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Beaker, Laptop, Globe, Calculator, Leaf, Palette, Music } from "lucide-react";
import cbcImage from "@/assets/cbc-learning.jpg";

const Academics = () => {
  const subjects = [
    { name: "English", icon: BookOpen, description: "Language and communication skills" },
    { name: "Kiswahili", icon: Globe, description: "National language proficiency" },
    { name: "Mathematics", icon: Calculator, description: "Numerical and logical thinking" },
    { name: "Integrated Science", icon: Beaker, description: "Scientific principles and experiments" },
    { name: "Social Studies", icon: Globe, description: "Understanding society and culture" },
    { name: "Business Studies", icon: BookOpen, description: "Entrepreneurship and economics" },
    { name: "Agriculture", icon: Leaf, description: "Sustainable farming practices" },
    { name: "Computer Science / ICT", icon: Laptop, description: "Digital literacy and programming" },
    { name: "Visual Arts", icon: Palette, description: "Creative expression and design" },
    { name: "Performing Arts", icon: Music, description: "Music, drama, and dance" },
    { name: "Sports & Physical Education", icon: BookOpen, description: "Fitness and team sports" },
    { name: "Life Skills Education", icon: BookOpen, description: "Personal development and wellness" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Academic Excellence</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive education that prepares learners for the future through the Competency-Based Curriculum
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Our Academic Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At The Rubiri High School, we pride ourselves on delivering quality education that combines academic rigor 
              with practical skills development. Our CBC-aligned curriculum ensures that every student receives a 
              well-rounded education that prepares them for success in higher education and beyond.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With modern facilities, dedicated CBC-trained teachers, and a learner-centered approach, Rubiri High creates 
              an environment where students thrive academically, socially, and personally.
            </p>
          </div>
        </div>
      </section>

      {/* CBC Image Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src={cbcImage}
                alt="CBC Learning"
                className="rounded-lg shadow-maroon w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-foreground">CBC Grade 10 Ready</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                The Rubiri High School is fully prepared for the 2026 CBC Grade 10 intake with:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">✓</span>
                  <span>Modern laboratories equipped for hands-on science experiments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">✓</span>
                  <span>Digital learning spaces with ICT integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">✓</span>
                  <span>Skilled CBC-trained teachers committed to student success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">✓</span>
                  <span>Vibrant, learner-centered environment promoting creativity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">✓</span>
                  <span>Comprehensive mentorship and career guidance programs</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/cbc">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Learn More About CBC
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">CBC Grade 10 Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="shadow-lg hover:shadow-maroon transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <subject.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-muted-foreground text-sm">{subject.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Beyond the Classroom</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-maroon">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-accent">Field Learning</h3>
                <p className="text-muted-foreground">
                  Students engage in practical field trips and community projects that bring classroom lessons to life.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-accent">Digital Tools</h3>
                <p className="text-muted-foreground">
                  Integration of technology in learning with access to computers, tablets, and educational software.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-accent">Project-Based Learning</h3>
                <p className="text-muted-foreground">
                  Assessments focus on real-world projects that develop critical thinking and problem-solving skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Academic Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience quality education that transforms lives and builds futures.
          </p>
          <Link to="/admissions">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-maroon">
              Apply for Admission
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Academics;
