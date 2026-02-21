import { Linkedin, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Services: ['Web Development', 'Mobile Apps', 'SEO & Marketing', 'Branding'],
    Company: ['About Us', 'Our Team', 'Careers', 'Contact'],
    Resources: ['Blog', 'Case Studies', 'Documentation', 'Support'],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #FFC107 100%)' }}></div>
              <span className="text-lg sm:text-2xl font-bold">LAAV <span style={{ color: 'var(--secondary)' }}>IT</span></span>
            </div>
            <p className="text-xs sm:text-sm text-[#8B949E] mb-4 sm:mb-6 max-w-sm">
              Transforming businesses through innovative digital solutions, strategic marketing, and compelling branding.
            </p>
            <div className="flex items-center gap-2 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg glass flex items-center justify-center hover:border-[#0066FF] transition-all touch-target"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-[#8B949E] hover:text-[#0066FF] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-2xl glass mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-xs sm:text-sm text-[#8B949E]">Get the latest insights on digital transformation</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass focus:outline-none focus:border-[#0066FF] transition-colors text-sm"
              />
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 whitespace-nowrap text-sm sm:text-base" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
                <Mail size={18} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8B949E] text-xs sm:text-sm flex items-center justify-center text-center w-full py-2 sm:py-4">
  © {new Date().getFullYear()} LAAV IT Services. All rights reserved.
</p>
        </div>
      </div>
    </footer>
  );
}
