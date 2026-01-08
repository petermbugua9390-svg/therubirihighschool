import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Group navigation items for cleaner layout
  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
  ];

  const studentResources = [
    { name: "CBC Curriculum", path: "/cbc" },
    { name: "School Placement", path: "/school-placement" },
    { name: "KUCCPS", path: "/kuccps" },
    { name: "HELB", path: "/helb" },
  ];

  const careerLinks = [
    { name: "Career Guidance", path: "/career-guidance" },
    { name: "CV Builder", path: "/cv-builder" },
  ];

  const communityLinks = [
    { name: "Co-Curricular", path: "/co-curricular" },
    { name: "Teachers", path: "/teachers" },
    { name: "Alumni", path: "/alumni" },
    { name: "Gallery", path: "/gallery" },
    { name: "Uniform", path: "/uniform" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (links: { path: string }[]) => 
    links.some(link => location.pathname === link.path);

  const NavDropdown = ({ 
    label, 
    links 
  }: { 
    label: string; 
    links: { name: string; path: string }[] 
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isDropdownActive(links)
            ? "bg-accent text-accent-foreground"
            : "text-primary-foreground hover:bg-accent/80 hover:text-accent-foreground"
        }`}
      >
        {label}
        <ChevronDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border">
        {links.map((link) => (
          <DropdownMenuItem key={link.path} asChild>
            <Link
              to={link.path}
              className={`w-full cursor-pointer ${
                isActive(link.path) ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MobileDropdown = ({ 
    label, 
    links 
  }: { 
    label: string; 
    links: { name: string; path: string }[] 
  }) => {
    const isOpenDropdown = openMobileDropdown === label;
    
    return (
      <div>
        <button
          onClick={() => setOpenMobileDropdown(isOpenDropdown ? null : label)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isDropdownActive(links)
              ? "bg-accent text-accent-foreground"
              : "text-primary-foreground hover:bg-accent/80 hover:text-accent-foreground"
          }`}
        >
          {label}
          <ChevronDown 
            size={14} 
            className={`transition-transform ${isOpenDropdown ? "rotate-180" : ""}`} 
          />
        </button>
        {isOpenDropdown && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-accent/50 pl-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground hover:bg-accent/80 hover:text-accent-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Row - Branding */}
        <div className="flex items-center justify-between h-14 border-b border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-primary-foreground">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-wide">
                THE RUBIRI HIGH SCHOOL
              </h1>
              <p className="text-xs md:text-sm text-accent-foreground font-medium tracking-widest">
                MWANZO MPYA
              </p>
            </div>
          </Link>

          {/* Quick Links - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/portal"
              className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Portal
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 border border-primary-foreground/30 text-primary-foreground rounded-md text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary-foreground hover:text-accent-foreground transition-colors p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Bottom Row - Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-1 h-12">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground hover:bg-accent/80 hover:text-accent-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <NavDropdown label="Student Resources" links={studentResources} />
          <NavDropdown label="Career" links={careerLinks} />
          <NavDropdown label="Community" links={communityLinks} />
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-accent text-accent-foreground"
                      : "text-primary-foreground hover:bg-accent/80 hover:text-accent-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <MobileDropdown label="Student Resources" links={studentResources} />
              <MobileDropdown label="Career" links={careerLinks} />
              <MobileDropdown label="Community" links={communityLinks} />
              
              <div className="pt-3 mt-3 border-t border-primary-foreground/20 space-y-2">
                <Link
                  to="/portal"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 bg-accent text-accent-foreground rounded-md text-sm font-semibold text-center"
                >
                  Portal
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 border border-primary-foreground/30 text-primary-foreground rounded-md text-sm font-medium text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
