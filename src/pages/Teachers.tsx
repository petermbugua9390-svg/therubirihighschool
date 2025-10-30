import HeroSlideshow from "@/components/HeroSlideshow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const Teachers = () => {
  const teachers = [
    {
      name: "Mr. Francis Wahindi",
      title: "Deputy Principal",
      quote: "Excellence is not a destination; it is a continuous journey that never ends. Every student has the potential to achieve greatness.",
      paragraphs: [
        "As Deputy Principal of Rubiri High School, I have witnessed countless transformations of young minds into brilliant scholars and responsible citizens. Our commitment to academic excellence is matched only by our dedication to nurturing well-rounded individuals who will lead tomorrow's world with integrity and compassion.",
        "Joining Rubiri High School means becoming part of a family that believes in your potential. We don't just teach subjects; we ignite passions, build character, and create opportunities for every student to shine. Your journey to success begins here, and we walk alongside you every step of the way."
      ]
    },
    {
      name: "Mr. Nyakundi",
      title: "Dean of Studies (2025)",
      quote: "Knowledge is power, but wisdom is knowing how to use it. At Rubiri, we cultivate both in equal measure.",
      paragraphs: [
        "The pursuit of knowledge is the noblest endeavor, and at Rubiri High School, we have created an environment where curiosity thrives and academic excellence flourishes. Our innovative teaching methodologies and state-of-the-art facilities ensure that every student receives a world-class education that prepares them for the challenges of tomorrow.",
        "Choose Rubiri High School and choose a future filled with endless possibilities. Our track record speaks for itself – our students consistently excel in national examinations and go on to pursue their dreams at the finest universities. Here, your academic aspirations become our mission, and your success becomes our pride."
      ]
    },
    {
      name: "Mr. Mbugua Peter",
      title: "Senior Teacher",
      quote: "Education is the key that unlocks the golden door to freedom. Let us help you find your key.",
      paragraphs: [
        "In my years of teaching at Rubiri High School, I have discovered that the most powerful tool in education is inspiration. When students are inspired, they don't just learn – they transform. Our dedicated team of educators works tirelessly to create an atmosphere where learning becomes an adventure and every lesson opens new doors of possibility.",
        "At Rubiri, we understand that each student is unique, with their own strengths and dreams. We provide personalized attention and support to help you discover your talents and develop them to their fullest potential. Join us, and let's write your success story together."
      ]
    },
    {
      name: "Md. Jane Irungu",
      title: "Head of Department",
      quote: "Dream big, work hard, and never let anyone tell you that you can't achieve the impossible.",
      paragraphs: [
        "As a woman in education, I am passionate about empowering every student, regardless of their background, to reach for the stars. At Rubiri High School, we believe that education is the great equalizer, and we are committed to providing every student with the tools, resources, and encouragement they need to succeed.",
        "Our school is more than just classrooms and books – it's a community where dreams take flight. We celebrate every achievement, support through every challenge, and believe wholeheartedly in the potential of every student who walks through our doors. Come join the Rubiri family and discover what you're truly capable of achieving."
      ]
    },
    {
      name: "Md. Jacinta Karweini",
      title: "Senior Teacher",
      quote: "The beautiful thing about learning is that no one can take it away from you. Invest in yourself at Rubiri.",
      paragraphs: [
        "Education is the most valuable investment you can make in yourself, and at Rubiri High School, we ensure that every moment spent here adds value to your life. Our holistic approach to education balances academic rigor with character development, ensuring that our students graduate not just with certificates, but with the wisdom and values to make a positive impact in the world.",
        "When you choose Rubiri High School, you're choosing excellence, integrity, and a commitment to your personal growth. Our alumni are leaders, innovators, and change-makers in every field imaginable. Your place among them awaits – all you need to do is take the first step and join us on this incredible journey of discovery and achievement."
      ]
    },
    {
      name: "Md. Syliviah Kerubo",
      title: "Senior Teacher",
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts. At Rubiri, we teach courage.",
      paragraphs: [
        "At Rubiri High School, we understand that the path to success is not always smooth, but it is always worthwhile. Our supportive environment ensures that students feel safe to take risks, make mistakes, and learn from them. We build resilience and determination in our students, qualities that serve them well beyond the classroom.",
        "Choosing the right school is one of the most important decisions you'll make, and at Rubiri, we honor that choice by giving you our very best every single day. From our experienced teachers to our modern facilities, everything here is designed to help you excel. Join us and experience an education that truly transforms lives."
      ]
    },
    {
      name: "Mr. Joshua Omwega",
      title: "Senior Teacher",
      quote: "The mind is not a vessel to be filled, but a fire to be kindled. Let Rubiri ignite your passion for learning.",
      paragraphs: [
        "Teaching is not just my profession; it is my calling. At Rubiri High School, I have the privilege of working with some of the brightest young minds in the country, and every day brings new opportunities to inspire and be inspired. Our approach to education goes beyond rote learning – we encourage critical thinking, creativity, and innovation.",
        "If you're looking for a school that will challenge you to be your best while supporting you every step of the way, Rubiri High School is the perfect choice. Our proven track record of academic excellence, combined with our nurturing environment, creates the ideal conditions for success. Join us and unlock your full potential."
      ]
    },
    {
      name: "Mr. Okwara William",
      title: "Senior Teacher",
      quote: "Education is not preparation for life; education is life itself. At Rubiri, we live and breathe excellence every day.",
      paragraphs: [
        "Every student who enters Rubiri High School brings with them unique talents, dreams, and potential. Our mission is to nurture these gifts and help each individual flourish. Through innovative teaching methods, personalized mentorship, and a genuine commitment to student success, we create an environment where excellence becomes a habit.",
        "The decision to join Rubiri High School is an investment in your future that pays dividends for a lifetime. Our graduates don't just succeed academically – they become leaders, innovators, and responsible citizens who make meaningful contributions to society. Be part of this legacy of excellence. Choose Rubiri, choose success, choose a brighter future."
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSlideshow 
        title="Our Exceptional Teaching Staff"
        subtitle="Dedicated educators inspiring excellence and shaping tomorrow's leaders"
      />
      
      {/* Teachers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Dedicated Teachers
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the exceptional educators who inspire, guide, and empower our students to achieve greatness
            </p>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {teachers.map((teacher, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-primary">{teacher.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-semibold">{teacher.title}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="italic text-lg text-muted-foreground border-l-4 border-accent pl-4">
                    "{teacher.quote}"
                  </blockquote>
                  <div className="space-y-4 text-foreground leading-relaxed">
                    {teacher.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teachers;
