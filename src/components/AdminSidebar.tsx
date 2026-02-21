import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';

const adminModules = [
  { label: 'Dashboard', path: '/erp/school/admin', icon: <LayoutDashboard size={20} /> },
  { label: 'Student Management', path: '/erp/school/admin', icon: <Users size={20} /> },
  { label: 'Classes', path: '/erp/school/classes', icon: <BookOpen size={20} /> },
  { label: 'Attendance', path: '/erp/school/attendance', icon: <Calendar size={20} /> },
  { label: 'Grades', path: '/erp/school/grades', icon: <Award size={20} /> },
  { label: 'Fees', path: '/erp/school/fees', icon: <DollarSign size={20} /> },
  { label: 'Messages', path: '/erp/school/messages', icon: <MessageSquare size={20} /> },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:flex flex-col w-64 glass border-r border-white/10 sticky top-0 h-screen overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-bold">Admin Panel</h3>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {adminModules.map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
              location.pathname === module.path
                ? 'glass border-[1.5px]'
                : 'text-[#8B949E] hover:bg-white/5'
            }`}
            style={location.pathname === module.path ? { borderColor: 'var(--primary)', background: 'rgba(0, 102, 255, 0.1)', color: 'var(--primary)' } : {}}
          >
            {module.icon}
            {module.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-all text-[#8B949E] hover:text-white">
          <Settings size={18} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-all text-[#EF4444] hover:text-[#FF6B6B]">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
