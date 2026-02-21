import { useState } from 'react';
import { Code, TrendingUp, Palette, Smartphone, Search, Share2, MapPin, Users as UsersIcon, PenTool, Printer, Monitor, Building2, X, Globe, Megaphone, Pen } from 'lucide-react';

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const servicesData = {
    'Digital & Tech': {
      icon: Globe,
      color: '#0066FF',
      title: '🌐 Digital & Technology Solutions',
      subtitle: 'Build Smart. Scale Fast. Lead the Market.',
      services: [
        {
          icon: Code,
          name: 'Website Development & UI/UX Design',
          shortDesc: 'Custom websites & web apps',
          fullDesc: 'High-performance, conversion-focused websites designed to elevate brand credibility and drive measurable results.',
        },
        {
          icon: Smartphone,
          name: 'Android Application Development',
          shortDesc: 'Native mobile solutions',
          fullDesc: 'Secure, scalable Android apps built to enhance customer engagement and accelerate digital expansion.',
        },
        {
          icon: Building2,
          name: 'ERP Solutions (Schools, Offices & Hospitals)',
          shortDesc: 'Enterprise resource planning',
          fullDesc: 'Intelligent ERP systems that automate operations, centralize data, and improve management efficiency.',
        },
        {
          icon: Monitor,
          name: 'SaaS (Software as a Service) Solutions',
          shortDesc: 'Cloud-based platforms',
          fullDesc: 'Cloud-based SaaS platforms designed for scalability, automation, and recurring revenue growth.',
        },
      ],
    },
    'Digital Marketing': {
      icon: Megaphone,
      color: '#FFC107',
      title: '📈 Digital Marketing & Performance Growth',
      subtitle: 'Visibility That Converts Into Revenue.',
      services: [
        {
          icon: Share2,
          name: 'Social Media Marketing',
          shortDesc: 'SMM & content strategy',
          fullDesc: 'Strategic campaigns that build brand authority and generate consistent leads.',
        },
        {
          icon: Search,
          name: 'Search Engine Optimization (SEO)',
          shortDesc: 'Search engine optimization',
          fullDesc: 'Data-driven SEO strategies that improve rankings and attract high-intent customers.',
        },
        {
          icon: MapPin,
          name: 'Google My Business Optimization',
          shortDesc: 'Local business visibility',
          fullDesc: 'Dominate local search results and convert nearby prospects into loyal clients.',
        },
        {
          icon: UsersIcon,
          name: 'Influencer Marketing',
          shortDesc: 'Brand partnerships',
          fullDesc: 'Partnering with trusted influencers to expand reach and build instant credibility.',
        },
        {
          icon: TrendingUp,
          name: 'Paid Advertising Campaigns',
          shortDesc: 'High-ROI ad strategies',
          fullDesc: 'High-converting ad strategies engineered for measurable ROI and scalable growth.',
        },
      ],
    },
    'Branding': {
      icon: Pen,
      color: '#0066FF',
      title: '🎨 Branding & Creative Strategy',
      subtitle: 'Create Impact. Build Authority.',
      services: [
        {
          icon: Palette,
          name: 'Complete Branding Solutions',
          shortDesc: 'End-to-end brand development',
          fullDesc: 'End-to-end brand development that creates strong, memorable market positioning.',
        },
        {
          icon: Palette,
          name: 'Product Branding',
          shortDesc: 'Strategic product positioning',
          fullDesc: 'Strategic branding that enhances product appeal and customer trust.',
        },
        {
          icon: PenTool,
          name: 'Graphic Design',
          shortDesc: 'Visual identity & assets',
          fullDesc: 'Premium, high-impact visuals that communicate professionalism and consistency.',
        },
        {
          icon: PenTool,
          name: 'Content Creation',
          shortDesc: 'Engaging content',
          fullDesc: 'Compelling content crafted to engage audiences and drive conversions.',
        },
        {
          icon: Printer,
          name: 'Print Media & Corporate Materials',
          shortDesc: 'Professional print solutions',
          fullDesc: 'Professionally designed print solutions that elevate your offline brand presence.',
        },
      ],
    },
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setSelectedCategory(null);
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 px-3 sm:px-4 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full blur-3xl opacity-10" style={{ background: 'var(--primary)' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-block px-3 sm:px-4 py-2 rounded-full glass mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--primary)' }}>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            What <span style={{ color: 'var(--secondary)' }}>We Do</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-[#8B949E] max-w-3xl mx-auto font-medium">
            Comprehensive digital solutions tailored to elevate your business across all channels
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {Object.entries(servicesData).map(([category, data]) => {
            const CategoryIcon = data.icon;
            return (
              <div
                key={category}
                className="p-4 sm:p-6 lg:p-8 rounded-2xl glass hover:border-[#0066FF] transition-all duration-500 hover:scale-[1.02] group cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div 
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center glow-blue flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}dd)` }}
                  >
                    <CategoryIcon size={20} color="white" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold">{category}</h3>
                </div>

                {/* Service Items Preview */}
                <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                  {data.services.slice(0, 3).map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <div
                        key={serviceIndex}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                          <ServiceIcon size={18} style={{ color: data.color }} />
                        </div>
                        <div>
                          <div className="font-semibold mb-1 text-sm">{service.name}</div>
                          <div className="text-xs text-[#8B949E] font-medium">{service.shortDesc}</div>
                        </div>
                      </div>
                    );
                  })}
                  {data.services.length > 3 && (
                    <div className="text-xs text-[#8B949E] pl-3 font-medium">
                      +{data.services.length - 3} more services...
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="w-full px-6 py-3 rounded-xl glass hover:border-[#0066FF] transition-all font-semibold group-hover:bg-[#0066FF]/10"
                >
                  View All Services →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Service Details */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-xl glass hover:border-[#0066FF] transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="pr-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center glow-blue"
                    style={{ background: `linear-gradient(135deg, ${servicesData[selectedCategory as keyof typeof servicesData].color}, ${servicesData[selectedCategory as keyof typeof servicesData].color}dd)` }}
                  >
                    {(() => {
                      const Icon = servicesData[selectedCategory as keyof typeof servicesData].icon;
                      return <Icon size={32} color="white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {servicesData[selectedCategory as keyof typeof servicesData].title}
                    </h2>
                    <p className="text-lg font-semibold" style={{ color: servicesData[selectedCategory as keyof typeof servicesData].color }}>
                      {servicesData[selectedCategory as keyof typeof servicesData].subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-6">
                {servicesData[selectedCategory as keyof typeof servicesData].services.map((service, idx) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl glass hover:border-[#0066FF] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${servicesData[selectedCategory as keyof typeof servicesData].color}20` }}
                        >
                          <ServiceIcon size={24} style={{ color: servicesData[selectedCategory as keyof typeof servicesData].color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                          <p className="text-[#8B949E] font-medium leading-relaxed">{service.fullDesc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Footer */}
              <div className="mt-8 p-6 rounded-2xl text-center" style={{ background: `${servicesData[selectedCategory as keyof typeof servicesData].color}10` }}>
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-[#8B949E] mb-4 font-medium">
                  Let's discuss how we can help transform your business
                </p>
                <a
                  href="#contact"
                  onClick={handleClose}
                  className="inline-block px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 glow-border-blue"
                  style={{ background: `linear-gradient(135deg, ${servicesData[selectedCategory as keyof typeof servicesData].color}, ${servicesData[selectedCategory as keyof typeof servicesData].color}dd)` }}
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
