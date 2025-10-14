'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Factory, Cog, Package, ShieldCheck, Zap, Phone, Mail, MapPin, Menu, X, ChevronRight, Settings, Wrench, Box } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ARYAN ENTERPRISES
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-lg bg-white/95 border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Products
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 mb-6">
              <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 px-4 py-2">
                Manufacturer of Industrial Equipment
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Innovative Solutions for
              <br />
              Industrial Excellence
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Leading manufacturer of Welded & Bolted Silos, Screw Conveyors, Dust Collectors, and complete material handling solutions for RMC plants and industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('products')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Explore Products
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg" className="text-lg px-8">
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Glass Card Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: ShieldCheck, title: 'Quality Assured', description: 'ISO certified manufacturing with stringent quality controls' },
              { icon: Zap, title: 'Fast Delivery', description: 'Quick turnaround with ex-stock availability' },
              { icon: Settings, title: 'Custom Solutions', description: 'Tailored designs to meet specific requirements' }
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  About Us
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <span className="font-semibold text-gray-900">ARYAN ENTERPRISES</span> is an innovative solutions provider in various industrial segments including RMC plants, Cement, Fly ash, Micro Silica, GGBFS handling, Aggregate & Sand handling.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We closely work with engineering, construction, and Ready Mix Concrete solution providers to enhance their complex operational challenges by designing, manufacturing & executing various concepts & equipment. Leveraging profound engineering knowledge and project management expertise, we enable innovation at our clients' processes to maximize their return on investment (ROI) in every project or venture.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Process optimization & automation</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Lower expenditure & improved efficiency</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Faster ROI & longevity</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                  <Factory className="h-10 w-10 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-blue-100 text-sm">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white shadow-lg">
                  <Package className="h-10 w-10 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-slate-200 text-sm">Projects Completed</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                  <ShieldCheck className="h-10 w-10 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-emerald-100 text-sm">Quality Assured</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                  <Cog className="h-10 w-10 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-orange-100 text-sm">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Our Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive range of industrial equipment designed for efficiency and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Cards */}
            {[
              {
                title: 'Welded Cement Silos',
                description: 'Suitable for medium-big storages, realized in carbon or stainless steel. Available in capacities from 35M³ (50 Ton) to 144M³ (200 Ton). Rapid and safe erection on site.',
                icon: Building2,
                features: ['Carbon/Stainless Steel', 'Rapid Installation', 'Customizable Design', 'CE35 to CE144 Models']
              },
              {
                title: 'Horizontal Silos',
                description: 'Mobile silos with high productivity for powder storage. Self-erecting with telescopic legs, no crane required. Perfect for mobile plants.',
                icon: Box,
                features: ['Self-Erecting Design', 'No Civil Works', 'Highly Portable', 'Multiple Compartments']
              },
              {
                title: 'Screw Conveyors',
                description: 'Tubular screw conveyors for dry inactive powders. Available in sizes Ø168 to Ø323 mm with direct drive unit and standard RM gearboxes.',
                icon: Settings,
                features: ['CSF168 to CSF323', 'Multiple Gear Ratios', 'Anti-Wear Flight', 'Long Life Seals']
              },
              {
                title: 'Dust Collectors',
                description: 'Cylindrical filters with 24 sqm filtering area. POLYPLEAT round type filter elements for cement, fly ash and dry powders. VT, RJT, RJG, and VG models available.',
                icon: Factory,
                features: ['SS304 Body', 'Weather Protection', 'Vibratory/Air Jet Cleaning', 'Ground/Top Mounted']
              },
              {
                title: 'Silo Accessories',
                description: 'Complete range including butterfly valves, pressure relief valves, level indicators, vibrating bin aerator pads, and pneumatic control panels.',
                icon: Wrench,
                features: ['Butterfly Valves', 'Level Indicators', 'Relief Valves', 'Control Panels']
              },
              {
                title: 'Spare Parts',
                description: 'Comprehensive spare parts for screw conveyors and dust collectors. Gear reducers, bearings, filter cartridges, electric vibrators, and internal screws.',
                icon: Cog,
                features: ['Gear Reducers', 'Filter Cartridges', 'Bearing Assemblies', 'Internal Screws']
              }
            ].map((product, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/80 border-white/30 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <CardHeader>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <product.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete material handling solutions from design to installation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Silo Feeding Systems',
                description: 'Complete bulker unloading systems and dual cement feeding systems. Reduces dependency on compressor-mounted bulkers with high-performance electric motors (40-60 HP).',
                features: ['Bulker Unloading Units', 'Dual Cement Feeding', 'Advanced Control Panels', 'Manual Butterfly Valves']
              },
              {
                title: 'Inclined & Vertical Screw Feeding',
                description: 'Vertical and inclined screw feeding systems for cement bag feeding to silos. Lower electrical load compared to pneumatic systems, most cost-effective solution.',
                features: ['Low Power Consumption', 'Dust & Pollution Free', 'Adjustable Vibrating Force', 'Easy Operation']
              },
              {
                title: 'Custom Design & Manufacturing',
                description: 'Tailored solutions for specific operational requirements. Custom colors, logo placement, and personalization available for all equipment.',
                features: ['Bespoke Engineering', 'Quality Materials', 'Custom Branding', 'Technical Support']
              },
              {
                title: 'Installation & Commissioning',
                description: 'Professional installation services with comprehensive project management. Rapid setup and commissioning with full technical documentation.',
                features: ['Expert Installation', 'Site Supervision', 'Testing & Commissioning', 'Training Provided']
              }
            ].map((service, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="bg-blue-100 rounded-full p-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-blue-50/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-lg">
                Contact us for inquiries, quotes, or technical support
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-600 rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Corporate Office</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ring Road No.1, Near D.D.U. Nagar,<br />
                      Housing Board Gate, Opp. Manuas Realty,<br />
                      Raipur - 492001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-600 rounded-lg p-3">
                    <Factory className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Factory Address</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ring Road No.2, Near Prince Dhaba,<br />
                      Opp. Essar Petrol Pump, Raipur
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-600 rounded-lg p-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                    <a href="tel:+919691177778" className="text-blue-600 hover:text-blue-700 font-medium">
                      +91 9691177778
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-600 rounded-lg p-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                    <a href="mailto:aryanenterprisescg@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium break-all">
                      aryanenterprisescg@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
                <p className="mb-6 text-blue-100">
                  Our team of experts is ready to help you find the perfect solution for your industrial needs.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Why Choose Us?</h4>
                    <ul className="space-y-2 text-blue-100">
                      <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <span>ISO certified manufacturing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <span>Competitive pricing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <span>Quick delivery & installation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <span>Comprehensive after-sales support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4" />
                        <span>Custom solutions available</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 mt-6" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">ARYAN ENTERPRISES</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Leading manufacturer of industrial equipment for RMC plants, cement handling, and material handling solutions. Committed to quality, innovation, and customer satisfaction.
              </p>
              <div className="text-sm text-slate-400">
                <p>Raipur, Chhattisgarh</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('products')} className="hover:text-blue-400 transition-colors">
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Welded Silos</li>
                <li>Horizontal Silos</li>
                <li>Screw Conveyors</li>
                <li>Dust Collectors</li>
                <li>Accessories</li>
                <li>Spare Parts</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Aryan Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
