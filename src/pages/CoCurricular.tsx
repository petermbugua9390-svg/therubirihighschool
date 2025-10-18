import { Music2, Palette, Users, Leaf, BookOpen, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import sportsImage from "@/assets/sports-action.jpg";
import cultureImage from "@/assets/music-culture.jpg";
import clubsImage from "@/assets/clubs-activities.jpg";

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

      {/* Music, Drama & Culture */}
      <section className="py-16 bg-secondary">
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
      <section className="py-16 bg-background">
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
      <section className="py-16 bg-secondary">
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
