import HeroSlideshow from "@/components/HeroSlideshow";
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "@/components/AnimatedSection";
import boyUniform from "@/assets/uniform-boy.png";
import girlUniform from "@/assets/uniform-girl.png";

const Uniform = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSlideshow 
        title="School Uniform" 
        subtitle="Pride in appearance, excellence in character"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Official School Uniform</h2>
            <p className="text-muted-foreground text-lg">
              At The Rubiri High School, our uniform represents our values of discipline, unity, and excellence. 
              The distinctive dark grey, maroon, and white colors with <strong>golden yellow trims</strong> symbolize our school's rich heritage and commitment to academic achievement.
            </p>
          </div>
        </AnimatedSection>

        {/* Uniform Display */}
        <StaggeredContainer className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Boys Uniform */}
          <StaggeredItem>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center p-8">
                <img 
                  src={boyUniform} 
                  alt="Boys school uniform" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Boys' Uniform</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Blazer:</span> Rich maroon blazer with golden yellow trims on the lapels and cuffs
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Shirt:</span> Crisp white collared shirt
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Sweater:</span> Maroon V-neck sweater with golden yellow trims on the neckline and cuffs
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Tie:</span> Maroon and white striped school tie with golden yellow accent
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Trousers:</span> Dark grey tailored trousers
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Socks:</span> Dark grey socks
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Shoes:</span> Black leather shoes, well polished
                  </p>
                </div>
              </div>
            </div>
          </StaggeredItem>

          {/* Girls Uniform */}
          <StaggeredItem>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center p-8">
                <img 
                  src={girlUniform} 
                  alt="Girls school uniform" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Girls' Uniform</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Blazer:</span> Rich maroon blazer with golden yellow trims on the lapels and cuffs
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Blouse:</span> Crisp white collared blouse
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Sweater:</span> Maroon V-neck sweater with golden yellow trims on the neckline and cuffs
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Tie:</span> Maroon and white striped school tie with golden yellow accent
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Skirt:</span> Checked pattern skirt in maroon with white shades, knee-length pleated
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Socks:</span> White knee-high socks
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Shoes:</span> Black leather shoes, well polished
                  </p>
                </div>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredContainer>

        {/* Additional Information */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Uniform Guidelines & School Colors</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-accent/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">General Requirements</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Uniform must be clean, well-maintained, and worn with pride</li>
                  <li>• Name tags should be clearly visible on the blazer</li>
                  <li>• School badge must be worn on the left side of the blazer</li>
                  <li>• Hair must be neat and well-groomed</li>
                  <li>• No jewelry except simple watches</li>
                </ul>
              </div>
              <div className="bg-accent/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">School Colors</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#4a4a4a] border-2 border-border flex-shrink-0"></div>
                    <span className="text-muted-foreground">Dark Grey - Strength & Stability</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#800020] border-2 border-border flex-shrink-0"></div>
                    <span className="text-muted-foreground">Maroon - Courage & Excellence</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-border flex-shrink-0"></div>
                    <span className="text-muted-foreground">White - Purity & Integrity</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FFD700] border-2 border-border flex-shrink-0"></div>
                    <span className="text-muted-foreground">Golden Yellow - Bright Future & Achievement</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mt-6 text-center">
              Uniforms can be purchased from authorized suppliers. For more information about uniform requirements 
              and suppliers, please contact the school administration.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Uniform;
