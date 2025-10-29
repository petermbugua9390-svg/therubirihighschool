import { useState } from "react";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-students.jpg";
import cbcImage from "@/assets/cbc-learning.jpg";
import sportsImage from "@/assets/sports-action.jpg";
import cultureImage from "@/assets/music-culture.jpg";
import alumniImage from "@/assets/alumni-celebration.jpg";
import clubsImage from "@/assets/clubs-activities.jpg";
import treePlanting1 from "@/assets/tree-planting-1.jpg";
import treePlanting2 from "@/assets/tree-planting-2.jpg";
import treePlanting3 from "@/assets/tree-planting-3.jpg";
import treePlanting4 from "@/assets/tree-planting-4.jpg";
import treePlanting5 from "@/assets/tree-planting-5.jpg";
import treePlanting6 from "@/assets/tree-planting-6.jpg";
import treePlanting7 from "@/assets/tree-planting-7.jpg";
import treePlanting8 from "@/assets/tree-planting-8.jpg";
import treePlanting9 from "@/assets/tree-planting-9.jpg";
import treePlanting10 from "@/assets/tree-planting-10.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const imagesByCategory = {
    Academic: [
      { src: heroImage, title: "Active Learning" },
      { src: cbcImage, title: "CBC Practical Sessions" },
    ],
    Sports: [
      { src: sportsImage, title: "Sports Excellence" },
    ],
    Culture: [
      { src: cultureImage, title: "National Music Festival 2024" },
    ],
    Clubs: [
      { src: clubsImage, title: "Business Club Collaboration" },
    ],
    Alumni: [
      { src: alumniImage, title: "Graduation Celebration" },
    ],
    Environment: [
      { src: treePlanting1, title: "Tree Planting Initiative" },
      { src: treePlanting2, title: "Environmental Conservation" },
      { src: treePlanting3, title: "Student-Led Tree Planting" },
      { src: treePlanting4, title: "Building Green Futures" },
      { src: treePlanting5, title: "Environment Club in Action" },
      { src: treePlanting6, title: "Nurturing Nature" },
      { src: treePlanting7, title: "Community Tree Planting" },
      { src: treePlanting8, title: "Hands-On Environmental Work" },
      { src: treePlanting9, title: "Leading Environmental Change" },
      { src: treePlanting10, title: "Sustainable Future Projects" },
    ],
  };

  const categories = [
    { name: "Academic", description: "Classroom learning and educational excellence", count: imagesByCategory.Academic.length },
    { name: "Sports", description: "Athletic achievements and team spirit", count: imagesByCategory.Sports.length },
    { name: "Culture", description: "Music, drama, and cultural celebrations", count: imagesByCategory.Culture.length },
    { name: "Clubs", description: "Student clubs and co-curricular activities", count: imagesByCategory.Clubs.length },
    { name: "Environment", description: "Tree planting and conservation efforts", count: imagesByCategory.Environment.length },
    { name: "Alumni", description: "Celebrating our graduates", count: imagesByCategory.Alumni.length },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Capturing moments of excellence, growth, and community at The Rubiri High School
          </p>
        </div>
      </section>

      {/* Category Albums or Selected Category View */}
      {!selectedCategory ? (
        // Show Category Albums
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Photo Albums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card
                  key={category.name}
                  className="overflow-hidden cursor-pointer group shadow-lg hover:shadow-maroon transition-all duration-300"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="relative h-64">
                    <img
                      src={imagesByCategory[category.name as keyof typeof imagesByCategory][0].src}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent flex items-end p-6">
                      <div className="text-primary-foreground">
                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm opacity-90 mb-2">{category.description}</p>
                        <p className="text-xs font-semibold">{category.count} {category.count === 1 ? 'photo' : 'photos'}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        // Show Selected Category Images
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-8 text-accent font-semibold hover:underline flex items-center gap-2"
            >
              ← Back to Albums
            </button>

            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">{selectedCategory}</h2>

            {/* Environmental Conservation Quote - Only for Environment Category */}
            {selectedCategory === "Environment" && (
              <div className="max-w-5xl mx-auto mb-12">
                <blockquote className="text-2xl font-bold text-accent italic border-l-4 border-accent pl-8 bg-secondary p-8 rounded-lg shadow-maroon">
                  "We do not inherit the earth from our ancestors; we borrow it from our children. Every tree we plant is a promise of a greener, 
                  healthier future — a legacy of hope and responsibility that defines the Rubiri spirit."
                </blockquote>
                <p className="text-lg text-muted-foreground mt-6 text-center leading-relaxed">
                  At The Rubiri High School, environmental conservation is more than a program — it's a commitment to sustainable stewardship 
                  and a better tomorrow for all.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {imagesByCategory[selectedCategory as keyof typeof imagesByCategory]?.map((image, index) => (
                <Card
                  key={index}
                  className="overflow-hidden cursor-pointer group shadow-lg hover:shadow-maroon transition-all duration-300"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <h3 className="text-primary-foreground text-xl font-bold">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="text-foreground font-bold">{image.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Life Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Student Life at Rubiri</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Life at The Rubiri High School is vibrant, engaging, and transformative. From classroom learning to 
              sports competitions, cultural celebrations to community service — every moment contributes to the 
              holistic development of our students.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Browse through our gallery to see the energy, passion, and excellence that define the Rubiri experience. 
              These images capture the essence of <span className="font-bold text-accent">Mwanzo Mpya</span> — 
              a community where every day brings new opportunities for growth and achievement.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-screen">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-accent transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
