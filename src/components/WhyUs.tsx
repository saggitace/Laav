import { DollarSign, Rocket, Shield, Repeat, Award, Clock } from 'lucide-react';

export function WhyUs() {
  const reasons = [
    {
      icon: DollarSign,
      title: 'ROI-Focused Strategy',
      description: 'Every decision is measured by return on investment. We prioritize what drives revenue.',
    },
    {
      icon: Rocket,
      title: 'Scalability Built-In',
      description: 'Systems designed to handle 10x growth without breaking. Future-proof architecture.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security protocols. Your data and your clients\' data are protected.',
    },
    {
      icon: Repeat,
      title: 'Agile Methodology',
      description: 'Iterative development with continuous feedback. Adapt quickly to market changes.',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: '500+ successful projects across industries. Case studies available on request.',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: '98% on-time project completion rate. We respect deadlines and your investment.',
    },
  ];

  return (
    <section id="why-us" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden glass glow-gold">
              <img
                src="https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MDczMjA2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Digital Marketing Analytics"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -top-6 -right-6 p-6 rounded-xl glass glow-blue">
              <div className="text-4xl font-bold" style={{ color: 'var(--secondary)' }}>350%</div>
              <div className="text-sm text-[#8B949E]">Avg. ROI Increase</div>
            </div>

            <div className="absolute -bottom-6 -left-6 p-6 rounded-xl glass">
              <div className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>24/7</div>
              <div className="text-sm text-[#8B949E]">Support Available</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-2 rounded-full glass mb-4">
              <span className="text-sm" style={{ color: 'var(--secondary)' }}>Why Choose Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Built for <span style={{ color: 'var(--primary)' }}>Growth</span>
            </h2>
            <p className="text-xl text-[#8B949E] mb-8">
              We don't just build products—we engineer growth systems that compound over time.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl glass hover:border-[#0066FF] transition-all cursor-pointer group"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: 'rgba(0, 102, 255, 0.1)' }}
                    >
                      <Icon size={24} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                      <p className="text-[#8B949E]">{reason.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
