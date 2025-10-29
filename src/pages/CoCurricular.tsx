import { Music2, Palette, Users, Leaf, BookOpen, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import sportsImage from "@/assets/sports-action.jpg";
import cultureImage from "@/assets/music-culture.jpg";
import clubsImage from "@/assets/clubs-activities.jpg";
import treePlanting1 from "@/assets/tree-planting-1.jpg";
import treePlanting2 from "@/assets/tree-planting-2.jpg";
import treePlanting3 from "@/assets/tree-planting-3.jpg";
import treePlanting4 from "@/assets/tree-planting-4.jpg";
import treePlanting5 from "@/assets/tree-planting-5.jpg";
import treePlanting6 from "@/assets/tree-planting-6.jpg";

const CoCurricular = () => {
  const clubs = [
    { name: "Debate & Journalism Club", icon: BookOpen },
    { name: "Science & Innovation Club", icon: Users },
    { name: "Environment Club", icon: Leaf },
    { name: "Business & Entrepreneurship Club", icon: Users },
    { name: "Christian Union", icon: Heart },
    { name: "Muslim Students Association", icon: Heart },
    { name: "Peer Counseling", icon: Users },
    { name: "Wildlife Club", icon: Leaf },
    { name: "Scouts", icon: Users },
    { name: "Red Cross Club", icon: Heart },
  ];

  const sports = [
    "Football",
    "Volleyball",
    "Basketball",
    "Athletics",
    "Handball",
    "Netball",
    "Table Tennis",
    "Chess",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Co-Curricular Life</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Building character, confidence, and leadership through clubs, sports, and cultural activities
          </p>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Clubs & Societies</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                At The Rubiri High School, we believe that education extends beyond the classroom. Our diverse range of 
                clubs and societies provides students with opportunities to explore their interests, develop new skills, 
                and build meaningful relationships.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These clubs build confidence, teamwork, and leadership — developing well-rounded students ready to impact 
                society positively.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={clubsImage}
                alt="Club Activities"
                className="rounded-lg shadow-maroon w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <Card key={index} className="shadow-lg hover:shadow-maroon transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <club.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-bold">{club.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tree Planting Program */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Tree Planting & Environmental Conservation</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              At The Rubiri High School, we believe in nurturing not just minds, but also our planet. Our comprehensive 
              tree planting program is a cornerstone of our commitment to environmental sustainability and responsible citizenship.
            </p>
            <blockquote className="text-2xl font-bold text-accent italic border-l-4 border-accent pl-6 max-w-4xl mx-auto bg-background p-6 rounded-lg shadow-maroon">
              "We do not inherit the earth from our ancestors; we borrow it from our children. Every tree we plant is a promise of a greener, 
              healthier future — a legacy of hope and responsibility that defines the Rubiri spirit."
            </blockquote>
          </div>

          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <Leaf className="w-12 h-12 text-accent mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-3 text-center">Student-Led Initiative</h3>
                  <p className="text-muted-foreground text-center">
                    Our Environment Club leads regular tree planting activities, empowering students to take ownership of environmental conservation
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-accent mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-3 text-center">Community Impact</h3>
                  <p className="text-muted-foreground text-center">
                    Through partnerships with local organizations, we extend our environmental efforts beyond school grounds to benefit Naivasha
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <BookOpen className="w-12 h-12 text-accent mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-3 text-center">Educational Integration</h3>
                  <p className="text-muted-foreground text-center">
                    Tree planting connects classroom learning with real-world environmental science, ecology, and climate action
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: treePlanting1, title: "Hands-On Learning" },
              { src: treePlanting2, title: "Collaborative Effort" },
              { src: treePlanting3, title: "Teacher Mentorship" },
              { src: treePlanting4, title: "Community Spirit" },
              { src: treePlanting5, title: "Environmental Champions" },
              { src: treePlanting6, title: "Building Green Futures" },
            ].map((image, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-maroon transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-primary-foreground text-lg font-bold">{image.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Through our tree planting program, students learn the vital importance of environmental stewardship, biodiversity, 
              and climate action. Each seedling planted represents hope, growth, and our collective commitment to sustainability — 
              embodying our motto: <span className="font-bold text-accent">Committed to Excellence</span> in all we do, 
              including caring for our planet.
            </p>
          </div>
        </div>
      </section>

      {/* Music, Drama & Culture */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Music, Drama & Culture</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Rubiri High has a proud cultural legacy that celebrates creativity, artistic expression, and Kenya's rich heritage.
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Music2 className="w-6 h-6 mr-2 text-accent" />
                    Music Club
                  </h3>
                  <p className="text-muted-foreground">
                    The Music Club has represented Nakuru County at National Music Festivals, earning distinction awards. 
                    Students learn vocal and instrumental music, building confidence and discipline.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Palette className="w-6 h-6 mr-2 text-accent" />
                    Drama Team
                  </h3>
                  <p className="text-muted-foreground">
                    The Drama Team stages thought-provoking plays and narratives that promote moral values and creativity. 
                    Students explore acting, scriptwriting, and stage production.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-accent" />
                    Cultural Day
                  </h3>
                  <p className="text-muted-foreground">
                    Annual Cultural Day celebrates Kenya's diversity through art, poetry, traditional dance, and fashion. 
                    This event showcases student talents and promotes cultural awareness.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <img
                src={cultureImage}
                alt="Music and Culture"
                className="rounded-lg shadow-maroon w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src={sportsImage}
                alt="Sports Activities"
                className="rounded-lg shadow-maroon w-full"
              />
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Sports & Games</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Rubiri High promotes physical fitness, teamwork, and discipline through various sports. Our teams have 
                participated at regional and county levels, inspiring pride and sportsmanship.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {sports.map((sport, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-muted-foreground">{sport}</span>
                  </div>
                ))}
              </div>

              <blockquote className="text-xl font-semibold text-accent italic border-l-4 border-accent pl-4 mt-8">
                "Discipline, teamwork, and effort — that's the Rubiri spirit!"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">The Impact of Co-Curricular Activities</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Participation in clubs, sports, and cultural activities helps students develop essential life skills:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-accent">Leadership</h3>
                  <p className="text-muted-foreground">
                    Students learn to lead teams, organize events, and inspire their peers
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-accent">Confidence</h3>
                  <p className="text-muted-foreground">
                    Performing, competing, and presenting builds self-assurance and public speaking skills
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-accent">Character</h3>
                  <p className="text-muted-foreground">
                    Sports and clubs teach discipline, perseverance, and ethical behavior
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoCurricular;
