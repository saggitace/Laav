import { useState } from 'react';
import { useSchoolERP } from '../context/SchoolERPContext';
import { AdminLayout } from '../components/AdminLayout';
import { Plus, Edit, Trash2, X, Users, BookOpen, Clock, Award } from 'lucide-react';

export function ClassManagement() {
  const { classes, addClass, updateClass, deleteClass, getClassStudents } = useSchoolERP();
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [form, setForm] = useState({ name: '', teacherName: '', section: '', capacity: 30, schedule: '' });

  const handleAdd = () => {
    setEditingClass(null);
    setForm({ name: '', teacherName: '', section: '', capacity: 30, schedule: '' });
    setShowModal(true);
  };

  const handleEdit = (cls: any) => {
    setEditingClass(cls);
    setForm({
      name: cls.name,
      teacherName: cls.teacherName,
      section: cls.section,
      capacity: cls.capacity,
      schedule: cls.schedule,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingClass) {
      updateClass(editingClass.id, form);
    } else {
      addClass({
        teacherId: `TEA-${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        studentCount: 0,
        ...form,
      });
    }
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen size={28} style={{ color: 'var(--primary)' }} />
            Class Management
          </h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
          >
            <Plus size={20} />
            Add Class
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls.id} className="p-6 rounded-2xl glass hover:border-[#0066FF] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{cls.name}</h3>
                <p className="text-xs text-[#8B949E] font-medium">Section {cls.section}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cls)}
                  className="p-2 rounded-lg glass hover:border-[#FFC107] transition-all"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteClass(cls.id)}
                  className="p-2 rounded-lg glass hover:border-[#EF4444] transition-all text-[#EF4444]"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <Award size={16} style={{ color: 'var(--primary)' }} />
                <div className="text-sm font-medium">{cls.teacherName}</div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <Users size={16} style={{ color: 'var(--secondary)' }} />
                <div className="text-sm font-medium">
                  {cls.studentCount} / {cls.capacity} Students
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <Clock size={16} style={{ color: '#10B981' }} />
                <div className="text-sm font-medium truncate">{cls.schedule}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg glass hover:border-[#EF4444]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Class Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  placeholder="e.g., 10th Grade - A"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Section</label>
                  <input
                    type="text"
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                    placeholder="A, B, C..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Capacity</label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Teacher Name</label>
                <input
                  type="text"
                  value={form.teacherName}
                  onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Schedule</label>
                <input
                  type="text"
                  value={form.schedule}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  placeholder="e.g., 9 AM - 3 PM"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg glass hover:border-[#EF4444] font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  {editingClass ? 'Update' : 'Add'} Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
}
