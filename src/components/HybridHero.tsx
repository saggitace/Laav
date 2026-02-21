import { ArrowRight, TrendingUp, Play } from 'lucide-react';
import { Link } from 'react-router';

export function HybridHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--primary)' }}></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--secondary)' }}></div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary)' }}></div>
              <span className="text-sm font-medium">Agency Services + SaaS Platform</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Turning <span style={{ color: 'var(--primary)' }}>Digital</span><br />
              into <span style={{ color: 'var(--secondary)' }}>Profit</span>
            </h1>

            <p className="text-xl text-[#8B949E] max-w-xl font-medium">
              Full-service digital agency meets powerful ERP platform. From marketing to management—everything your business needs to scale.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 glass border-2 border-[#0066FF] hover:bg-[#0066FF]/10"
              >
                Get a Consultation
                <ArrowRight size={20} />
              </a>
              <Link
                to="/onboarding"
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 glow-gold"
                style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}
              >
                Start Free Trial
                <Play size={20} fill="#0B0E14" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>500+</div>
                <div className="text-sm text-[#8B949E] font-medium">Projects Done</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>98%</div>
                <div className="text-sm text-[#8B949E] font-medium">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>15+</div>
                <div className="text-sm text-[#8B949E] font-medium">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right: SaaS Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glass glow-blue p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-[#8B949E]">SaaS Dashboard Preview</span>
                <Link to="/dashboard" className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                  View Full Dashboard →
                </Link>
              </div>
              
              {/* Mini Dashboard */}
              <div className="space-y-4">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                    <div className="text-sm text-[#8B949E] font-medium mb-1">Revenue</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>$45.2K</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--success)' }}>+23.5%</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                    <div className="text-sm text-[#8B949E] font-medium mb-1">ROI Growth</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--secondary)' }}>+350%</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--success)' }}>Excellent</div>
                  </div>
                </div>

                {/* Chart Preview */}
                <div className="p-4 rounded-xl glass">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={16} style={{ color: 'var(--primary)' }} />
                    <span className="text-sm font-semibold">Growth Over Time</span>
                  </div>
                  <svg width="100%" height="120" className="overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 100 L 60 80 L 120 60 L 180 40 L 240 30 L 300 20 L 360 10"
                      stroke="#0066FF"
                      strokeWidth="3"
                      fill="none"
                      className="glow-blue"
                    />
                    <path
                      d="M 0 100 L 60 80 L 120 60 L 180 40 L 240 30 L 300 20 L 360 10 L 360 120 L 0 120 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                </div>

                <div className="text-center">
                  <p className="text-xs text-[#8B949E] font-medium">Real-time analytics & insights</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 px-4 py-2 rounded-full glass glow-border-gold">
              <span className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>🚀 Live Demo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
