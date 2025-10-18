import { GraduationCap, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import alumniImage from "@/assets/alumni-celebration.jpg";

const Alumni = () => {
  const testimonials = [
    {
      name: "Raiz Ade",
      year: "Class of 2024",
      field: "Electrical Engineering",
      quote: "Rubiri High shaped my passion for innovation and discipline. I'm now pursuing Electrical Engineering at university — proud to be a Rubiri alumnus.",
    },
    {
      name: "Mary Wanjiku",
      year: "Class of 2023",
      field: "Bachelor of Education",
      quote: "The mentorship and teamwork I experienced at Rubiri inspired me to study Education. I want to teach the way my teachers inspired me.",
    },
    {
      name: "Kelvin Otieno",
      year: "Class of 2023",
      field: "Journalism and Mass Communication",
      quote: "Rubiri gave me confidence to lead and speak boldly. I'm studying Journalism and Mass Communication — carrying the Rubiri spirit wherever I go.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(128, 0, 32, 0.5)), url(${alumniImage})`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-primary-foreground mb-6">Our Alumni</h1>
          <p className="text-xl text-primary-foreground max-w-3xl mx-auto">
            Celebrating the success stories of Rubiri graduates who continue to make us proud
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="w-20 h-20 text-accent mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-foreground">Once a Rubiri Student, Always a Rubiri Leader</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The Rubiri High School alumni network is a testament to the transformative power of quality education, 
              mentorship, and discipline. Our graduates have gone on to excel in various fields — from engineering and 
              medicine to education, journalism, business, and the arts.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              They carry with them the values instilled at Rubiri: excellence, integrity, leadership, and the belief 
              that every day is a <span className="font-bold text-accent">Mwanzo Mpya</span> — a fresh start to achieve greatness.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Alumni Voices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-maroon hover:scale-105 transition-transform duration-300">
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-accent mb-4" />
                  <p className="text-muted-foreground italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-sm text-accent">{testimonial.year}</p>
                    <p className="text-sm text-muted-foreground mt-1">{testimonial.field}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Impact */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">The Rubiri Impact</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Rubiri alumni share common traits that set them apart:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Leadership</h3>
                <p className="text-muted-foreground">
                  Rubiri graduates take on leadership roles in their universities, workplaces, and communities, 
                  inspiring those around them.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Discipline</h3>
                <p className="text-muted-foreground">
                  The foundation of discipline built at Rubiri helps alumni maintain focus, meet deadlines, and 
                  excel in competitive environments.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Confidence</h3>
                <p className="text-muted-foreground">
                  Through co-curricular activities and public speaking opportunities, Rubiri students develop 
                  self-assurance that serves them throughout life.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold mb-2">Gratitude</h3>
                <p className="text-muted-foreground">
                  Alumni frequently return to mentor current students, donate resources, and share their success 
                  stories to inspire the next generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Where Are They Now?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Rubiri alumni are pursuing degrees and careers in:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Engineering",
                "Medicine",
                "Education",
                "Journalism",
                "Business",
                "Law",
                "ICT & Technology",
                "Creative Arts",
              ].map((field, index) => (
                <div key={index} className="bg-background rounded-lg p-4 shadow-lg">
                  <p className="font-semibold text-accent">{field}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Be the Next Success Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join The Rubiri High School and write your own chapter of excellence. Your journey to greatness starts here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Alumni;
