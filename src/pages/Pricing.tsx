import { useState } from 'react';
import { Check, Zap, Rocket, Building, Globe, Megaphone, Palette, Code } from 'lucide-react';
import { Link } from 'react-router';
import { HybridNavigation } from '../components/HybridNavigation';
import { Footer } from '../components/Footer';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [agencyBilling, setAgencyBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Startup',
      icon: Zap,
      description: 'Perfect for small teams getting started',
      monthly: 49,
      yearly: 470,
      features: [
        'Up to 10 users',
        'Basic analytics',
        '5 GB storage',
        'Email support',
        'Mobile app access',
        'Standard security',
      ],
      color: '#8B949E',
      popular: false,
    },
    {
      name: 'Growth',
      icon: Rocket,
      description: 'Best for growing businesses',
      monthly: 149,
      yearly: 1430,
      features: [
        'Up to 50 users',
        'Advanced analytics',
        '50 GB storage',
        'Priority support 24/7',
        'Mobile + Desktop apps',
        'Advanced security',
        'Custom integrations',
        'API access',
      ],
      color: '#FFC107',
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: Building,
      description: 'For large-scale operations',
      monthly: 499,
      yearly: 4790,
      features: [
        'Unlimited users',
        'Enterprise analytics',
        'Unlimited storage',
        'Dedicated account manager',
        'All platforms',
        'Enterprise security',
        'Custom development',
        'White-label options',
        'SLA guarantee',
      ],
      color: '#0066FF',
      popular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly;
    return billingCycle === 'monthly' ? price : Math.round(price / 12);
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyTotal = plan.monthly * 12;
    const savings = monthlyTotal - plan.yearly;
    return Math.round((savings / monthlyTotal) * 100);
  };

  const agencyServices = [
    {
      name: 'Website Maintenance',
      icon: Globe,
      description: 'Complete website support & updates',
      monthly: 7500,
      yearly: 60000,
      features: [
        'Regular security updates',
        'Performance optimization',
        'Content updates',
        'Bug fixes & troubleshooting',
        '24/7 monitoring',
        'Monthly reports',
      ],
      color: '#0066FF',
    },
    {
      name: 'Digital Marketing',
      icon: Megaphone,
      description: 'Comprehensive digital growth strategies',
      monthly: 25000,
      yearly: 250000,
      features: [
        'Social media management',
        'SEO optimization',
        'Content creation',
        'Paid advertising campaigns',
        'Analytics & reporting',
        'Strategy consultation',
      ],
      color: '#FFC107',
      popular: true,
    },
    {
      name: 'Branding Services',
      icon: Palette,
      description: 'Complete brand identity & design',
      monthly: 15000,
      yearly: 160000,
      features: [
        'Brand strategy development',
        'Logo & visual identity',
        'Marketing materials',
        'Social media assets',
        'Print design',
        'Brand guidelines',
      ],
      color: '#0066FF',
    },
    {
      name: 'SaaS Development',
      icon: Code,
      description: 'Custom SaaS platform development',
      monthly: 50000,
      yearly: null,
      features: [
        'Custom SaaS solutions',
        'Scalable architecture',
        'Cloud infrastructure',
        'API development',
        'Database design',
        'Ongoing support',
      ],
      color: '#FFC107',
      starting: true,
    },
  ];

  const getAgencyPrice = (service: typeof agencyServices[0]) => {
    if (!service.yearly) return service.monthly;
    return agencyBilling === 'monthly' ? service.monthly : service.yearly;
  };

  const getAgencySavings = (service: typeof agencyServices[0]) => {
    if (!service.yearly) return 0;
    const monthlyTotal = service.monthly * 12;
    const savings = monthlyTotal - service.yearly;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen">
      <HybridNavigation />

      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--primary)' }}></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--secondary)' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Choose Your <span style={{ color: 'var(--primary)' }}>Growth</span> Plan
            </h1>
            {/* <p className="text-xl text-[#8B949E] mb-8 font-medium max-w-2xl mx-auto">
              Flexible pricing that scales with your business. No hidden fees, cancel anytime.
            </p> */}

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 glass rounded-2xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'glow-border-blue'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  background: billingCycle === 'monthly' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                  color: billingCycle === 'monthly' ? 'var(--primary)' : 'var(--text-secondary)',
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'glow-border-gold'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  background: billingCycle === 'yearly' ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                  color: billingCycle === 'yearly' ? 'var(--secondary)' : 'var(--text-secondary)',
                }}
              >
                Yearly
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'var(--secondary)', color: '#0B0E14' }}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'glow-border-gold'
                      : 'glass hover:border-[#0066FF]'
                  }`}
                  style={{
                    background: plan.popular ? 'rgba(255, 193, 7, 0.05)' : 'rgba(22, 27, 34, 0.7)',
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold text-sm glow-gold" style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}>
                      🔥 Most Popular
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${plan.color}20` }}>
                      <Icon size={32} style={{ color: plan.color }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-[#8B949E] font-medium">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold" style={{ color: plan.popular ? 'var(--secondary)' : 'var(--text-primary)' }}>
                        ${getPrice(plan)}
                      </span>
                      <span className="text-xl text-[#8B949E] font-medium">/mo</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="mt-2">
                        <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                          Save {getSavings(plan)}% annually
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check size={20} className="flex-shrink-0 mt-0.5" style={{ color: plan.popular ? 'var(--secondary)' : 'var(--primary)' }} />
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/onboarding"
                    className={`block w-full px-6 py-4 rounded-xl font-bold text-center transition-all hover:scale-105 ${
                      plan.popular ? 'glow-gold' : 'glass hover:border-[#0066FF]'
                    }`}
                    style={{
                      background: plan.popular
                        ? 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)'
                        : 'rgba(0, 102, 255, 0.1)',
                      color: plan.popular ? '#0B0E14' : 'var(--primary)',
                    }}
                  >
                    {plan.popular ? 'Start Free Trial' : 'Get Started'}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Enterprise CTA */}
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Need a <span style={{ color: 'var(--secondary)' }}>Custom</span> Solution?
            </h3>
            <p className="text-lg text-[#8B949E] mb-6 font-medium">
              Talk to our team about enterprise pricing and custom features for your organization
            </p>
            <a
              href="/#contact"
              className="inline-flex px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 glow-border-blue"
              style={{ background: 'rgba(0, 102, 255, 0.1)', color: 'var(--primary)' }}
            >
              Contact Sales Team
            </a>
          </div>

          {/* Agency Services */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 rounded-full glass mb-4">
                <span className="text-sm font-medium" style={{ color: 'var(--secondary)' }}>Agency Services</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Professional <span style={{ color: 'var(--secondary)' }}>Agency</span> Services
              </h2>
              {/* <p className="text-xl text-[#8B949E] mb-8 font-medium max-w-2xl mx-auto">
                Expert services to help your business grow and succeed
              </p> */}

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-4 p-2 glass rounded-2xl">
                <button
                  onClick={() => setAgencyBilling('monthly')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    agencyBilling === 'monthly'
                      ? 'glow-border-blue'
                      : 'hover:bg-white/5'
                  }`}
                  style={{
                    background: agencyBilling === 'monthly' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                    color: agencyBilling === 'monthly' ? 'var(--primary)' : 'var(--text-secondary)',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAgencyBilling('yearly')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                    agencyBilling === 'yearly'
                      ? 'glow-border-gold'
                      : 'hover:bg-white/5'
                  }`}
                  style={{
                    background: agencyBilling === 'yearly' ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                    color: agencyBilling === 'yearly' ? 'var(--secondary)' : 'var(--text-secondary)',
                  }}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'var(--secondary)', color: '#0B0E14' }}>
                    Save up to 33%
                  </span>
                </button>
              </div>
            </div>

            {/* Agency Service Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agencyServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                      service.popular
                        ? 'glow-border-gold'
                        : 'glass hover:border-[#0066FF]'
                    }`}
                    style={{
                      background: service.popular ? 'rgba(255, 193, 7, 0.05)' : 'rgba(22, 27, 34, 0.7)',
                    }}
                  >
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-bold text-xs glow-gold" style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}>
                        🔥 Popular
                      </div>
                    )}

                    {/* Starting Badge */}
                    {service.starting && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-bold text-xs" style={{ background: 'var(--primary)', color: '#FFFFFF' }}>
                        Starting at
                      </div>
                    )}

                    {/* Header */}
                    <div className="text-center mb-4">
                      <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${service.color}20` }}>
                        <Icon size={28} style={{ color: service.color }} />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                      <p className="text-xs text-[#8B949E] font-medium">{service.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm text-[#8B949E]">₹</span>
                        <span className="text-3xl font-bold" style={{ color: service.popular ? 'var(--secondary)' : 'var(--text-primary)' }}>
                          {getAgencyPrice(service).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-sm text-[#8B949E] font-medium">
                        {service.yearly && agencyBilling === 'yearly' ? '/year' : '/month'}
                      </span>
                      {agencyBilling === 'yearly' && service.yearly && getAgencySavings(service) > 0 && (
                        <div className="mt-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                            Save {getAgencySavings(service)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: service.popular ? 'var(--secondary)' : 'var(--primary)' }} />
                          <span className="text-xs font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/#contact"
                      className={`block w-full px-4 py-3 rounded-xl font-bold text-center transition-all hover:scale-105 text-sm ${
                        service.popular ? 'glow-gold' : 'glass hover:border-[#0066FF]'
                      }`}
                      style={{
                        background: service.popular
                          ? 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)'
                          : 'rgba(0, 102, 255, 0.1)',
                        color: service.popular ? '#0B0E14' : 'var(--primary)',
                      }}
                    >
                      Get Quote
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}