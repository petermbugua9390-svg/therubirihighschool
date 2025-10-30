import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, UserCheck, ClipboardList, Download } from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";

const Admissions = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSlideshow
        title="Admissions"
        subtitle="Join The Rubiri High School family — where excellence begins and futures are built"
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Admissions Open</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The Rubiri High School welcomes applications for CBC Grade 10 (2026 intake) and continuing senior levels. 
              We are looking for students who are eager to learn, grow, and contribute to our vibrant school community.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our admissions process is designed to identify students who will thrive in our learner-centered environment 
              and benefit from our comprehensive CBC curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Step 1</h3>
                <p className="text-muted-foreground">
                  Download and complete the admission form
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <ClipboardList className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Step 2</h3>
                <p className="text-muted-foreground">
                  Submit required documents and academic records
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <UserCheck className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Step 3</h3>
                <p className="text-muted-foreground">
                  Attend interview and assessment
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-maroon hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <UserCheck className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Step 4</h3>
                <p className="text-muted-foreground">
                  Receive admission decision and join Rubiri
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Admission Documents</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download the official admission documents below. Complete all sections carefully and submit 
              along with the required documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/documents/admission-letter.pdf" download>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-maroon">
                  <Download className="mr-2" />
                  Download Admission Letter
                </Button>
              </a>
              <a href="/documents/grade-10-admission-form.pdf" download>
                <Button size="lg" variant="outline" className="shadow-maroon">
                  <Download className="mr-2" />
                  Download Grade 10 Form
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Admission Requirements</h2>
            
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-accent">Required Documents</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Completed admission form</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Birth certificate (certified copy)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Academic records and report forms from previous school</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Discipline report from previous school</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Two recent passport-size photographs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Parent/Guardian ID copy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-accent">Interview Process</h3>
                  <p className="text-muted-foreground mb-3">
                    Shortlisted candidates will be invited for an interview where we assess:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Academic potential and learning readiness</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Character, discipline, and attitude</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Communication skills and interests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Fit with school values and culture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-accent">School Policies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Uniform requirements (black, maroon, and white)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Fee structure and payment schedules</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Parental engagement and communication expectations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-2">•</span>
                      <span>Code of conduct and discipline policy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-register CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step toward excellence. Download the admission form and begin your Rubiri journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/documents/grade-10-admission-form.pdf" download>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-maroon">
                Download Form
              </Button>
            </a>
            <a href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Admissions
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
