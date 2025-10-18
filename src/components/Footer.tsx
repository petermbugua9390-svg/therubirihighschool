import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent-foreground">The Rubiri High School</h3>
            <p className="text-sm mb-2 italic">MWANZO MPYA</p>
            <p className="text-sm font-semibold mb-4">Committed to Excellence</p>
            <p className="text-sm opacity-90">
              A transformative learning institution providing quality education and skills for lifelong success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-accent-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-accent-foreground transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-accent-foreground transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent-foreground transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p>+254708992922</p>
                  <p>+254708993177</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <p>rubirisecondaryschool@gmail.com</p>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p>P.O. Box 1828–20117<br />Naivasha, Nakuru County</p>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-foreground">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 The Rubiri High School — Committed to Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
