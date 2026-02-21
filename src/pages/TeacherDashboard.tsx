import { useState } from 'react';
import { Link } from 'react-router';
import { SchoolNavigation } from '../components/SchoolNavigation';
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Bell,
  Search,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  BarChart3,
  Plus,
  ChevronRight,
  Eye,
  Clipboard,
  Award,
} from 'lucide-react';

export function TeacherDashboard() {
  const [teacherData] = useState({
    name: 'Mr. Sharma',
    id: 'TECH-2024-001',
    email: 'sharma@school.edu',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  });

  const quickStats = [
    {
      icon: Users,
      label: 'Total Students',
      value: '234',
      color: 'var(--primary)',
      subtitle: 'Across all classes',
    },
    {
      icon: Calendar,
      label: 'Classes Today',
      value: '4',
      color: 'var(--secondary)',
      subtitle: '6 hours teaching',
    },
    {
      icon: FileText,
      label: 'Pending Submissions',
      value: '18',
      color: '#10B981',
      subtitle: 'To review',
    },
    {
      icon: TrendingUp,
      label: 'Avg Performance',
      value: '82%',
      color: '#F59E0B',
      subtitle: 'Class average',
    },
  ];

  const myClasses = [
    {
      id: 1,
      name: '10th Grade - Section A',
      totalStudents: 45,
      subject: 'Mathematics',
      schedule: 'Mon, Wed, Fri - 8:00-9:00',
      attendance: 87,
    },
    {
      id: 2,
      name: '10th Grade - Section B',
      totalStudents: 42,
      subject: 'Mathematics',
      schedule: 'Tue, Thu - 9:00-10:00',
      attendance: 85,
    },
    {
      id: 3,
      name: '9th Grade - Section A',
      totalStudents: 48,
      subject: 'Mathematics',
      schedule: 'Mon, Wed, Fri - 10:00-11:00',
      attendance: 88,
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      type: 'assignment',
      title: '10-A: Quadratic Equations - 18 submissions',
      dueDate: '2024-03-18',
      priority: 'high',
    },
    {
      id: 2,
      type: 'grading',
      title: '10-B: Unit Test - 42 papers to grade',
      dueDate: '2024-03-20',
      priority: 'high',
    },
    {
      id: 3,
      type: 'attendance',
      title: 'Mark attendance for today\'s classes',
      dueDate: '2024-03-11',
      priority: 'medium',
    },
    {
      id: 4,
      type: 'feedback',
      title: '9-A: Provide feedback on project submissions',
      dueDate: '2024-03-22',
      priority: 'medium',
    },
  ];

  const upcomingClasses = [
    {
      time: '8:00-9:00',
      class: '10th - A',
      subject: 'Mathematics',
      room: 'A-101',
      students: 45,
    },
    {
      time: '9:00-10:00',
      class: '10th - B',
      subject: 'Mathematics',
      room: 'A-102',
      students: 42,
    },
    {
      time: '10:00-11:00',
      class: '9th - A',
      subject: 'Mathematics',
      room: 'A-103',
      students: 48,
    },
  ];

  const classPerformance = [
    { class: '10th - A', avgMarks: 82, topStudent: 'Rajesh K.', lowStudent: 'Vikram S.' },
    { class: '10th - B', avgMarks: 79, topStudent: 'Priya S.', lowStudent: 'Aditya P.' },
    { class: '9th - A', avgMarks: 81, topStudent: 'Neha S.', lowStudent: 'Rohan D.' },
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
                placeholder="Search students, classes..."
                className="bg-transparent outline-none flex-1 font-medium text-sm"
              />
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
        {/* Welcome Section */}
        <div className="mb-8 p-6 rounded-2xl glass glow-border-blue" style={{ background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {teacherData.name}! 👨‍🏫</h1>
              <p className="text-[#8B949E] font-medium">{teacherData.id} | Mathematics Teacher</p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={teacherData.photo}
                alt={teacherData.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all text-sm font-semibold flex items-center gap-2 mb-2">
                  <Eye size={16} />
                  View Profile
                </button>
                <button className="px-4 py-2 rounded-lg glass hover:border-[#EF4444] transition-all text-sm font-semibold flex items-center gap-2" style={{ color: '#EF4444' }}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 rounded-xl glass group hover:border-[#0066FF] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg" style={{ background: `${stat.color}20` }}>
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                </div>
                <h3 className="text-[#8B949E] text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-[#8B949E] font-medium mt-1">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* My Classes */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users size={24} style={{ color: 'var(--primary)' }} />
                My Classes
              </h2>
              <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all flex items-center gap-2 text-sm font-semibold">
                <Plus size={16} />
                Add Class
              </button>
            </div>

            <div className="space-y-3">
              {myClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{cls.name}</h4>
                      <p className="text-sm text-[#8B949E] font-medium">{cls.subject}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(0, 102, 255, 0.2)', color: 'var(--primary)' }}>
                      {cls.totalStudents} Students
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#8B949E] font-medium">
                    <span>{cls.schedule}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            background: 'var(--primary)',
                            width: `${cls.attendance}%`,
                          }}
                        ></div>
                      </div>
                      <span>{cls.attendance}% Attendance</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clipboard size={24} style={{ color: 'var(--secondary)' }} />
              Pending Tasks
            </h2>

            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl glass hover:border-[#FFC107] transition-all"
                  style={{
                    borderLeft: `4px solid ${task.priority === 'high' ? '#EF4444' : 'var(--secondary)'}`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    {task.priority === 'high' && (
                      <AlertCircle size={16} color="#EF4444" className="mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                      <p className="text-xs text-[#8B949E] font-medium">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="p-6 rounded-2xl glass mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock size={24} style={{ color: 'var(--primary)' }} />
            Today's Schedule
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {upcomingClasses.map((slot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all"
              >
                <div className="mb-3">
                  <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                    {slot.time}
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{slot.class}</h4>
                <div className="space-y-2 text-sm text-[#8B949E] font-medium">
                  <div>Subject: {slot.subject}</div>
                  <div>Room: {slot.room}</div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    {slot.students} Students
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Performance Analytics */}
        <div className="p-6 rounded-2xl glass">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 size={24} style={{ color: 'var(--primary)' }} />
              Class Performance
            </h2>
            <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all text-sm font-semibold">
              Detailed Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Class
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Avg Marks
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Top Performer
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Needs Support
                  </th>
                  <th className="text-center p-4 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((cls, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">{cls.class}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-full text-sm font-bold" style={{
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#10B981',
                      }}>
                        {cls.avgMarks}%
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm font-semibold">{cls.topStudent}</td>
                    <td className="p-4 text-center text-sm font-semibold">{cls.lowStudent}</td>
                    <td className="p-4 text-center">
                      <button className="inline-flex items-center gap-1 px-3 py-1 rounded-lg glass hover:border-[#0066FF] transition-all text-xs font-semibold">
                        View <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
