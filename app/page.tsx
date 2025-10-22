'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Factory, Cog, Package, ShieldCheck, Zap, Phone, Mail, MapPin, Menu, X, ChevronRight, Settings, Wrench, Box, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import logo from '../public/images/aryaLogo.png';
import footerLogo from '../public/images/footer.png';

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
    <div className="min-h-screen bg-white">
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
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                About
              </button>
              <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                Products
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                Services
              </button>
              <button onClick={() => scrollToSection('feedback')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                Feedback
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
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
            <source src={'/videos/5348783-hd_1920_1080_30fps.mp4'} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 max-w-7xl mx-auto">
            <div className="inline-flex items-center justify-center p-1 sm:p-2 mb-4 sm:mb-6">
              <Badge variant="outline" className="text-blue-200 border-blue-300 bg-blue-950/50 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                Manufacturer of Industrial Equipment
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl leading-tight">
              Innovative Solutions for
              <br />
              Industrial Excellence
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-lg px-2">
              Leading manufacturer of Welded & Bolted Silos, Screw Conveyors, Dust Collectors, and complete material handling solutions for RMC plants and industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button onClick={() => scrollToSection('products')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-xl">
                Explore Products
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg" className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 md:p-10 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">ARYAN ENTERPRISES</span> is an innovative solutions provider in various industrial segments including RMC plants, Cement, Fly ash, Micro Silica, GGBFS handling, Aggregate & Sand handling.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We closely work with engineering, construction, and Ready Mix Concrete solution providers to enhance their complex operational challenges by designing, manufacturing & executing various concepts & equipment.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Process Optimization</h3>
                    <p className="text-sm text-gray-600">Advanced automation solutions</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Efficiency</h3>
                    <p className="text-sm text-gray-600">Lower expenditure, higher returns</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cog className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Faster ROI</h3>
                    <p className="text-sm text-gray-600">Quick returns & longevity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 group">
              <Factory className="h-10 w-10 mb-3 opacity-80 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold mb-1">15+</div>
              <div className="text-blue-100 text-sm">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 group">
              <Package className="h-10 w-10 mb-3 opacity-80 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold mb-1">500+</div>
              <div className="text-slate-200 text-sm">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 group">
              <ShieldCheck className="h-10 w-10 mb-3 opacity-80 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-emerald-100 text-sm">Quality Assured</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 group">
              <Cog className="h-10 w-10 mb-3 opacity-80 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold mb-1">24/7</div>
              <div className="text-orange-100 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-1">
                Premium Quality
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Our Products
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive range of industrial equipment designed for efficiency and reliability
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mt-4"></div>
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
              <Card key={index} className="backdrop-blur-lg bg-slate-800/80 border-slate-700/50 shadow-xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all hover:-translate-y-2 group relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <CardHeader>
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <product.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">{product.title}</CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm text-gray-300 group/item hover:text-blue-300 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
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
      <section id="services" className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-blue-100 text-blue-600 border-blue-200 px-4 py-1">
                Expert Solutions
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete material handling solutions from design to installation
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Silo Feeding Systems',
                description: 'Complete bulker unloading systems and dual cement feeding systems. Reduces dependency on compressor-mounted bulkers with high-performance electric motors (40-60 HP).',
                features: ['Bulker Unloading Units', 'Dual Cement Feeding', 'Advanced Control Panels', 'Manual Butterfly Valves'],
                icon: Factory,
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Inclined & Vertical Screw Feeding',
                description: 'Vertical and inclined screw feeding systems for cement bag feeding to silos. Lower electrical load compared to pneumatic systems, most cost-effective solution.',
                features: ['Low Power Consumption', 'Dust & Pollution Free', 'Adjustable Vibrating Force', 'Easy Operation'],
                icon: Settings,
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                title: 'Custom Design & Manufacturing',
                description: 'Tailored solutions for specific operational requirements. Custom colors, logo placement, and personalization available for all equipment.',
                features: ['Bespoke Engineering', 'Quality Materials', 'Custom Branding', 'Technical Support'],
                icon: Wrench,
                color: 'from-orange-500 to-orange-600'
              },
              {
                title: 'Installation & Commissioning',
                description: 'Professional installation services with comprehensive project management. Rapid setup and commissioning with full technical documentation.',
                features: ['Expert Installation', 'Site Supervision', 'Testing & Commissioning', 'Training Provided'],
                icon: ShieldCheck,
                color: 'from-indigo-500 to-indigo-600'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity"></div>

                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="mt-1 bg-blue-100 rounded-full p-1 group-hover:bg-blue-200 transition-colors">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-indigo-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-1">
                Our Work
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              In Action
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A glimpse of industrial equipment and environments relevant to our products and services
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mt-4"></div>
          </div>

          {(() => {
            const photos = [
              {
                src:
                  '../images/pict1.jpg',
                alt: 'Industrial silos and structures',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  '../images/pict2.jpg',
                alt: 'Factory interior with machinery',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  '../images/pict3.jpg',
                alt: 'Conveyor system and material handling',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  '../images/pict4.jpg',
                alt: 'Industrial silos and structures',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  '../images/pict5.jpg',
                alt: 'Factory interior with machinery',
                credit: 'Pexels',
                link: 'https://www.pexels.com',
              },
              {
                src:
                  '../images/pict6.jpg',
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
                      {/* <div className="text-sm opacity-90">{p.alt}</div> */}
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
      <section id="contact" className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-blue-100 text-blue-600 border-blue-200 px-4 py-1">
                Contact Us
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Contact us for inquiries, quotes, or technical support
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-5">
              <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all hover:-translate-y-1 border border-blue-100">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Corporate Office</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ring Road No.2, Near Prince Dhaba,<br />
                    Opp. Essar Petrol Pump, Raipur
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-white to-emerald-50 hover:shadow-xl transition-all hover:-translate-y-1 border border-emerald-100">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Factory Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ring Road No.2, Near Prince Dhaba,<br />
                    Opp. Essar Petrol Pump, Raipur
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 hover:shadow-xl transition-all hover:-translate-y-1 border border-orange-100">
                <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Phone</h4>
                  <a href="tel:+919691177778" className="text-orange-600 hover:text-orange-700 font-semibold text-lg">
                    +91 9171110052{", "}
                    +91 9171110060
                  </a>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50 hover:shadow-xl transition-all hover:-translate-y-1 border border-indigo-100">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                  <a href="mailto:aryanenterprisescg@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-semibold break-all">
                    aryanenterprisescg@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Request a Quote</h3>
                <p className="mb-8 text-blue-100 leading-relaxed">
                  Our team of experts is ready to help you find the perfect solution for your industrial needs.
                </p>
                <div className="space-y-4 mb-8">
                  <h4 className="font-bold mb-4 text-lg">Why Choose Us?</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-50">ISO certified manufacturing</span>
                    </div>
                    <div className="flex items-start space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-50">Competitive pricing</span>
                    </div>
                    <div className="flex items-start space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-50">Quick delivery & installation</span>
                    </div>
                    <div className="flex items-start space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-50">Comprehensive after-sales support</span>
                    </div>
                    <div className="flex items-start space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-50">Custom solutions available</span>
                    </div>
                  </div>
                </div>
                <Button onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/files/Aryan Equipment Booklet.pdf"
                  link.download = "Aryan Equipment Booklet.pdf"
                  link.click()
                }} className="w-full bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all hover:scale-105" size="lg">
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-1">
                We Value Your Opinion
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Feedback
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tell us how we&#39;re doing. Your feedback helps us serve you better
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mt-4"></div>
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919691177778"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>

          {/* Main button */}
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50">
            <MessageCircle className="h-7 w-7" fill="currentColor" />
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl">
              Chat on WhatsApp
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
