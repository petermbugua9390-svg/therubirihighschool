import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import CBC from "./pages/CBC";
import SchoolPlacement from "./pages/SchoolPlacement";
import CoCurricular from "./pages/CoCurricular";
import Teachers from "./pages/Teachers";
import Admissions from "./pages/Admissions";
import Alumni from "./pages/Alumni";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Uniform from "./pages/Uniform";
import KUCCPS from "./pages/KUCCPS";
import HELB from "./pages/HELB";
import CareerGuidance from "./pages/CareerGuidance";
import CVBuilder from "./pages/CVBuilder";
import Portal from "./pages/Portal";
import PortalAuth from "./pages/PortalAuth";
import PortalDashboard from "./pages/PortalDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/academics" element={<PageTransition><Academics /></PageTransition>} />
        <Route path="/cbc" element={<PageTransition><CBC /></PageTransition>} />
        <Route path="/school-placement" element={<PageTransition><SchoolPlacement /></PageTransition>} />
        <Route path="/co-curricular" element={<PageTransition><CoCurricular /></PageTransition>} />
        <Route path="/teachers" element={<PageTransition><Teachers /></PageTransition>} />
        <Route path="/admissions" element={<PageTransition><Admissions /></PageTransition>} />
        <Route path="/alumni" element={<PageTransition><Alumni /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/uniform" element={<PageTransition><Uniform /></PageTransition>} />
        <Route path="/kuccps" element={<PageTransition><KUCCPS /></PageTransition>} />
        <Route path="/helb" element={<PageTransition><HELB /></PageTransition>} />
        <Route path="/career-guidance" element={<PageTransition><CareerGuidance /></PageTransition>} />
        <Route path="/cv-builder" element={<PageTransition><CVBuilder /></PageTransition>} />
        <Route path="/portal" element={<PageTransition><Portal /></PageTransition>} />
        <Route path="/portal/auth" element={<PageTransition><PortalAuth /></PageTransition>} />
        <Route path="/portal/dashboard" element={<PageTransition><PortalDashboard /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <BackToTop />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
