import HeroSlideshow from "@/components/HeroSlideshow";
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Official School Uniform</h2>
          <p className="text-muted-foreground text-lg">
            At The Rubiri High School, our uniform represents our values of discipline, unity, and excellence. 
            The distinctive maroon and gold colors symbolize our school's rich heritage and commitment to academic achievement.
          </p>
        </div>

        {/* Uniform Display */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Boys Uniform */}
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
                  <span className="font-semibold text-foreground">Blazer:</span> Rich maroon blazer with elegant gold trim on the lapels and sleeves
                </p>
                <p>
                  <span className="font-semibold text-foreground">Shirt:</span> Crisp white collared shirt
                </p>
                <p>
                  <span className="font-semibold text-foreground">Sweater:</span> Maroon V-neck sweater with gold trim
                </p>
                <p>
                  <span className="font-semibold text-foreground">Tie:</span> Maroon and gold striped school tie
                </p>
                <p>
                  <span className="font-semibold text-foreground">Trousers:</span> Dark grey or black tailored trousers
                </p>
              </div>
            </div>
          </div>

          {/* Girls Uniform */}
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
                  <span className="font-semibold text-foreground">Blazer:</span> Rich maroon blazer with elegant gold trim on the lapels and sleeves
                </p>
                <p>
                  <span className="font-semibold text-foreground">Shirt:</span> Crisp white collared shirt
                </p>
                <p>
                  <span className="font-semibold text-foreground">Sweater:</span> Maroon V-neck sweater with gold trim
                </p>
                <p>
                  <span className="font-semibold text-foreground">Tie:</span> Maroon and gold striped school tie
                </p>
                <p>
                  <span className="font-semibold text-foreground">Skirt:</span> Maroon and beige tartan plaid pleated skirt
                </p>
                <p>
                  <span className="font-semibold text-foreground">Socks:</span> Cream knee-high socks with maroon stripes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-16 bg-accent/10 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Uniform Guidelines</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              All students are required to wear the complete official school uniform during school hours and 
              at all school-related events. The uniform must be clean, well-maintained, and worn with pride.
            </p>
            <p>
              <span className="font-semibold text-foreground">School Colors:</span> Our distinctive maroon represents 
              strength, determination, and academic excellence, while the gold accents symbolize achievement, 
              wisdom, and the bright future we strive to build for every student.
            </p>
            <p>
              Uniforms can be purchased from authorized suppliers. For more information about uniform requirements 
              and suppliers, please contact the school administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uniform;
