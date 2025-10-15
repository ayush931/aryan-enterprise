'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Factory, Cog, Package, ShieldCheck, Zap, Phone, Mail, MapPin, Menu, X, ChevronRight, Settings, Wrench, Box } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import logo from '../images/aryaLogo.png';
import footerLogo from '../images/footer.png';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  const feedbackSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[0-9\s\-()]{7,20}$/.test(val),
        'Enter a valid phone number'
      ),
    rating: z.enum(['1', '2', '3', '4', '5'], {
      required_error: 'Please select a rating',
    }),
    message: z.string().min(10, 'Please provide more details (min 10 chars)'),
  });

  type FeedbackValues = z.infer<typeof feedbackSchema>;

  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      rating: undefined as unknown as FeedbackValues['rating'],
      message: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (values: FeedbackValues) => {
    try {
      setSubmitting(true);
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to send feedback');
      }
      toast({
        title: 'Thank you for your feedback!',
        description: 'We appreciate you taking the time to help us improve.',
      });
      form.reset();
    } catch (e: any) {
      toast({
        title: 'Could not send feedback',
        description: e?.message || 'Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} border-b ${isScrolled ? 'border-gray-200' : 'border-white/20'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Image src={logo} alt='headerLogo' height={10} width={100} />
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-blue-300 transition-colors font-medium`}>
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-blue-300 transition-colors font-medium`}>
                About
              </button>
              <button onClick={() => scrollToSection('products')} className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-blue-300 transition-colors font-medium`}>
                Products
              </button>
              <button onClick={() => scrollToSection('services')} className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-blue-300 transition-colors font-medium`}>
                Services
              </button>
              <button onClick={() => scrollToSection('feedback')} className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-blue-300 transition-colors font-medium`}>
                Feedback
              </button>
              <button onClick={() => scrollToSection('contact')} className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-blue-300 transition-colors font-medium`}>
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg hover:bg-white/10 ${isScrolled ? 'text-black' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-lg bg-slate-900/95 border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-black">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-black">
                About
              </button>
              <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-black">
                Products
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-black">
                Services
              </button>
              <button onClick={() => scrollToSection('feedback')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-black">
                Feedback
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-black">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://www.pexels.com/download/video/5348783/" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center mb-12 max-w-7xl mx-auto">
            <div className="inline-flex items-center justify-center p-2 mb-6">
              <Badge variant="outline" className="text-blue-200 border-blue-300 bg-blue-950/50 backdrop-blur-sm px-4 py-2">
                Manufacturer of Industrial Equipment
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Innovative Solutions for
              <br />
              Industrial Excellence
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Leading manufacturer of Welded & Bolted Silos, Screw Conveyors, Dust Collectors, and complete material handling solutions for RMC plants and industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('products')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 shadow-xl">
                Explore Products
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl">
                Get In Touch
              </Button>
            </div>
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
                  We closely work with engineering, construction, and Ready Mix Concrete solution providers to enhance their complex operational challenges by designing, manufacturing & executing various concepts & equipment. Leveraging profound engineering knowledge and project management expertise, we enable innovation at our clients&#39; processes to maximize their return on investment (ROI) in every project or venture.
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

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              In Action
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A glimpse of industrial equipment and environments relevant to our products and services.
            </p>
          </div>

          {(() => {
            const photos = [
              {
                src:
                  'https://images.pexels.com/photos/236089/pexels-photo-236089.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
                alt: 'Industrial silos and structures',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  'https://images.pexels.com/photos/256983/pexels-photo-256983.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
                alt: 'Factory interior with machinery',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
                alt: 'Conveyor system and material handling',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
            ];

            return (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((p, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl shadow-xl border border-white/30 backdrop-blur-md bg-white/60"
                  >
                    <div className="aspect-[4/3] bg-slate-200">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                      <div className="text-sm opacity-90">{p.alt}</div>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-xs text-blue-200 hover:text-white"
                      >
                        Image credit: {p.credit}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <p className="text-xs text-gray-500 mt-6 text-center">
            Images are for illustrative purposes and sourced from open resources like Pexels.
          </p>
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

      {/* Feedback Section */}
      <section id="feedback" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Feedback
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tell us how we&#39;re doing. Your feedback helps us serve you better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <Card className="backdrop-blur-xl bg-white/80 border-white/30 shadow-2xl">
              <CardHeader>
                <CardTitle>Share your experience</CardTitle>
                <CardDescription>
                  We read every submission. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormDescription>If you&#39;d like us to call you back.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall rating *</FormLabel>
                          <FormDescription>How would you rate your experience?</FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-5 gap-4"
                            >
                              {(['1', '2', '3', '4', '5'] as const).map((val) => (
                                <div key={val} className="flex items-center space-x-2">
                                  <RadioGroupItem value={val} id={`rating-${val}`} />
                                  <label htmlFor={`rating-${val}`} className="text-sm text-gray-700">
                                    {val}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comments *</FormLabel>
                          <FormControl>
                            <Textarea rows={5} placeholder="What went well? What can we improve?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-gray-500">Average response time: under 48 hours</p>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                        {submitting ? 'Sending…' : 'Submit Feedback'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">We value your voice</h3>
              <p className="text-blue-100 mb-6">
                Whether it&#39;s praise or suggestions, your insights help us build better products and services.
              </p>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start space-x-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-white" />
                  <span>Used to improve product quality and support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-white" />
                  <span>No spam, ever — we only contact if follow-up is needed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-white" />
                  <span>Anonymous feedback? Leave name/email blank</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Image src={footerLogo} alt='headerLogo' height={10} width={100} />
              <br />
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
                  <button onClick={() => scrollToSection('feedback')} className="hover:text-blue-400 transition-colors">
                    Feedback
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
