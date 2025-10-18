import { Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About The Rubiri High School</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A transformative learning institution where excellence meets character development
          </p>
        </div>
      </section>

      {/* School Information */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">Who We Are</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Welcome to <span className="font-bold text-accent">The Rubiri High School</span>, a transformative learning institution 
                where education inspires both character and intellect. We empower learners through discipline, mentorship, and creativity — 
                nurturing confident individuals who lead with purpose.
              </p>
              <p>
                Rubiri High blends academic excellence with real-world skills. Every learner is valued, guided, and supported by a 
                dedicated teaching staff. Our philosophy, <span className="font-bold text-accent">"Mwanzo Mpya"</span>, reminds students 
                that each day brings a chance to improve, dream, and lead.
              </p>
              <p>
                The school's environment promotes innovation, digital literacy, and teamwork — preparing students for a dynamic, 
                changing world. At Rubiri, we don't just teach subjects; we build futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Motto */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-maroon">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide quality education, skills, and practical knowledge for lifelong transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon">
              <CardContent className="pt-6">
                <Eye className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a leading student-centered institution for learner empowerment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Motto</h3>
                <p className="text-3xl font-bold text-accent">
                  Committed to Excellence
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* School Details */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">School Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Official Name</h3>
                <p className="text-muted-foreground">The Rubiri High School</p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Slogan</h3>
                <p className="text-muted-foreground">MWANZO MPYA (A New Beginning)</p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-muted-foreground">Naivasha, Nakuru County, Kenya</p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Postal Address</h3>
                <p className="text-muted-foreground">P.O. Box 1828–20117, Naivasha</p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p className="text-muted-foreground">
                  +254708992922<br />
                  +254708993177
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">rubirisecondaryschool@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">Our School Colors</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            The Rubiri High School proudly wears Black, Maroon, and White — colors that symbolize authority, 
            courage, and clarity in our pursuit of excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-primary shadow-lg mb-4 mx-auto"></div>
              <p className="font-bold text-foreground">Black</p>
              <p className="text-sm text-muted-foreground">Authority & Discipline</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-accent shadow-lg mb-4 mx-auto"></div>
              <p className="font-bold text-foreground">Maroon</p>
              <p className="text-sm text-muted-foreground">Courage & Ambition</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-background border-4 border-border shadow-lg mb-4 mx-auto"></div>
              <p className="font-bold text-foreground">White</p>
              <p className="text-sm text-muted-foreground">Clarity & Professionalism</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
