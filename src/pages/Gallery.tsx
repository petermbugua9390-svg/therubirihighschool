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

  const images = [
    { src: heroImage, title: "Active Learning", category: "Academic" },
    { src: cbcImage, title: "CBC Practical Sessions", category: "Academic" },
    { src: clubsImage, title: "Business Club Collaboration", category: "Clubs" },
    { src: sportsImage, title: "Sports Excellence", category: "Sports" },
    { src: cultureImage, title: "National Music Festival 2024", category: "Culture" },
    { src: alumniImage, title: "Graduation Celebration", category: "Alumni" },
    { src: treePlanting1, title: "Tree Planting Initiative", category: "Environment" },
    { src: treePlanting2, title: "Environmental Conservation", category: "Environment" },
    { src: treePlanting3, title: "Student-Led Tree Planting", category: "Environment" },
    { src: treePlanting4, title: "Building Green Futures", category: "Environment" },
    { src: treePlanting5, title: "Environment Club in Action", category: "Environment" },
    { src: treePlanting6, title: "Nurturing Nature", category: "Environment" },
    { src: treePlanting7, title: "Community Tree Planting", category: "Environment" },
    { src: treePlanting8, title: "Hands-On Environmental Work", category: "Environment" },
    { src: treePlanting9, title: "Leading Environmental Change", category: "Environment" },
    { src: treePlanting10, title: "Sustainable Future Projects", category: "Environment" },
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

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
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
                    <div>
                      <p className="text-accent-foreground text-sm font-semibold mb-1">
                        {image.category}
                      </p>
                      <h3 className="text-primary-foreground text-xl font-bold">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <p className="text-accent text-sm font-semibold mb-1">{image.category}</p>
                  <h3 className="text-foreground font-bold">{image.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Photo Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Academic", "Sports", "Culture", "Clubs", "Environment", "Alumni"].map((category) => (
              <div
                key={category}
                className="bg-accent text-accent-foreground py-4 px-6 rounded-lg text-center font-bold hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life */}
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
