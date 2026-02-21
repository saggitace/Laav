import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #FFC107 100%)' }}></div>
              <span className="text-2xl font-bold">LAAV <span style={{ color: 'var(--secondary)' }}>IT</span></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base hover:text-[#0066FF] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <button className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
                Get Started
              </button>
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
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-base hover:text-[#0066FF] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full px-6 py-2.5 rounded-lg font-semibold" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
