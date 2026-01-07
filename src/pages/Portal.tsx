import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Briefcase, UserCheck } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

type PortalType = 'student' | 'alumni' | 'teacher' | 'staff' | 'non_teaching_staff';

interface PortalOption {
  type: PortalType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const portalOptions: PortalOption[] = [
  {
    type: 'student',
    title: 'Student Portal',
    description: 'Access learning materials, assignments, and academic resources',
    icon: <GraduationCap className="h-12 w-12" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    type: 'alumni',
    title: 'Alumni Portal',
    description: 'Stay connected, network with fellow graduates, and give back',
    icon: <Users className="h-12 w-12" />,
    color: 'from-green-500 to-green-600'
  },
  {
    type: 'teacher',
    title: 'Teachers Portal',
    description: 'Manage classes, upload materials, and track student progress',
    icon: <BookOpen className="h-12 w-12" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    type: 'staff',
    title: 'Staff Portal',
    description: 'Administrative tools and school management resources',
    icon: <Briefcase className="h-12 w-12" />,
    color: 'from-orange-500 to-orange-600'
  },
  {
    type: 'non_teaching_staff',
    title: 'Non-Teaching Staff Portal',
    description: 'Support services management and resources',
    icon: <UserCheck className="h-12 w-12" />,
    color: 'from-teal-500 to-teal-600'
  }
];

const Portal = () => {
  const navigate = useNavigate();

  const handlePortalSelect = (type: PortalType) => {
    navigate(`/portal/auth?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Rubiri High School Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Select your portal to access personalized resources and tools
          </motion.p>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Portal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each portal is designed to provide you with the specific tools and resources you need.
              Select your category to login or register.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portalOptions.map((option, index) => (
              <AnimatedSection key={option.type} delay={index * 0.1}>
                <Card 
                  className="h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/50"
                  onClick={() => handlePortalSelect(option.type)}
                >
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-4 rounded-full bg-gradient-to-r ${option.color} text-white mb-4`}>
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {option.description}
                    </CardDescription>
                    <Button className="w-full mt-4" variant="outline">
                      Access Portal
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What You Can Do</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Access Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Download notes, past papers, and learning resources
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Network with teachers, students, and alumni
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor academic performance and achievements
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portal;
