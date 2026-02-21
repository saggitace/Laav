import { Target, Lightbulb, Heart } from 'lucide-react';

export function Mission() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Main Statement */}
        <div className="mb-16">
          <div className="inline-block px-4 py-2 rounded-full glass mb-6">
            <span className="text-sm" style={{ color: 'var(--secondary)' }}>Our Philosophy</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
            Scalable <span style={{ color: 'var(--primary)' }}>Growth</span>{' '}
            <span style={{ color: 'var(--secondary)' }}>Systems</span>
          </h2>
          <p className="text-2xl text-[#8B949E] max-w-3xl mx-auto leading-relaxed">
            We believe in building systems, not just solutions. Systems that scale, adapt, and deliver compounding returns long after launch.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-8 rounded-2xl glass hover:border-[#0066FF] transition-all">
            <div className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-[#8B949E] leading-relaxed">
              Transform businesses into digital-first organizations with measurable, sustainable growth.
            </p>
          </div>

          <div className="p-8 rounded-2xl glass hover:border-[#FFC107] transition-all glow-gold">
            <div className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)' }}>
              <Lightbulb size={32} color="#0B0E14" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Vision</h3>
            <p className="text-[#8B949E] leading-relaxed">
              To be the go-to partner for businesses seeking exponential digital transformation and market leadership.
            </p>
          </div>

          <div className="p-8 rounded-2xl glass hover:border-[#0066FF] transition-all">
            <div className="w-16 h-16 rounded-xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Values</h3>
            <p className="text-[#8B949E] leading-relaxed">
              Integrity, innovation, and impact. We measure success by client outcomes, not billable hours.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 p-8 rounded-2xl glass">
          <blockquote className="text-2xl font-semibold italic">
            "We don't just solve problems—we architect futures."
          </blockquote>
          <div className="mt-4 text-[#8B949E]">— LAAV IT Services Team</div>
        </div>
      </div>
    </section>
  );
}
