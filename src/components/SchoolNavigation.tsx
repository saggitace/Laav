import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  GraduationCap,
  Users,
  BookOpen,
  Heart,
  Settings,
  LogOut,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  User,
  Zap,
} from 'lucide-react';

const roles: { label: string; key: string; path: string; icon: React.ReactNode; color: string }[] = [
  {
    label: 'Admin',
    key: 'admin',
    path: '/erp/school/admin',
    icon: <BarChart3 size={18} />,
    color: '#0066FF',
  },
  {
    label: 'Student',
    key: 'student',
    path: '/erp/school/student',
    icon: <Users size={18} />,
    color: '#10B981',
  },
  {
    label: 'Teacher',
    key: 'teacher',
    path: '/erp/school/teacher',
    icon: <BookOpen size={18} />,
    color: '#F59E0B',
  },
  {
    label: 'Parent',
    key: 'parent',
    path: '/erp/school/parent',
    icon: <Heart size={18} />,
    color: '#EC4899',
  },
];

export function SchoolNavigation() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getCurrentRole = () => {
    const path = location.pathname;
    if (path.includes('/student')) return 'student';
    if (path.includes('/teacher')) return 'teacher';
    if (path.includes('/parent')) return 'parent';
    return 'admin';
  };

  const currentRole = getCurrentRole();
  const currentRoleData = roles.find((r) => r.key === currentRole);

  return (
    <div>
      {/* Main Navigation */}
      <nav className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0">
            <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
              <GraduationCap size={24} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">School ERP</div>
              <div className="text-xs text-[#8B949E] font-medium">{currentRoleData?.label}</div>
            </div>
          </Link>

          {/* Center - Quick Search */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg glass max-w-sm flex-1 mx-6 border border-white/5">
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none flex-1 font-medium text-sm placeholder-[#404854]"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <button className="p-2.5 rounded-lg glass hover:bg-white/5 transition-all relative group">
              <Bell size={20} style={{ color: 'var(--secondary)' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--secondary)' }}></span>
              <div className="absolute -bottom-10 right-0 px-3 py-1 rounded-lg text-xs font-semibold bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Notifications
              </div>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2.5 rounded-lg glass hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#0066FF] to-[#FFC107] flex items-center justify-center text-white font-bold text-xs shrink-0">
                  AD
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <div className="flex flex-col items-start">
                    <div className="text-xs font-bold leading-tight">Admin</div>
                    <div className="text-xs text-[#8B949E]">You</div>
                  </div>
                  <div className="text-white/40">▼</div>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass rounded-lg border border-white/10 shadow-2xl overflow-hidden animate-in z-50">
                  {/* Profile Header */}
                  <div className="p-4 border-b border-white/10 bg-linear-to-r from-white/5 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#0066FF] to-[#FFC107] flex items-center justify-center text-white font-bold text-lg">
                        AD
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold">Admin User</div>
                        <div className="text-xs text-[#8B949E]">admin@school.edu</div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all text-[#8B949E] hover:text-white">
                      <User size={16} />
                      View Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all text-[#8B949E] hover:text-white">
                      <Settings size={16} />
                      Settings
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mx-2"></div>

                  {/* Logout */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all text-[#EF4444] hover:text-[#FF6B6B]">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2.5 rounded-lg glass hover:bg-white/5 transition-all hidden sm:flex items-center gap-2 group relative">
              <Settings size={20} />
              <div className="absolute -bottom-10 right-0 px-3 py-1 rounded-lg text-xs font-semibold bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Settings
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2.5 rounded-lg glass hover:bg-white/5 sm:hidden">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Role Tabs - Desktop */}
        <div className="hidden sm:flex border-t border-white/10 px-4 sm:px-6 py-3 gap-2">
          {roles.map((role) => (
            <Link
              key={role.key}
              to={role.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                currentRole === role.key
                  ? 'glass border-[1.5px]'
                  : 'text-[#8B949E] hover:text-white hover:bg-white/5'
              }`}
              style={
                currentRole === role.key
                  ? {
                      borderColor: role.color,
                      background: `${role.color}15`,
                      color: role.color,
                    }
                  : {}
              }
            >
              <span style={currentRole === role.key ? { color: role.color } : {}}>{role.icon}</span>
              {role.label}
              {currentRole === role.key && (
                <span className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: role.color }}></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Role Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 p-3 space-y-2 animate-in">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
              <Search size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none flex-1 font-medium text-sm"
              />
            </div>
            <div className="space-y-2">
              {roles.map((role) => (
                <Link
                  key={role.key}
                  to={role.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    currentRole === role.key ? 'glass' : 'text-[#8B949E] hover:bg-white/5'
                  }`}
                  style={currentRole === role.key ? { background: `${role.color}15`, color: role.color } : {}}
                >
                  <span>{role.icon}</span>
                  {role.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* System Status Bar */}
      <div className="hidden lg:flex px-6 py-2 bg-white/2.5 border-b border-white/5 gap-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#8B949E]">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          System Online
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#8B949E] ml-auto">
          <Zap size={14} style={{ color: 'var(--secondary)' }} />
          Last synced 2 mins ago
        </div>
      </div>
    </div>
  );
}
