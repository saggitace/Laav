import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Settings,
  ChevronRight,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  FileText,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  X,
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: number;
  email: string;
  phone: string;
  attendance: number;
  status: 'active' | 'inactive';
  photo: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  audience: string;
}

export function AdminSchoolERP() {
  // Dummy Database - Students
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'STU-2024-001',
      name: 'Rajesh Kumar',
      class: '10th Grade - A',
      rollNo: 15,
      email: 'rajesh@school.edu',
      phone: '+91 98765 43210',
      attendance: 87.5,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50JTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3MTIyMDI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'STU-2024-002',
      name: 'Priya Singh',
      class: '10th Grade - A',
      rollNo: 22,
      email: 'priya@school.edu',
      phone: '+91 98765 43211',
      attendance: 92.0,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'STU-2024-003',
      name: 'Aditya Patel',
      class: '10th Grade - B',
      rollNo: 18,
      email: 'aditya@school.edu',
      phone: '+91 98765 43212',
      attendance: 78.5,
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50fGVufDF8fHx8MTc3MTE3NjcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

  // Dummy Database - Announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Annual Exam Schedule Released',
      content: 'Annual exams will start from March 28. Check your time table on the portal.',
      date: '2024-03-10',
      priority: 'high',
      audience: 'Students & Parents',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'PTM scheduled for March 15-16. Please visit the school between 2-5 PM.',
      date: '2024-03-08',
      priority: 'medium',
      audience: 'Parents',
    },
  ]);

  // Modal States
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Form States
  const [studentForm, setStudentForm] = useState<Partial<Student>>({
    name: '',
    class: '',
    rollNo: 0,
    email: '',
    phone: '',
    attendance: 0,
  });

  const [announcementForm, setAnnouncementForm] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    priority: 'medium',
    audience: 'All',
  });

  // Student Management Functions
  const handleAddStudent = () => {
    setEditingStudent(null);
    setStudentForm({ name: '', class: '', rollNo: 0, email: '', phone: '', attendance: 0 });
    setShowStudentModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setStudentForm(student);
    setShowStudentModal(true);
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? { ...editingStudent, ...studentForm } : s)));
    } else {
      const newStudent: Student = {
        id: `STU-2024-${students.length + 1}`,
        status: 'active',
        photo: 'https://via.placeholder.com/100',
        ...studentForm,
      } as Student;
      setStudents([...students, newStudent]);
    }
    setShowStudentModal(false);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Announcement Management Functions
  const handleAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({ title: '', content: '', priority: 'medium', audience: 'All' });
    setShowAnnouncementModal(true);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm(announcement);
    setShowAnnouncementModal(true);
  };

  const handleSaveAnnouncement = () => {
    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id ? { ...editingAnnouncement, ...announcementForm } : a
        )
      );
    } else {
      const newAnnouncement: Announcement = {
        id: Math.max(...announcements.map((a) => a.id), 0) + 1,
        date: new Date().toISOString().split('T')[0],
        ...announcementForm,
      } as Announcement;
      setAnnouncements([...announcements, newAnnouncement]);
    }
    setShowAnnouncementModal(false);
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const stats = [
    { icon: Users, label: 'Total Students', value: students.length, change: '+12%', color: 'var(--primary)' },
    { icon: Calendar, label: 'Classes', value: 24, change: '+2', color: 'var(--secondary)' },
    { icon: CheckCircle, label: 'Attendance', value: '87.5%', change: '+2.3%', color: '#10B981' },
    { icon: DollarSign, label: 'Fee Collection', value: '₹ 85.2L', change: '+8.4%', color: '#F59E0B' },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">School Dashboard</h1>
          <p className="text-[#8B949E] font-medium">Manage all school operations and student data</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl glass hover:border-[#0066FF] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl" style={{ background: `${stat.color}20` }}>
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-[#8B949E] text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Students Section */}
        <div className="p-4 sm:p-6 rounded-2xl glass mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users size={28} style={{ color: 'var(--primary)' }} />
              Student Management
            </h2>
            <button
              onClick={handleAddStudent}
              className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
            >
              <Plus size={20} />
              Add Student
            </button>
          </div>

          <div className="space-y-3 overflow-x-auto">
            {students.map((student) => (
              <div key={student.id} className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{student.name}</h4>
                    <p className="text-xs text-[#8B949E] font-medium truncate">
                      {student.class} • {student.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">{student.attendance}%</span>
                  <button onClick={() => handleEditStudent(student)} className="p-2 rounded-lg glass hover:border-[#FFC107] transition-all" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDeleteStudent(student.id)} className="p-2 rounded-lg glass hover:border-[#EF4444] transition-all text-[#EF4444]" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements Section */}
        <div className="p-4 sm:p-6 rounded-2xl glass">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Mail size={28} style={{ color: 'var(--secondary)' }} />
              Announcements & Events
            </h2>
            <button
              onClick={handleAddAnnouncement}
              className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))' }}
            >
              <Plus size={20} />
              Add Announcement
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 rounded-xl glass hover:border-[#FFC107] transition-all"
                style={{
                  borderLeft: `4px solid ${
                    announcement.priority === 'high' ? '#EF4444' : announcement.priority === 'medium' ? 'var(--secondary)' : '#10B981'
                  }`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold truncate">{announcement.title}</h4>
                        <span className="px-2 py-1 rounded text-xs font-bold shrink-0" style={{ background: `${announcement.priority === 'high' ? '#EF4444' : 'var(--secondary)'}20` }}>
                        {announcement.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-[#8B949E] font-medium mb-2">{announcement.content}</p>
                    <div className="flex items-center gap-4 text-xs text-[#8B949E] font-medium">
                      <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{announcement.audience}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEditAnnouncement(announcement)} className="p-2 rounded-lg glass hover:border-[#FFC107] transition-all">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="p-2 rounded-lg glass hover:border-[#EF4444] transition-all text-[#EF4444]">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
              <button onClick={() => setShowStudentModal(false)} className="p-2 rounded-lg glass hover:border-[#EF4444]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={studentForm.name || ''}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Class</label>
                  <input
                    type="text"
                    value={studentForm.class || ''}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Roll No.</label>
                  <input
                    type="number"
                    value={studentForm.rollNo || 0}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={studentForm.email || ''}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={studentForm.phone || ''}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Attendance %</label>
                <input
                  type="number"
                  max="100"
                  value={studentForm.attendance || 0}
                  onChange={(e) => setStudentForm({ ...studentForm, attendance: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg glass hover:border-[#EF4444] font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStudent}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  {editingStudent ? 'Update' : 'Add'} Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{editingAnnouncement ? 'Edit Announcement' : 'Add Announcement'}</h3>
              <button onClick={() => setShowAnnouncementModal(false)} className="p-2 rounded-lg glass hover:border-[#EF4444]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={announcementForm.title || ''}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Content</label>
                <textarea
                  value={announcementForm.content || ''}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Priority</label>
                  <select
                    value={announcementForm.priority || 'medium'}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Audience</label>
                  <input
                    type="text"
                    value={announcementForm.audience || ''}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, audience: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg glass hover:border-[#EF4444] font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAnnouncement}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  {editingAnnouncement ? 'Update' : 'Add'} Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
