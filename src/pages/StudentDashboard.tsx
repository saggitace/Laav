import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SchoolNavigation } from '../components/SchoolNavigation';
import {
  GraduationCap,
  Calendar,
  BookOpen,
  TrendingUp,
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Award,
  FileText,
  ChevronRight,
  Mail,
  Download,
  Eye,
  Loader,
} from 'lucide-react';
import { useGrades, useFees, useAttendance } from '../hooks/useData';
import { authUtils } from '../utils/auth';
import apiClient from '../services/api';

export function StudentDashboard() {
  const navigate = useNavigate();
  const user = authUtils.getUser();
  const tenantId = authUtils.getTenantId();
  const [studentData] = useState({
    name: user?.firstName || 'Student',
    class: user?.role === 'student' ? 'Student' : 'N/A',
    id: user?.id || 'N/A',
    photo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop&q=80',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: grades, isLoading: gradesLoading } = useGrades(user?.id);
  const { data: fees, isLoading: feesLoading } = useFees(user?.id);
  const { data: attendance, isLoading: attendanceLoading } = useAttendance(user?.id);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsLoading(false);
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      authUtils.clearAuth();
      navigate('/login');
    }
  };

  if (isLoading || gradesLoading || feesLoading || attendanceLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center">
        <Loader className="animate-spin" size={40} style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black p-6">
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg max-w-xl mx-auto">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const attendancePercentage = attendance.length > 0 
    ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
    : 0;

  const averageGrade = grades.length > 0
    ? Math.round(grades.reduce((sum, g) => sum + g.marks, 0) / grades.length)
    : 0;

  const pendingFees = fees.filter(f => f.status === 'pending' || f.status === 'overdue').length;
  const totalFeePending = fees
    .filter(f => f.status === 'pending' || f.status === 'overdue')
    .reduce((sum, f) => sum + f.amount, 0);

  const quickStats = [
    {
      icon: Calendar,
      label: 'Attendance',
      value: `${attendancePercentage}%`,
      color: 'var(--primary)',
      subtitle: `${attendance.filter(a => a.status === 'present').length}/${attendance.length} days`,
    },
    {
      icon: Award,
      label: 'Average Marks',
      value: `${averageGrade}%`,
      color: 'var(--secondary)',
      subtitle: grades.length > 0 ? 'Based on grades' : 'No grades yet',
    },
    {
      icon: BookOpen,
      label: 'Grades Received',
      value: grades.length,
      color: '#10B981',
      subtitle: 'Subject grades',
    },
    {
      icon: TrendingUp,
      label: 'Pending Fees',
      value: `₹${totalFeePending}`,
      color: pendingFees > 0 ? '#F59E0B' : '#10B981',
      subtitle: `${pendingFees} pending`,
    },
  ];

  const subjects = [
    { name: 'Mathematics', marks: 92, grade: 'A+', status: 'Excellent' },
    { name: 'Physics', marks: 85, grade: 'A', status: 'Good' },
    { name: 'Chemistry', marks: 88, grade: 'A', status: 'Good' },
    { name: 'Biology', marks: 94, grade: 'A+', status: 'Excellent' },
    { name: 'English', marks: 90, grade: 'A+', status: 'Excellent' },
  ];

  const todaySchedule = [
    { time: '8:00-9:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'A-101' },
    { time: '9:00-10:00', subject: 'Physics', teacher: 'Dr. Patel', room: 'Lab-02' },
    { time: '10:00-11:00', subject: 'Chemistry', teacher: 'Mrs. Gupta', room: 'Lab-03' },
    { time: '11:00-12:00', subject: 'English', teacher: 'Ms. Singh', room: 'A-102' },
  ];

  const assignments = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Quadratic Equations - Exercise 4.2',
      dueDate: '2024-03-20',
      status: 'pending',
      progress: 60,
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Motion and Newton\'s Laws',
      dueDate: '2024-03-18',
      status: 'submitted',
      progress: 100,
    },
    {
      id: 3,
      subject: 'English',
      title: 'Essay Writing - Democracy',
      dueDate: '2024-03-22',
      status: 'pending',
      progress: 40,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Annual Exam Schedule Released',
      date: '2024-03-10',
      priority: 'high',
      content: 'Annual exams will start from March 28. Check your time table on the portal.',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2024-03-08',
      priority: 'medium',
      content: 'PTM scheduled for March 15-16. Please visit the school between 2-5 PM.',
    },
    {
      id: 3,
      title: 'Sports Day Registration',
      date: '2024-03-05',
      priority: 'low',
      content: 'Register for sports day by March 12. Limited slots available.',
    },
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
                placeholder="Search assignments, grades..."
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
              <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name}! 👋</h1>
              <p className="text-[#8B949E] font-medium">{studentData.class} | ID: {studentData.id}</p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={studentData.photo}
                alt={studentData.name}
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
          {/* Today's Schedule */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock size={24} style={{ color: 'var(--primary)' }} />
              Today's Schedule
            </h2>

            <div className="space-y-3">
              {todaySchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center">
                      <div className="text-sm font-bold">{slot.time}</div>
                    </div>
                    <div className="border-l border-white/10 pl-4">
                      <h4 className="font-semibold">{slot.subject}</h4>
                      <div className="text-xs text-[#8B949E] font-medium">
                        {slot.teacher} • {slot.room}
                      </div>
                    </div>
                  </div>
                  <CheckCircle size={20} style={{ color: '#10B981' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Mail size={24} style={{ color: 'var(--secondary)' }} />
              Announcements
            </h2>

            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 rounded-xl glass hover:border-[#FFC107] transition-all"
                  style={{
                    borderLeft: `4px solid ${
                      announcement.priority === 'high'
                        ? '#EF4444'
                        : announcement.priority === 'medium'
                        ? 'var(--secondary)'
                        : '#10B981'
                    }`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    {announcement.priority === 'high' && (
                      <AlertCircle size={18} color="#EF4444" className="mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{announcement.title}</h4>
                      <p className="text-xs text-[#8B949E] font-medium">
                        {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="p-6 rounded-2xl glass mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award size={24} style={{ color: 'var(--primary)' }} />
            Academic Performance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {subjects.map((subject, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all text-center group"
              >
                <div className="mb-3">
                  <div className="text-3xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
                    {subject.marks}
                  </div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: subject.marks >= 90 ? 'rgba(255, 193, 7, 0.2)' : 'rgba(0, 102, 255, 0.2)',
                      color: subject.marks >= 90 ? 'var(--secondary)' : 'var(--primary)',
                    }}
                  >
                    {subject.grade}
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-2">{subject.name}</h4>
                <p className="text-xs text-[#8B949E] font-medium">{subject.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="p-6 rounded-2xl glass">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText size={24} style={{ color: 'var(--secondary)' }} />
              My Assignments
            </h2>
            <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all text-sm font-semibold">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-xs text-[#8B949E] font-medium">{assignment.subject}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: assignment.status === 'submitted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: assignment.status === 'submitted' ? '#10B981' : '#F59E0B',
                    }}
                  >
                    {assignment.status === 'submitted' ? '✓ Submitted' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          background: 'var(--primary)',
                          width: `${assignment.progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold ml-3">{assignment.progress}%</span>
                  <span className="text-xs text-[#8B949E] font-medium ml-3">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
