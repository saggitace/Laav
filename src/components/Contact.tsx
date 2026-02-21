import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import apiClient from '../services/api';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);

    try {
      // Send contact form data to backend
      await apiClient.sendContactEmail({
        senderName: formData.name,
        senderEmail: formData.email,
        company: formData.company,
        message: formData.message,
        companyEmail: 'laavitservives@gmail.com', // Your company email
      });

      setSubmitMessage({
        type: 'success',
        text: 'Thank you! We\'ll get back to you within 24 hours.',
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error: any) {
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24 px-3 sm:px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-block px-3 sm:px-4 py-2 rounded-full glass mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm" style={{ color: 'var(--primary)' }}>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Let's Build Something <span style={{ color: 'var(--secondary)' }}>Great</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl glass">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                    <Mail size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:laavitservives@gmail.com" className="text-[#8B949E] hover:text-[#0066FF] transition-colors">
                     laavitservices@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                    <Phone size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a href="tel:+917370038276" className="text-[#8B949E] hover:text-[#0066FF] transition-colors">
                      +91 7370038276
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                    <MapPin size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Office</div>
                    <div className="text-[#8B949E]">
                       Shivpuri punaichak<br />
                      patna, Bihar 800023
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden glass">
              <img
                src="https://images.unsplash.com/photo-1634671495197-fb9ec3230ef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMGJyYW5kaW5nfGVufDF8fHx8MTc3MDcxNjc4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Creative Design"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="p-4 sm:p-6 lg:p-8 rounded-2xl glass glow-blue">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {submitMessage && (
                <div className={`p-3 sm:p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <p className={`text-xs sm:text-sm ${submitMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {submitMessage.text}
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass focus:outline-none focus:border-[#0066FF] transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass focus:outline-none focus:border-[#0066FF] transition-colors text-sm"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-semibold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass focus:outline-none focus:border-[#0066FF] transition-colors text-sm"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass focus:outline-none focus:border-[#0066FF] transition-colors resize-none text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
                <Send size={18} />
              </button>

              <p className="text-xs sm:text-sm text-[#8B949E] text-center">
                We typically respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
