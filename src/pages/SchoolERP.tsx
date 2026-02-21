import { useState } from 'react';
import { Link } from 'react-router';
import { SchoolNavigation } from '../components/SchoolNavigation';
import {
  GraduationCap,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  BookOpen,
  Bell,
  Search,
  ChevronRight,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  FileText,
  Plus,
  Filter,
  Download,
  Settings,
} from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

export function SchoolERP() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dashboard Statistics
  const stats: StatCard[] = [
    {
      icon: <Users size={24} style={{ color: 'var(--primary)' }} />,
      label: 'Total Students',
      value: 1284,
      change: '+12%',
      trend: 'up',
    },
    {
      icon: <GraduationCap size={24} style={{ color: 'var(--secondary)' }} />,
      label: 'Total Teachers',
      value: 156,
      change: '+5%',
      trend: 'up',
    },
    {
      icon: <Calendar size={24} style={{ color: '#10B981' }} />,
      label: 'Attendance Rate',
      value: '87.5%',
      change: '+2.3%',
      trend: 'up',
    },
    {
      icon: <DollarSign size={24} style={{ color: '#F59E0B' }} />,
      label: 'Fee Collection',
      value: '₹ 85.2L',
      change: '+8.4%',
      trend: 'up',
    },
  ];

  // Recent Students
  const recentStudents = [
    {
      id: 'STU-2024-001',
      name: 'Rajesh Kumar',
      class: '10th Grade - A',
      rollNo: 15,
      attendance: 87.5,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50JTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3MTIyMDI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'STU-2024-002',
      name: 'Priya Singh',
      class: '10th Grade - A',
      rollNo: 22,
      attendance: 92.0,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'STU-2024-003',
      name: 'Aditya Patel',
      class: '10th Grade - B',
      rollNo: 18,
      attendance: 78.5,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'STU-2024-004',
      name: 'Neha Sharma',
      class: '9th Grade - A',
      rollNo: 25,
      attendance: 88.5,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'STU-2024-005',
      name: 'Vikram Reddy',
      class: '12th Grade - A',
      rollNo: 30,
      attendance: 94.0,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Class Performance Data
  const classPerformance = [
    { class: '10th Grade - A', totalStudents: 45, avgAttendance: 88, avgMarks: 82 },
    { class: '10th Grade - B', totalStudents: 42, avgAttendance: 85, avgMarks: 79 },
    { class: '9th Grade - A', totalStudents: 48, avgAttendance: 87, avgMarks: 81 },
    { class: '9th Grade - B', totalStudents: 50, avgAttendance: 84, avgMarks: 78 },
    { class: '12th Grade - A', totalStudents: 38, avgAttendance: 92, avgMarks: 86 },
  ];

  // Upcoming Events
  const upcomingEvents = [
    { date: '2024-03-15', event: 'Parent-Teacher Meeting', type: 'meeting' },
    { date: '2024-03-20', event: 'Science Fair', type: 'event' },
    { date: '2024-03-25', event: 'Sports Day', type: 'event' },
    { date: '2024-03-28', event: 'Annual Exam Begins', type: 'exam' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Navigation */}
      <SchoolNavigation />

      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div></div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass max-w-md">
              <Search size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search students, classes, teachers..."
                className="bg-transparent outline-none flex-1 font-medium text-sm"
              />
              <kbd className="px-2 py-1 rounded text-xs font-bold glass">⌘K</kbd>
            </div>
            <button className="p-2 rounded-xl glass hover:border-[#FFC107] relative">
              <Bell size={20} style={{ color: 'var(--secondary)' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--secondary)' }}></span>
            </button>
            <button className="p-2 rounded-xl glass hover:border-[#0066FF]">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">School Dashboard</h1>
          <p className="text-[#8B949E] font-medium">Monitor all school operations and student progress at a glance</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass group hover:border-[#0066FF] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                  {stat.icon}
                </div>
                {stat.trend && (
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{
                      background: stat.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: stat.trend === 'up' ? '#10B981' : '#EF4444',
                    }}
                  >
                    <TrendingUp size={14} />
                    {stat.change}
                  </div>
                )}
              </div>
              <h3 className="text-[#8B949E] text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Students List */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users size={24} style={{ color: 'var(--primary)' }} />
                  Recent Students
                </h2>
              </div>
              <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all flex items-center gap-2 text-sm font-semibold">
                <Plus size={16} />
                Add Student
              </button>
            </div>

            <div className="space-y-3">
              {recentStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all group cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{student.name}</h4>
                      <div className="text-xs text-[#8B949E] font-medium space-x-3">
                        <span>{student.id}</span>
                        <span>•</span>
                        <span>{student.class}</span>
                        <span>•</span>
                        <span>Roll No: {student.rollNo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold">{student.attendance}%</div>
                      <div className="text-xs text-[#8B949E] font-medium">Attendance</div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#10B981',
                      }}
                    >
                      Active
                    </span>
                    <ChevronRight size={18} className="text-[#8B949E]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar size={24} style={{ color: 'var(--secondary)' }} />
              Events
            </h2>

            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass hover:border-[#FFC107] transition-all"
                  style={{ borderLeft: `4px solid ${event.type === 'meeting' ? 'var(--primary)' : event.type === 'exam' ? '#EF4444' : 'var(--secondary)'}` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {event.type === 'meeting' && <Mail size={18} style={{ color: 'var(--primary)' }} />}
                      {event.type === 'event' && <CheckCircle size={18} style={{ color: 'var(--secondary)' }} />}
                      {event.type === 'exam' && <AlertCircle size={18} color="#EF4444" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-sm">{event.event}</h4>
                      <p className="text-xs text-[#8B949E] font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class Performance */}
        <div className="p-6 rounded-2xl glass mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 size={24} style={{ color: 'var(--primary)' }} />
              Class Performance
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all flex items-center gap-2 text-sm font-semibold">
                <Filter size={16} />
                Filter
              </button>
              <button className="px-4 py-2 rounded-lg glass hover:border-[#FFC107] transition-all flex items-center gap-2 text-sm font-semibold">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Class
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Total Students
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Avg Attendance
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Avg Marks
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((cls, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-sm">{cls.class}</td>
                    <td className="p-4 text-center font-medium text-sm">{cls.totalStudents}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              background: 'var(--primary)',
                              width: `${cls.avgAttendance}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{cls.avgAttendance}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-semibold text-sm">{cls.avgMarks}</td>
                    <td className="p-4 text-center">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold inline-block"
                        style={{
                          background: cls.avgMarks >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: cls.avgMarks >= 80 ? '#10B981' : '#F59E0B',
                        }}
                      >
                        {cls.avgMarks >= 80 ? 'Excellent' : 'Good'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: 'Generate Report', color: 'var(--primary)' },
            { icon: Mail, label: 'Send Notification', color: 'var(--secondary)' },
            { icon: Phone, label: 'Contact Teachers', color: '#10B981' },
            { icon: MapPin, label: 'View Location', color: '#F59E0B' },
          ].map((action, idx) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={idx}
                className="p-6 rounded-2xl glass hover:border-[#0066FF] transition-all group text-center"
              >
                <div className="p-3 rounded-xl mx-auto mb-3 w-fit" style={{ background: `${action.color}20` }}>
                  <ActionIcon size={24} style={{ color: action.color }} />
                </div>
                <span className="font-semibold text-sm">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
