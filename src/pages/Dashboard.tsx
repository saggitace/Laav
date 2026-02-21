import { useState } from 'react';
import { useParams, Link } from 'react-router';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  Activity,
  Target,
  Command,
  GraduationCap,
  Building2,
  Hospital,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const { industry = 'office' } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const industryConfig = {
    school: { icon: GraduationCap, name: 'School Management', color: '#0066FF' },
    office: { icon: Building2, name: 'Office Management', color: '#0066FF' },
    hospital: { icon: Hospital, name: 'Hospital Management', color: '#0066FF' },
  };

  const currentIndustry = industryConfig[industry as keyof typeof industryConfig] || industryConfig.office;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Team', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+23.5%',
      positive: true,
      icon: DollarSign,
      color: '#0066FF',
    },
    {
      title: 'Active Users',
      value: '1,429',
      change: '+18.2%',
      positive: true,
      icon: Users,
      color: '#FFC107',
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      positive: true,
      icon: Activity,
      color: '#10B981',
    },
    {
      title: 'ROI Growth',
      value: '+350%',
      change: 'YoY',
      positive: true,
      icon: Target,
      color: '#FFC107',
    },
  ];

  const chartData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 5200 },
    { month: 'Mar', value: 4800 },
    { month: 'Apr', value: 6500 },
    { month: 'May', value: 7200 },
    { month: 'Jun', value: 8100 },
  ];

  const tasks = [
    { id: 1, title: 'Complete Q4 Report', status: 'pending', priority: 'high', assignee: 'John Doe' },
    { id: 2, title: 'Update Marketing Materials', status: 'complete', priority: 'medium', assignee: 'Jane Smith' },
    { id: 3, title: 'Review Budget Proposal', status: 'pending', priority: 'high', assignee: 'Mike Johnson' },
    { id: 4, title: 'Team Training Session', status: 'complete', priority: 'low', assignee: 'Sarah Williams' },
    { id: 5, title: 'Client Presentation Prep', status: 'in-progress', priority: 'high', assignee: 'Tom Brown' },
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      pending: { bg: 'rgba(255, 193, 7, 0.1)', color: '#FFC107', icon: Clock },
      complete: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', icon: CheckCircle },
      'in-progress': { bg: 'rgba(0, 102, 255, 0.1)', color: '#0066FF', icon: Activity },
    };
    const config = configs[status as keyof typeof configs] || configs.pending;
    const Icon = config.icon;
    
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
        style={{ background: config.bg, color: config.color }}
      >
        <Icon size={12} />
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full glass border-r border-white/10 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #FFC107 100%)' }}></div>
            <span className="text-xl font-bold">LAAV <span style={{ color: 'var(--secondary)' }}>IT</span></span>
          </Link>

          {/* Industry Badge */}
          <div className="p-3 rounded-xl mb-6" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
            <div className="flex items-center gap-2">
              <currentIndustry.icon size={20} style={{ color: currentIndustry.color }} />
              <span className="text-sm font-semibold">{currentIndustry.name}</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    item.active
                      ? 'glow-border-blue'
                      : 'glass hover:border-[#0066FF]'
                  }`}
                  style={{
                    background: item.active ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                  }}
                >
                  <Icon size={20} style={{ color: item.active ? 'var(--primary)' : 'var(--text-secondary)' }} />
                  <span style={{ color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass hover:border-red-500 transition-all mt-8 font-medium"
          >
            <LogOut size={20} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="glass border-b border-white/10 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-xl glass hover:border-[#0066FF] transition-all"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h1 className="text-2xl font-bold">Good Morning, Admin</h1>
                <p className="text-sm text-[#8B949E] font-medium">Here's what's happening today</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-3 rounded-xl glass hover:border-[#0066FF] transition-all flex items-center gap-2 font-medium"
              >
                <Command size={16} />
                <span className="hidden md:inline text-sm">+ K</span>
              </button>

              {/* Notifications */}
              <button className="p-3 rounded-xl glass hover:border-[#FFC107] transition-all relative glow-border-gold">
                <Bell size={20} style={{ color: 'var(--secondary)' }} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--secondary)' }}></span>
              </button>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="px-6 pb-4">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass">
                <Search size={20} style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  autoFocus
                  className="flex-1 bg-transparent outline-none font-medium"
                />
              </div>
            </div>
          )}
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Quick Access to Deep ERP Views */}
          <div className="p-6 rounded-2xl glass glow-border-blue">
            <h2 className="text-2xl font-bold mb-4">Access Full ERP System</h2>
            <p className="text-[#8B949E] mb-6 font-medium">
              Explore comprehensive {currentIndustry.name} features and advanced modules
            </p>
            <Link
              to={`/erp/${industry}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 glow-gold"
              style={{ background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)', color: '#0B0E14' }}
            >
              <currentIndustry.icon size={20} />
              Open Full {currentIndustry.name} System
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div key={index} className="p-6 rounded-2xl glass hover:border-[#0066FF] transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center glow-blue group-hover:scale-110 transition-transform" style={{ background: `${kpi.color}20` }}>
                      <Icon size={24} style={{ color: kpi.color }} />
                    </div>
                    <span
                      className="text-sm font-semibold px-2 py-1 rounded-full"
                      style={{
                        background: kpi.positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: kpi.positive ? '#10B981' : '#EF4444',
                      }}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-sm text-[#8B949E] font-medium mb-1">{kpi.title}</div>
                  <div className="text-3xl font-bold">{kpi.value}</div>
                </div>
              );
            })}
          </div>

          {/* Chart Section */}
          <div className="glass rounded-2xl p-6 glow-blue">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                  Growth Over Time
                </h2>
                <p className="text-sm text-[#8B949E] font-medium">Revenue performance last 6 months</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl glass font-semibold text-sm">Monthly</button>
                <button className="px-4 py-2 rounded-xl font-semibold text-sm" style={{ background: 'rgba(0, 102, 255, 0.1)', color: 'var(--primary)' }}>Yearly</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#8B949E" />
                <YAxis stroke="#8B949E" />
                <Tooltip
                  contentStyle={{
                    background: '#161B22',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0066FF"
                  strokeWidth={3}
                  dot={{ fill: '#0066FF', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                  fill="url(#lineGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Industry-Specific Widgets & Task Management */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Industry Widgets */}
            <div className="space-y-6">
              {industry === 'school' && (
                <>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <GraduationCap size={20} style={{ color: 'var(--primary)' }} />
                      Attendance Tracker
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Present Today</span>
                        <span className="text-2xl font-bold" style={{ color: 'var(--success)' }}>842</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Absent</span>
                        <span className="text-2xl font-bold" style={{ color: 'var(--warning)' }}>23</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                        <div className="h-full rounded-full" style={{ background: 'var(--success)', width: '97.3%' }}></div>
                      </div>
                      <p className="text-sm text-[#8B949E] font-medium">97.3% attendance rate</p>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <DollarSign size={20} style={{ color: 'var(--secondary)' }} />
                      Fee Collection
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                        <div className="text-sm text-[#8B949E] font-medium">Collected</div>
                        <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>$124K</div>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                        <div className="text-sm text-[#8B949E] font-medium">Pending</div>
                        <div className="text-2xl font-bold" style={{ color: 'var(--secondary)' }}>$18K</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {industry === 'hospital' && (
                <>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Users size={20} style={{ color: 'var(--primary)' }} />
                      Patient Queue
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'John Doe', room: 'A-102', status: 'In Progress', time: '10 min' },
                        { name: 'Jane Smith', room: 'B-205', status: 'Waiting', time: '25 min' },
                        { name: 'Mike Johnson', room: 'C-301', status: 'Waiting', time: '40 min' },
                      ].map((patient, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl glass">
                          <div>
                            <div className="font-semibold">{patient.name}</div>
                            <div className="text-xs text-[#8B949E]">Room {patient.room}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium" style={{ color: patient.status === 'In Progress' ? 'var(--success)' : 'var(--warning)' }}>
                              {patient.status}
                            </div>
                            <div className="text-xs text-[#8B949E]">{patient.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Activity size={20} style={{ color: 'var(--secondary)' }} />
                      Pharmacy Inventory
                    </h3>
                    <div className="space-y-2">
                      {[
                        { item: 'Paracetamol', stock: 450, status: 'good' },
                        { item: 'Antibiotics', stock: 89, status: 'low' },
                        { item: 'Bandages', stock: 234, status: 'good' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl glass">
                          <span className="font-medium">{item.item}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'good' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {item.stock} units
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {industry === 'office' && (
                <>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <DollarSign size={20} style={{ color: 'var(--secondary)' }} />
                      Payroll Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Payroll</span>
                        <span className="text-2xl font-bold" style={{ color: 'var(--secondary)' }}>$245K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Processed</span>
                        <span className="text-lg font-bold" style={{ color: 'var(--success)' }}>$230K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Pending</span>
                        <span className="text-lg font-bold" style={{ color: 'var(--warning)' }}>$15K</span>
                      </div>
                      <div className="w-full h-3 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                        <div className="h-full rounded-full" style={{ background: 'var(--success)', width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Target size={20} style={{ color: 'var(--primary)' }} />
                      Project Deadlines
                    </h3>
                    <div className="space-y-3">
                      {[
                        { project: 'Website Redesign', deadline: '2 days', progress: 75 },
                        { project: 'Mobile App Launch', deadline: '1 week', progress: 45 },
                        { project: 'Marketing Campaign', deadline: '3 days', progress: 90 },
                      ].map((project, idx) => (
                        <div key={idx} className="p-3 rounded-xl glass">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">{project.project}</span>
                            <span className="text-xs font-medium" style={{ color: 'var(--secondary)' }}>{project.deadline}</span>
                          </div>
                          <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                            <div className="h-full rounded-full" style={{ background: 'var(--primary)', width: `${project.progress}%` }}></div>
                          </div>
                          <div className="text-xs text-[#8B949E] mt-1">{project.progress}% complete</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Task Management */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Task Management</h3>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{task.title}</h4>
                        <p className="text-sm text-[#8B949E] font-medium">{task.assignee}</p>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-semibold"
                        style={{
                          background: task.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : task.priority === 'medium' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(139, 148, 158, 0.1)',
                          color: task.priority === 'high' ? '#EF4444' : task.priority === 'medium' ? '#FFC107' : '#8B949E',
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}