"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Factory,
  Gauge,
  TrendingUp,
  Zap,
  Clock,
  Shield,
  Package,
  Settings,
  Truck,
  Wind,
  Wrench,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      title: "Welded Cement Silo",
      description: "Medium to large storage solutions for cement, available from 35M³ to 144M³ capacity",
      icon: Package,
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Horizontal Silo",
      description: "Mobile silos with telescopic legs, perfect for on-site flexibility",
      icon: Truck,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Screw Conveyors",
      description: "Tubular conveyors from Ø168 to Ø323mm for efficient material transport",
      icon: Settings,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      title: "Dust Collectors",
      description: "High-efficiency filtration systems with 24 sqm filtering area",
      icon: Wind,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Silo Accessories",
      description: "Complete range including butterfly valves, pressure relief valves, and level indicators",
      icon: Wrench,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Feeding Systems",
      description: "Bulker unloading and dual cement feeding systems for optimal efficiency",
      icon: Zap,
      gradient: "from-red-500 to-rose-600",
    },
  ];

  const features = [
    {
      icon: Gauge,
      title: "Process Optimization",
      description: "Advanced automation and efficiency improvements",
    },
    {
      icon: TrendingUp,
      title: "Faster ROI",
      description: "Maximize return on investment in every project",
    },
    {
      icon: Clock,
      title: "Longevity",
      description: "Built to last with premium materials and engineering",
    },
    {
      icon: Shield,
      title: "Lower Expenditure",
      description: "Cost-effective solutions without compromising quality",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-blue-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Factory className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ARYAN ENTERPRISES</h1>
                <p className="text-xs text-blue-300">Raipur</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "About", "Products", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/90 hover:text-orange-400 transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/30">
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {["Home", "About", "Products", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-white/90 hover:text-orange-400 transition-colors duration-300 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Manufacturer of
              <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Welded & Bolted Silos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Innovative solutions for RMC plants, Cement, Fly ash, and material handling systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-8 py-6 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                Explore Products
                <ChevronRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: "Years Experience", value: "15+" },
              { label: "Projects Completed", value: "500+" },
              { label: "Happy Clients", value: "200+" },
              { label: "Products Range", value: "50+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-blue-200 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-blue-200">
              Innovative solutions provider with a focus on excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* About Content */}
          <div className="glass-card p-8 md:p-12 mt-12">
            <h3 className="text-3xl font-bold text-white mb-6">About Us</h3>
            <div className="space-y-4 text-blue-100 leading-relaxed">
              <p>
                <span className="text-orange-400 font-semibold">ARYAN ENTERPRISES</span> is an innovative solutions provider in various industrial segments like RMC plants, Cement, Fly ash, Micro Silica, GGBFS handling, Aggregate & Sand handling.
              </p>
              <p>
                We closely work with engineering, constructions, Ready mix Concrete, solution provider to enhance their complex operational challenges by design, manufacture & execute various concepts & equipment.
              </p>
              <p>
                Leveraging profound engineering knowledge, project management expertise, we enable innovation at our clients' processes to maximize their return on investment (ROI) in every project or venture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Products
            </h2>
            <p className="text-xl text-blue-200">
              Comprehensive range of industrial equipment and solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="glass-card p-8 group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                >
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {product.title}
                </h3>
                <p className="text-blue-200 mb-6">{product.description}</p>
                <Button
                  variant="ghost"
                  className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 p-0 h-auto"
                >
                  Learn More
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-blue-200">
              Ready to discuss your project? Contact us today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Phone</h3>
                    <p className="text-blue-200">+91 9691177778</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <p className="text-blue-200 break-all">aryanenterprisescg@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Corporate Office</h3>
                    <p className="text-blue-200">
                      Ring Road No1, Near D.D.U. Nagar, Housing Board Gate, Raipur-492001
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Factory</h3>
                    <p className="text-blue-200">
                      Ring Road No.2, Near Prince Dhaba, Opp. Essar Petrol Pump
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-6 text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-blue-200">
          <p>&copy; 2025 Aryan Enterprises Raipur. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Manufacturer of Welded Silo / Bolted Silo | Screw Conveyors | Dust Collectors
          </p>
        </div>
      </footer>
    </div>
  );
}
