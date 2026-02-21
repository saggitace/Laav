import { useState } from 'react';
import { useSchoolERP } from '../context/SchoolERPContext';
import { AdminLayout } from '../components/AdminLayout';
import { Calendar, CheckCircle, XCircle, Clock, FileText, TrendingUp } from 'lucide-react';

export function AttendanceManagement() {
  const { students, classes, attendance, markAttendance, getAttendanceByDate, calculateAttendancePercentage } =
    useSchoolERP();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || '');
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: 'present' | 'absent' | 'late' | 'leave' | '' }>({});

  const classStudents = students.filter((s) => s.class === classes.find((c) => c.id === selectedClass)?.name);
  const todayAttendance = getAttendanceByDate(selectedDate);

  const handleToggleAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'leave') => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? '' : status,
    }));
  };

  const handleSubmit = () => {
    Object.entries(attendanceData).forEach(([studentId, status]) => {
      if (status) {
        markAttendance({
          studentId,
          classId: selectedClass,
          date: selectedDate,
          status: status as 'present' | 'absent' | 'late' | 'leave',
          remarks: '',
        });
      }
    });
    setAttendanceData({});
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Calendar size={28} style={{ color: 'var(--primary)' }} />
          Attendance Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
          >
            Submit Attendance
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl glass">
        <h3 className="text-xl font-bold mb-4">Mark Attendance for {classStudents.length} Students</h3>

        <div className="space-y-3">
          {classStudents.map((student) => (
            <div key={student.id} className="p-4 rounded-xl glass hover:bg-white/5 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div>
                    <h4 className="font-semibold">{student.name}</h4>
                    <p className="text-xs text-[#8B949E] font-medium">Roll No: {student.rollNo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleAttendance(student.id, 'present')}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 text-sm ${
                      attendanceData[student.id] === 'present'
                        ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                        : 'glass hover:bg-white/5'
                    }`}
                  >
                    <CheckCircle size={16} />
                    Present
                  </button>
                  <button
                    onClick={() => handleToggleAttendance(student.id, 'absent')}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 text-sm ${
                      attendanceData[student.id] === 'absent'
                        ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                        : 'glass hover:bg-white/5'
                    }`}
                  >
                    <XCircle size={16} />
                    Absent
                  </button>
                  <button
                    onClick={() => handleToggleAttendance(student.id, 'late')}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 text-sm ${
                      attendanceData[student.id] === 'late'
                        ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/50'
                        : 'glass hover:bg-white/5'
                    }`}
                  >
                    <Clock size={16} />
                    Late
                  </button>
                  <button
                    onClick={() => handleToggleAttendance(student.id, 'leave')}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 text-sm ${
                      attendanceData[student.id] === 'leave'
                        ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                        : 'glass hover:bg-white/5'
                    }`}
                  >
                    <FileText size={16} />
                    Leave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Present',
            value: todayAttendance.filter((a) => a.status === 'present' || a.status === 'late').length,
            icon: CheckCircle,
            color: '#10B981',
          },
          {
            label: 'Absent',
            value: todayAttendance.filter((a) => a.status === 'absent').length,
            icon: XCircle,
            color: '#EF4444',
          },
          {
            label: 'Leave',
            value: todayAttendance.filter((a) => a.status === 'leave').length,
            icon: FileText,
            color: '#0066FF',
          },
          {
            label: 'Late',
            value: todayAttendance.filter((a) => a.status === 'late').length,
            icon: Clock,
            color: '#F59E0B',
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl glass">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg" style={{ background: `${stat.color}20` }}>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-[#8B949E] font-medium">{stat.label}</p>
            </div>
          );
        })}
        </div>
      </div>
    </AdminLayout>
  );
}
