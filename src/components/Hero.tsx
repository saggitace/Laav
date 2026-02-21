import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--primary)' }}></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--secondary)' }}></div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass text-xs sm:text-sm">
              <Sparkles size={16} style={{ color: 'var(--secondary)' }} />
              <span>Digital Solutions & Branding Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Turning <span style={{ color: 'var(--primary)' }}>Digital</span> into{' '}
              <span style={{ color: 'var(--secondary)' }}>Profit</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#8B949E] max-w-xl">
              We build scalable digital solutions that drive measurable ROI. From web development to full-scale branding, we transform businesses into market leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 glow-blue w-full sm:w-auto" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
                Get Started
                <ArrowRight size={20} />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold glass transition-all duration-300 hover:border-[#0066FF] w-full sm:w-auto">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--secondary)' }}>500+</div>
                <div className="text-xs sm:text-sm text-[#8B949E]">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--secondary)' }}>98%</div>
                <div className="text-xs sm:text-sm text-[#8B949E]">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--secondary)' }}>15+</div>
                <div className="text-xs sm:text-sm text-[#8B949E]">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glow-blue">
              <img
                src="https://images.unsplash.com/photo-1689443111070-2c1a1110fe82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzA3NDM1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Futuristic Digital Technology"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent"></div>
            </div>

            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-xl glass glow-gold max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--secondary)' }}>
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <div className="font-semibold">ROI Growth</div>
                  <div className="text-sm text-[#8B949E]">+350% Average</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
