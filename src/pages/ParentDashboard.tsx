import { useState } from 'react';
import { Link } from 'react-router';
import { SchoolNavigation } from '../components/SchoolNavigation';
import {
  Heart,
  Calendar,
  TrendingUp,
  Bell,
  Search,
  Settings,
  LogOut,
  MessageCircle,
  DollarSign,
  Award,
  AlertCircle,
  CheckCircle,
  Users,
  Clock,
  Mail,
  Phone,
  FileText,
  Download,
  Eye,
  ChevronRight,
} from 'lucide-react';

export function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(0);

  const parentData = {
    name: 'Mr. Kumar',
    email: 'kumar@email.com',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const children = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      studentId: 'STU-2024-001',
      class: '10th Grade - A',
      photo: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50JTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3MTIyMDI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const childStats = [
    {
      icon: Calendar,
      label: 'Attendance',
      value: '87.5%',
      color: 'var(--primary)',
      subtitle: '140/160 days',
    },
    {
      icon: Award,
      label: 'CGPA',
      value: '4.8/5.0',
      color: 'var(--secondary)',
      subtitle: 'Excellent',
    },
    {
      icon: TrendingUp,
      label: 'Performance',
      value: '92%',
      color: '#10B981',
      subtitle: 'Above average',
    },
    {
      icon: DollarSign,
      label: 'Fee Status',
      value: '₹45K',
      color: '#F59E0B',
      subtitle: 'Paid of ₹50K',
    },
  ];

  const academicPerformance = [
    { subject: 'Mathematics', marks: 92, grade: 'A+', status: 'Excellent' },
    { subject: 'Physics', marks: 85, grade: 'A', status: 'Good' },
    { subject: 'Chemistry', marks: 88, grade: 'A', status: 'Good' },
    { subject: 'Biology', marks: 94, grade: 'A+', status: 'Excellent' },
    { subject: 'English', marks: 90, grade: 'A+', status: 'Excellent' },
  ];

  const communications = [
    {
      id: 1,
      from: 'Mr. Sharma (Mathematics)',
      type: 'message',
      subject: 'Great performance in recent test',
      date: '2024-03-10',
      unread: false,
    },
    {
      id: 2,
      from: 'School Management',
      type: 'announcement',
      subject: 'Parent-Teacher Meeting scheduled for March 15-16',
      date: '2024-03-08',
      unread: true,
    },
    {
      id: 3,
      from: 'Accounts Department',
      type: 'fee',
      subject: 'Fee reminder - ₹5000 pending',
      date: '2024-03-05',
      unread: false,
    },
  ];

  const feeDetails = {
    totalFee: 50000,
    paid: 45000,
    pending: 5000,
    dueDate: '2024-03-20',
    paymentHistory: [
      { month: 'January', amount: 15000, date: '2024-01-10', status: 'paid' },
      { month: 'February', amount: 15000, date: '2024-02-10', status: 'paid' },
      { month: 'March', amount: 15000, date: 'Pending', status: 'pending' },
    ],
  };

  const upcomingEvents = [
    { date: '2024-03-15', event: 'Parent-Teacher Meeting', type: 'meeting', time: '2-5 PM' },
    { date: '2024-03-20', event: 'Science Fair', type: 'event', time: 'All day' },
    { date: '2024-03-25', event: 'Sports Day', type: 'event', time: '9 AM - 3 PM' },
    { date: '2024-03-28', event: 'Annual Exam Begins', type: 'exam', time: 'See schedule' },
  ];

  const child = children[selectedChild];

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
                placeholder="Search communications..."
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
              <h1 className="text-3xl font-bold mb-2">Welcome back, {parentData.name}! 👋</h1>
              <p className="text-[#8B949E] font-medium">Track your child's progress and stay connected with the school</p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={parentData.photo}
                alt={parentData.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <button className="px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all text-sm font-semibold flex items-center gap-2 mb-2">
                  <Eye size={16} />
                  My Profile
                </button>
                <button className="px-4 py-2 rounded-lg glass hover:border-[#EF4444] transition-all text-sm font-semibold flex items-center gap-2" style={{ color: '#EF4444' }}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Child Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">My Children</h2>
          <div className="flex gap-4">
            {children.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setSelectedChild(idx)}
                className={`p-4 rounded-xl transition-all ${
                  selectedChild === idx
                    ? 'glass border-[#0066FF]'
                    : 'glass hover:border-[#0066FF]'
                }`}
              >
                <img
                  src={c.photo}
                  alt={c.name}
                  className="w-16 h-16 rounded-lg object-cover mb-2 mx-auto"
                />
                <h3 className="font-semibold text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-[#8B949E] font-medium">{c.class}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Child Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {childStats.map((stat, idx) => {
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
          {/* Academic Performance */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award size={24} style={{ color: 'var(--primary)' }} />
              Academic Performance
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                      Subject
                    </th>
                    <th className="text-center p-3 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                      Marks
                    </th>
                    <th className="text-center p-3 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                      Grade
                    </th>
                    <th className="text-center p-3 font-bold text-sm" style={{ background: 'rgba(0, 102, 255, 0.05)' }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {academicPerformance.map((subject, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-3 font-semibold text-sm">{subject.subject}</td>
                      <td className="p-3 text-center font-bold">{subject.marks}</td>
                      <td className="p-3 text-center">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold inline-block"
                          style={{
                            background: subject.marks >= 90 ? 'rgba(255, 193, 7, 0.2)' : 'rgba(0, 102, 255, 0.2)',
                            color: subject.marks >= 90 ? 'var(--secondary)' : 'var(--primary)',
                          }}
                        >
                          {subject.grade}
                        </span>
                      </td>
                      <td className="p-3 text-center text-sm font-medium">{subject.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg glass hover:border-[#0066FF] transition-all text-sm font-semibold flex items-center justify-center gap-2">
                <Download size={16} />
                Download Report
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg glass hover:border-[#FFC107] transition-all text-sm font-semibold">
                View Detailed Analysis
              </button>
            </div>
          </div>

          {/* Fee Status */}
          <div className="p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign size={24} style={{ color: 'var(--secondary)' }} />
              Fee Status
            </h2>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                <p className="text-sm text-[#8B949E] font-medium mb-2">Total Fee</p>
                <p className="text-3xl font-bold">₹{feeDetails.totalFee.toLocaleString()}</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 p-4 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <p className="text-xs text-[#8B949E] font-medium mb-1">Paid</p>
                  <p className="text-xl font-bold" style={{ color: '#10B981' }}>
                    ₹{feeDetails.paid.toLocaleString()}
                  </p>
                </div>
                <div className="flex-1 p-4 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                  <p className="text-xs text-[#8B949E] font-medium mb-1">Pending</p>
                  <p className="text-xl font-bold" style={{ color: '#EF4444' }}>
                    ₹{feeDetails.pending.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    background: 'var(--primary)',
                    width: `${(feeDetails.paid / feeDetails.totalFee) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="text-xs text-[#8B949E] font-medium">
                Due Date: {new Date(feeDetails.dueDate).toLocaleDateString()}
              </div>
            </div>

            <button className="w-full px-4 py-3 rounded-lg font-semibold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white' }}>
              Make Payment
            </button>
          </div>
        </div>

        {/* Communications & Events */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Communications */}
          <div className="p-6 rounded-2xl glass">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Mail size={24} style={{ color: 'var(--primary)' }} />
              Communications
            </h2>

            <div className="space-y-3">
              {communications.map((comm) => (
                <div
                  key={comm.id}
                  className={`p-4 rounded-xl glass hover:border-[#0066FF] transition-all ${
                    comm.unread ? 'border-[#FFC107]/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{comm.from}</h4>
                        {comm.unread && (
                          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--secondary)' }}></span>
                        )}
                      </div>
                      <p className="text-xs text-[#8B949E] font-medium mb-2">{comm.subject}</p>
                      <p className="text-xs text-[#8B949E] font-medium">
                        {new Date(comm.date).toLocaleDateString()}
                      </p>
                    </div>
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
              Upcoming Events
            </h2>

            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass hover:border-[#FFC107] transition-all"
                  style={{
                    borderLeft: `4px solid ${
                      event.type === 'meeting'
                        ? 'var(--primary)'
                        : event.type === 'exam'
                        ? '#EF4444'
                        : 'var(--secondary)'
                    }`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{event.event}</h4>
                      <p className="text-xs text-[#8B949E] font-medium">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: 'Documents', color: 'var(--primary)' },
            { icon: MessageCircle, label: 'Message Teacher', color: 'var(--secondary)' },
            { icon: Calendar, label: 'Schedule PTM', color: '#10B981' },
            { icon: Phone, label: 'Contact School', color: '#F59E0B' },
          ].map((link, idx) => {
            const LinkIcon = link.icon;
            return (
              <button
                key={idx}
                className="p-6 rounded-2xl glass hover:border-[#0066FF] transition-all group text-center"
              >
                <div className="p-3 rounded-xl mx-auto mb-3 w-fit" style={{ background: `${link.color}20` }}>
                  <LinkIcon size={24} style={{ color: link.color }} />
                </div>
                <span className="font-semibold text-sm">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
