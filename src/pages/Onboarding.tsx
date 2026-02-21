import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, Building2, Hospital, ArrowRight, Upload, Palette, Users, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authUtils } from '../utils/auth';

export function Onboarding() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [localError, setLocalError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    industry: '',
    tenantName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    logo: null as File | null,
    primaryColor: '#0066FF',
    secondaryColor: '#FFC107',
    teamEmails: [''],
  });

  const industries = [
    {
      id: 'school',
      name: 'School',
      icon: GraduationCap,
      description: 'Student management, attendance, fee collection',
    },
    {
      id: 'office',
      name: 'Office',
      icon: Building2,
      description: 'Payroll, project tracking, team collaboration',
    },
    {
      id: 'hospital',
      name: 'Hospital',
      icon: Hospital,
      description: 'Patient records, appointments, inventory',
    },
  ];

  const handleIndustrySelect = (industryId: string) => {
    setFormData({ ...formData, industry: industryId });
    setStep(2);
  };

  const handleColorChange = (type: 'primary' | 'secondary', color: string) => {
    setFormData({ ...formData, [`${type}Color`]: color });
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.teamEmails];
    newEmails[index] = value;
    setFormData({ ...formData, teamEmails: newEmails });
  };

  const addEmailField = () => {
    setFormData({ ...formData, teamEmails: [...formData.teamEmails, ''] });
  };

  const handleComplete = async () => {
    setLocalError(null);
    
    // Validate required fields
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.tenantName) {
      setLocalError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        tenantName: formData.tenantName,
      });

      // Redirect to appropriate dashboard based on role
      navigate('/school-erp');
    } catch (err) {
      setLocalError(error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--primary)' }}></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--secondary)' }}></div>

      {/* Wizard Container */}
      <div className="w-full max-w-4xl relative z-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= num
                    ? 'glow-border-blue'
                    : 'glass'
                }`}
                style={{
                  background: step >= num ? 'var(--primary)' : 'transparent',
                }}
              >
                {step > num ? <CheckCircle size={24} /> : num}
              </div>
              {num < 3 && (
                <div
                  className="w-24 h-1 mx-2"
                  style={{
                    background: step > num ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Industry Selection */}
        {step === 1 && (
          <div className="glass p-8 rounded-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-3">Choose Your Industry</h2>
            <p className="text-center text-[#8B949E] mb-8 font-medium">Select the industry that best fits your organization</p>

            <div className="grid md:grid-cols-3 gap-6">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.id}
                    onClick={() => handleIndustrySelect(industry.id)}
                    className="p-6 rounded-2xl glass hover:border-[#0066FF] transition-all duration-300 hover:scale-105 text-left group"
                  >
                    <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center glow-blue group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{industry.name}</h3>
                    <p className="text-sm text-[#8B949E] text-center font-medium">{industry.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Setup Account */}
        {step === 2 && (
          <div className="glass p-8 rounded-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-3">Create Your Account</h2>
            <p className="text-center text-[#8B949E] mb-8 font-medium">Set up your organization and admin account</p>

            {(localError || error) && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle size={20} className="text-red-500 shrink-0" />
                <p className="text-red-400 text-sm">{localError || error}</p>
              </div>
            )}

            <div className="space-y-6 max-w-xl mx-auto">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Organization Name *</label>
                <input
                  type="text"
                  value={formData.tenantName}
                  onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                  placeholder="Enter your organization name"
                  className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[#0066FF] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Your first name"
                  className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[#0066FF] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Your last name"
                  className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[#0066FF] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[#0066FF] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 rounded-xl glass focus:outline-none focus:border-[#0066FF] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 rounded-xl glass hover:border-[#0066FF] transition-all font-semibold disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-[#0066FF] to-[#FFC107] text-white font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Team Invitation */}
        {step === 3 && (
          <div className="glass p-8 rounded-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-3">Invite Your Team</h2>
            <p className="text-center text-[#8B949E] mb-8 font-medium">Send magic links to your team members</p>

            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-3">
                {formData.teamEmails.map((email, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Users size={20} style={{ color: 'var(--primary)' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      placeholder="team@company.com"
                      className="flex-1 px-4 py-3 rounded-xl glass focus:outline-none focus:border-[#0066FF] transition-colors"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={addEmailField}
                className="w-full px-4 py-3 rounded-xl glass hover:border-[#0066FF] transition-all font-semibold"
              >
                + Add Another Member
              </button>

              <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                <p className="text-sm font-medium text-center">
                  <Send size={16} className="inline mr-2" style={{ color: 'var(--primary)' }} />
                  Magic links will be sent to each email address
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 rounded-xl glass hover:border-[#0066FF] transition-all font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 glow-gold"
                  style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}
                >
                  Complete Setup
                  <CheckCircle size={20} />
                </button>
              </div>

              <p className="text-xs text-center text-[#8B949E] font-medium">
                You can always invite more team members later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
