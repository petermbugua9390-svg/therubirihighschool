import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with The Rubiri High School — we're here to answer your questions
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-foreground">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We welcome inquiries from prospective students, parents, and the community. 
                Feel free to reach out via phone, email, or visit our campus.
              </p>

              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Phone</h3>
                        <p className="text-muted-foreground">+254708992922</p>
                        <p className="text-muted-foreground">+254708993177</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Email</h3>
                        <p className="text-muted-foreground">rubirisecondaryschool@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Address</h3>
                        <p className="text-muted-foreground">
                          P.O. Box 1828–20117<br />
                          Naivasha, Nakuru County<br />
                          Kenya
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-foreground">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground hover:bg-accent/80 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground hover:bg-accent/80 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground hover:bg-accent/80 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-maroon">
                <CardContent className="pt-6">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is your inquiry about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-foreground">Visit Our Campus</h2>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-maroon" style={{ height: "450px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127640.89827636!2d36.27!3d-0.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828f8e41ef55bd9%3A0x1e3ec8a2b7f8f3f5!2sNaivasha%2C%20Kenya!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="School Location"
              />
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Located in Naivasha, Nakuru County — a serene environment perfect for learning and growth
            </p>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Office Hours</h2>
            <Card className="shadow-maroon">
              <CardContent className="pt-6">
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between">
                    <span className="font-semibold">Monday - Friday:</span>
                    <span className="text-muted-foreground">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Saturday:</span>
                    <span className="text-muted-foreground">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sunday:</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
