import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export function HybridNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <img 
                src="/laav_logo.jpeg" 
                alt="LAAV IT Logo" 
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg object-contain"
              />
              <span className="text-lg sm:text-2xl font-bold">LAAV <span style={{ color: 'var(--secondary)' }}>IT</span></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm lg:text-base font-medium hover:text-[#0066FF] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/onboarding"
                className="px-4 lg:px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 glow-border-gold whitespace-nowrap text-sm lg:text-base"
                style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg glass"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 max-h-96 overflow-y-auto">
          <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-2 sm:space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 sm:py-4 px-3 sm:px-4 text-base font-medium hover:text-[#0066FF] hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/onboarding"
              className="block w-full px-4 sm:px-6 py-3 sm:py-3 rounded-xl text-center font-semibold mt-4"
              style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
