import { useState } from 'react';
import { Link } from 'react-router';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Command,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Briefcase,
  FileText,
  BarChart3,
} from 'lucide-react';

export function OfficeHRMS() {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'kanban' | 'sales'>('dashboard');

  // Attendance Heatmap Data
  const attendanceData = [
    { name: 'John Doe', days: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0.5, 0, 0, 1, 1, 1, 1, 1] },
    { name: 'Jane Smith', days: [1, 1, 1, 0.5, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1] },
    { name: 'Mike Johnson', days: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1] },
    { name: 'Sarah Williams', days: [1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0.5] },
    { name: 'Tom Brown', days: [1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1] },
  ];

  // Kanban Tasks
  const kanbanData = {
    todo: [
      { id: 1, title: 'Design New Landing Page', priority: 'high', assignees: ['JD', 'SM'] },
      { id: 2, title: 'Fix Payment Gateway Bug', priority: 'urgent', assignees: ['MJ'] },
      { id: 3, title: 'Update Documentation', priority: 'medium', assignees: ['SW', 'TB'] },
    ],
    inProgress: [
      { id: 4, title: 'Implement User Dashboard', priority: 'high', assignees: ['JD', 'MJ'] },
      { id: 5, title: 'API Integration Testing', priority: 'medium', assignees: ['SM'] },
    ],
    completed: [
      { id: 6, title: 'Database Migration', priority: 'high', assignees: ['TB'] },
      { id: 7, title: 'Security Audit', priority: 'urgent', assignees: ['MJ', 'SW'] },
      { id: 8, title: 'UI/UX Improvements', priority: 'medium', assignees: ['JD'] },
    ],
  };

  // Sales Pipeline Data
  const salesPipeline = [
    { stage: 'Leads', count: 150, value: 750000, color: 'rgba(0, 102, 255, 0.8)' },
    { stage: 'Qualified', count: 85, value: 510000, color: 'rgba(0, 102, 255, 0.6)' },
    { stage: 'Proposal', count: 45, value: 360000, color: 'rgba(100, 140, 255, 0.5)' },
    { stage: 'Negotiation', count: 25, value: 250000, color: 'rgba(200, 180, 100, 0.6)' },
    { stage: 'Closed', count: 15, value: 225000, color: 'rgba(255, 193, 7, 0.8)' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#0066FF';
      default: return '#8B949E';
    }
  };

  const getAttendanceColor = (value: number) => {
    if (value === 1) return 'var(--success)';
    if (value === 0.5) return 'var(--warning)';
    return 'rgba(255, 255, 255, 0.1)';
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/office" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Building2 size={24} style={{ color: 'var(--primary)' }} />
              <span className="text-xl font-bold">Office HRMS</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass max-w-md">
              <Command size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search employees, projects, tasks..."
                className="bg-transparent outline-none flex-1 font-medium text-sm"
              />
              <kbd className="px-2 py-1 rounded text-xs font-bold glass">K</kbd>
            </div>
            <button className="p-2 rounded-xl glass hover:border-[#FFC107] relative">
              <Bell size={20} style={{ color: 'var(--secondary)' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--secondary)' }}></span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pb-3 flex gap-2">
          <button
            onClick={() => setSelectedView('dashboard')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              selectedView === 'dashboard' ? 'glow-border-blue' : 'glass hover:bg-white/5'
            }`}
            style={{
              background: selectedView === 'dashboard' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
              color: selectedView === 'dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelectedView('kanban')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              selectedView === 'kanban' ? 'glow-border-blue' : 'glass hover:bg-white/5'
            }`}
            style={{
              background: selectedView === 'kanban' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
              color: selectedView === 'kanban' ? 'var(--primary)' : 'var(--text-secondary)',
            }}
          >
            Projects
          </button>
          <button
            onClick={() => setSelectedView('sales')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              selectedView === 'sales' ? 'glow-border-blue' : 'glass hover:bg-white/5'
            }`}
            style={{
              background: selectedView === 'sales' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
              color: selectedView === 'sales' ? 'var(--primary)' : 'var(--text-secondary)',
            }}
          >
            Sales CRM
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Dashboard View */}
        {selectedView === 'dashboard' && (
          <div className="space-y-6">
            {/* Payroll Summary */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl glass glow-border-gold">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign size={28} style={{ color: 'var(--secondary)' }} />
                  Payroll Summary
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-[#8B949E] mb-2 font-medium">Total Disbursed (This Month)</div>
                    <div className="text-5xl font-bold" style={{ color: 'var(--secondary)' }}>
                      ₹24,50,000
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#8B949E] mb-2 font-medium">Projected Revenue</div>
                    <div className="text-5xl font-bold" style={{ color: 'var(--primary)' }}>
                      ₹45,75,000
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                      <div className="text-sm text-[#8B949E] font-medium">Employees</div>
                      <div className="text-2xl font-bold">87</div>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                      <div className="text-sm text-[#8B949E] font-medium">Pending</div>
                      <div className="text-2xl font-bold">3</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl glass">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 size={28} style={{ color: 'var(--primary)' }} />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl glass">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 102, 255, 0.2)' }}>
                        <Users size={24} style={{ color: 'var(--primary)' }} />
                      </div>
                      <div>
                        <div className="text-sm text-[#8B949E] font-medium">Active Projects</div>
                        <div className="text-2xl font-bold">24</div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                      +12%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl glass">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255, 193, 7, 0.2)' }}>
                        <Target size={24} style={{ color: 'var(--secondary)' }} />
                      </div>
                      <div>
                        <div className="text-sm text-[#8B949E] font-medium">Tasks Completed</div>
                        <div className="text-2xl font-bold">156</div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                      +28%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl glass">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 102, 255, 0.2)' }}>
                        <Briefcase size={24} style={{ color: 'var(--primary)' }} />
                      </div>
                      <div>
                        <div className="text-sm text-[#8B949E] font-medium">Client Meetings</div>
                        <div className="text-2xl font-bold">8</div>
                      </div>
                    </div>
                    <span className="text-sm text-[#8B949E] font-medium">This Week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Heatmap */}
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar size={28} style={{ color: 'var(--primary)' }} />
                Attendance Heatmap (Last 19 Days)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-3 font-bold min-w-[150px]" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>Employee</th>
                      {Array.from({ length: 19 }, (_, i) => (
                        <th key={i} className="p-2 text-xs font-bold text-center" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                          {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((employee, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="p-3 font-semibold">{employee.name}</td>
                        {employee.days.map((status, dayIdx) => (
                          <td key={dayIdx} className="p-2">
                            <div
                              className="w-8 h-8 rounded-lg mx-auto transition-all hover:scale-110"
                              style={{ background: getAttendanceColor(status) }}
                              title={status === 1 ? 'Present' : status === 0.5 ? 'Half Day' : 'Absent'}
                            ></div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ background: 'var(--success)' }}></div>
                  <span className="text-sm font-medium">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ background: 'var(--warning)' }}></div>
                  <span className="text-sm font-medium">Half Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
                  <span className="text-sm font-medium">Absent/Holiday</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Kanban View */}
        {selectedView === 'kanban' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Project Task Board</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* To-Do Column */}
              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Clock size={20} style={{ color: 'var(--text-secondary)' }} />
                    To-Do
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-bold glass">{kanbanData.todo.length}</span>
                </div>
                <div className="space-y-3">
                  {kanbanData.todo.map((task) => (
                    <div key={task.id} className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm flex-1">{task.title}</h4>
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{ background: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority) }}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {task.assignees.map((assignee, idx) => (
                          <div
                            key={idx}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: 'var(--primary)', color: '#FFFFFF' }}
                          >
                            {assignee}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="p-6 rounded-2xl glass glow-border-blue">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
                    In Progress
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: 'var(--primary)', color: '#FFFFFF' }}>{kanbanData.inProgress.length}</span>
                </div>
                <div className="space-y-3">
                  {kanbanData.inProgress.map((task) => (
                    <div key={task.id} className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm flex-1">{task.title}</h4>
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{ background: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority) }}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {task.assignees.map((assignee, idx) => (
                          <div
                            key={idx}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: 'var(--primary)', color: '#FFFFFF' }}
                          >
                            {assignee}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                    Completed
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: 'var(--success)', color: '#FFFFFF' }}>{kanbanData.completed.length}</span>
                </div>
                <div className="space-y-3">
                  {kanbanData.completed.map((task) => (
                    <div key={task.id} className="p-4 rounded-xl glass hover:border-[#10B981] transition-all cursor-pointer opacity-70">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm flex-1 line-through">{task.title}</h4>
                        <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                      </div>
                      <div className="flex items-center gap-1">
                        {task.assignees.map((assignee, idx) => (
                          <div
                            key={idx}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: 'var(--success)', color: '#FFFFFF' }}
                          >
                            {assignee}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sales CRM View */}
        {selectedView === 'sales' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Sales Pipeline</h2>
            <div className="p-8 rounded-2xl glass glow-blue">
              <div className="space-y-4">
                {salesPipeline.map((stage, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className="p-6 rounded-2xl transition-all hover:scale-[1.02] cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${stage.color}, ${stage.color}88)`,
                        width: `${(stage.count / salesPipeline[0].count) * 100}%`,
                        minWidth: '60%',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{stage.stage}</h3>
                          <p className="text-sm font-medium opacity-90">{stage.count} opportunities</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">��{(stage.value / 1000).toFixed(0)}K</div>
                          <p className="text-sm font-medium opacity-90">Pipeline Value</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl glass text-center">
                  <div className="text-sm text-[#8B949E] mb-1 font-medium">Total Pipeline</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>₹20.95L</div>
                </div>
                <div className="p-4 rounded-xl glass text-center">
                  <div className="text-sm text-[#8B949E] mb-1 font-medium">Conversion Rate</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--secondary)' }}>10%</div>
                </div>
                <div className="p-4 rounded-xl glass text-center">
                  <div className="text-sm text-[#8B949E] mb-1 font-medium">Avg. Deal Size</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>₹15K</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
