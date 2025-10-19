import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";
import cbcImage from "@/assets/cbc-learning.jpg";
import sportsImage from "@/assets/sports-action.jpg";
import cultureImage from "@/assets/music-culture.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(128, 0, 32, 0.5)), url(${heroImage})`,
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            THE RUBIRI HIGH SCHOOL
          </h1>
          <p className="text-2xl md:text-3xl text-accent-foreground font-semibold mb-4 animate-fade-in">
            Where Every Day Is a Mwanzo Mpya
          </p>
          <p className="text-xl md:text-2xl text-primary-foreground mb-8 animate-fade-in italic">
            Committed to Excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/about">
              <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-maroon">
                Learn More
              </Button>
            </Link>
            <Link to="/admissions">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-black">
                Admission 2026
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Academic Excellence</h3>
                <p className="text-muted-foreground">
                  Committed to providing quality education that inspires intellectual growth.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Discipline</h3>
                <p className="text-muted-foreground">
                  Building character through structure, respect, and accountability.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Mentorship</h3>
                <p className="text-muted-foreground">
                  Dedicated teachers guide students to discover their potential.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Transformation</h3>
                <p className="text-muted-foreground">
                  Empowering learners to become confident, purposeful leaders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Welcome to The Rubiri High School</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              A transformative learning institution where education inspires both character and intellect.
              We empower learners through discipline, mentorship, and creativity — nurturing confident individuals who lead with purpose.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Rubiri High blends academic excellence with real-world skills. Every learner is valued, guided, and supported by a dedicated teaching staff.
              Our philosophy, <span className="font-bold text-accent">"Mwanzo Mpya"</span>, reminds students that each day brings a chance to improve, dream, and lead.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The school's environment promotes innovation, digital literacy, and teamwork — preparing students for a dynamic, changing world.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Life at Rubiri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={cbcImage}
                alt="CBC Learning"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">CBC Ready</h3>
                  <p className="text-primary-foreground">Modern curriculum with hands-on learning</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={sportsImage}
                alt="Sports Excellence"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">Sports & Games</h3>
                  <p className="text-primary-foreground">Building teamwork and discipline</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={cultureImage}
                alt="Cultural Activities"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">Music & Culture</h3>
                  <p className="text-primary-foreground">Celebrating creativity and excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Rubiri?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Begin your journey of transformation and excellence. Apply now for the 2026 CBC Grade 10 intake.
          </p>
          <Link to="/admissions">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-maroon">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
