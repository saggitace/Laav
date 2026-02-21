import { Target, Zap, Users, TrendingUp } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Target,
      title: 'Result-Driven Approach',
      description: 'Every strategy is built around measurable outcomes and your business goals.',
    },
    {
      icon: Zap,
      title: 'Fast & Agile',
      description: 'We move quickly without compromising quality, delivering projects on time.',
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Expert professionals committed to your success from start to finish.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Systems designed to grow with your business and adapt to market changes.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full glass mb-4">
            <span className="text-sm" style={{ color: 'var(--primary)' }}>About Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Who <span style={{ color: 'var(--primary)' }}>We Are</span>
          </h2>
          <p className="text-xl text-[#8B949E] max-w-3xl mx-auto">
            LAAV IT Services is a full-stack digital agency specializing in technology solutions, marketing strategies, and branding excellence. We turn ideas into profitable digital products.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl glass hover:border-[#0066FF] transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                  <Icon size={24} style={{ color: 'var(--primary)' }} className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#8B949E]">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Image Section */}
        <div className="mt-16 rounded-2xl overflow-hidden glass">
          <img
            src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NzA3MzkxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team Collaboration"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
