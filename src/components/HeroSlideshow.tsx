import { useState, useEffect } from "react";
import classroomLearning from "@/assets/hero/classroom-learning.jpg";
import chemistryLab from "@/assets/hero/chemistry-lab.jpg";
import computerStudies from "@/assets/hero/computer-studies.jpg";
import libraryStudy from "@/assets/hero/library-study.jpg";
import physicsLab from "@/assets/hero/physics-lab.jpg";
import biologyPractical from "@/assets/hero/biology-practical.jpg";
import mathematicsClass from "@/assets/hero/mathematics-class.jpg";
import groupDiscussion from "@/assets/hero/group-discussion.jpg";
import artClass from "@/assets/hero/art-class.jpg";
import musicLessons from "@/assets/hero/music-lessons.jpg";
import sportsField from "@/assets/hero/sports-field.jpg";
import teacherMentoring from "@/assets/hero/teacher-mentoring.jpg";
import dramaPerformance from "@/assets/hero/drama-performance.jpg";
import geographyStudy from "@/assets/hero/geography-study.jpg";
import literatureClass from "@/assets/hero/literature-class.jpg";
import technicalWorkshop from "@/assets/hero/technical-workshop.jpg";
import digitalLearning from "@/assets/hero/digital-learning.jpg";
import environmentalStudy from "@/assets/hero/environmental-study.jpg";
import businessStudies from "@/assets/hero/business-studies.jpg";
import agriculturePractical from "@/assets/hero/agriculture-practical.jpg";

interface HeroSlideshowProps {
  title: string;
  subtitle: string;
  className?: string;
}

const HeroSlideshow = ({ title, subtitle, className = "" }: HeroSlideshowProps) => {
  const heroImages = [
    classroomLearning,
    chemistryLab,
    computerStudies,
    libraryStudy,
    physicsLab,
    biologyPractical,
    mathematicsClass,
    groupDiscussion,
    artClass,
    musicLessons,
    sportsField,
    teacherMentoring,
    dramaPerformance,
    geographyStudy,
    literatureClass,
    technicalWorkshop,
    digitalLearning,
    environmentalStudy,
    businessStudies,
    agriculturePractical,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className={`relative h-[60vh] flex items-center justify-center text-center overflow-hidden ${className}`}>
      {/* Image Slideshow Container */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 hero-slide ${
              currentImageIndex === index ? "hero-slide-active" : "hero-slide-inactive"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(128, 0, 32, 0.5)), url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground max-w-3xl mx-auto animate-fade-in">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HeroSlideshow;
