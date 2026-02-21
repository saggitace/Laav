import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authUtils } from '../utils/auth';

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    tenantId: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.tenantId) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password, formData.tenantId);
      // Redirect based on user role
      const user = authUtils.getUser();
      if (user) {
        switch (user.role) {
          case 'admin':
            navigate('/admin-erp');
            break;
          case 'teacher':
            navigate('/teacher-dashboard');
            break;
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'parent':
            navigate('/parent-dashboard');
            break;
          default:
            navigate('/school-erp');
        }
      }
    } catch (err) {
      setLocalError(error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--primary)' }}></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--secondary)' }}></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass p-8 rounded-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your School ERP account</p>
          </div>

          {/* Error Message */}
          {(error || localError) && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle size={20} className="text-red-500 shrink-0" />
              <p className="text-red-400 text-sm">{error || localError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Tenant ID */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Tenant ID</label>
              <input
                type="text"
                name="tenantId"
                value={formData.tenantId}
                onChange={handleChange}
                placeholder="Enter your organization ID"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/onboarding')}
                className="text-primary hover:text-secondary transition font-semibold"
              >
                Get started
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
