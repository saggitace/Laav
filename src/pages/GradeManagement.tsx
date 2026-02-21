import { useState } from 'react';
import { useSchoolERP } from '../context/SchoolERPContext';
import { AdminLayout } from '../components/AdminLayout';
import { Award, Plus, Edit, Trash2, X, BarChart3, TrendingUp } from 'lucide-react';

export function GradeManagement() {
  const { students, classes, grades, addGrade, updateGrade, getStudentGrades, calculateGPA } = useSchoolERP();
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || '');
  const [editingGrade, setEditingGrade] = useState<any>(null);
  const [form, setForm] = useState({
    subject: '',
    examType: 'Mid-term',
    marks: 0,
    maxMarks: 100,
    examDate: new Date().toISOString().split('T')[0],
  });

  const studentGrades = selectedStudent ? getStudentGrades(selectedStudent) : [];
  const studentGPA = selectedStudent ? calculateGPA(selectedStudent) : 0;

  const getGradeFromMarks = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const handleAdd = () => {
    setEditingGrade(null);
    setForm({ subject: '', examType: 'Mid-term', marks: 0, maxMarks: 100, examDate: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!selectedStudent) return;
    const grade = getGradeFromMarks(form.marks, form.maxMarks);
    if (editingGrade) {
      updateGrade(editingGrade.id, { ...form, grade });
    } else {
      addGrade({
        studentId: selectedStudent,
        classId: selectedClass,
        grade,
        ...form,
      });
    }
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Award size={28} style={{ color: 'var(--primary)' }} />
          Grade Management
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Selection */}
        <div className="p-6 rounded-2xl glass">
          <h3 className="text-lg font-bold mb-4">Select Student</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                  selectedStudent === student.id
                    ? 'glass border-[1.5px]'
                    : 'text-[#8B949E] hover:bg-white/5'
                }`}
                style={selectedStudent === student.id ? { borderColor: 'var(--primary)', background: 'rgba(0, 102, 255, 0.1)', color: 'var(--primary)' } : {}}
              >
                {student.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grades List */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">
                    {students.find((s) => s.id === selectedStudent)?.name}
                  </h3>
                  <p className="text-sm text-[#8B949E] font-medium">Overall GPA: {studentGPA.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  <Plus size={20} />
                  Add Grade
                </button>
              </div>

              <div className="space-y-3">
                {studentGrades.length > 0 ? (
                  studentGrades.map((grade) => (
                    <div key={grade.id} className="p-4 rounded-xl glass hover:bg-white/5 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{grade.subject}</h4>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold text-white"
                              style={{
                                background:
                                  grade.grade === 'A+' || grade.grade === 'A'
                                    ? '#10B981'
                                    : grade.grade === 'B+' || grade.grade === 'B'
                                    ? '#F59E0B'
                                    : '#EF4444',
                              }}
                            >
                              {grade.grade}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#8B949E] font-medium">
                            <span>{grade.examType}</span>
                            <span>•</span>
                            <span>{grade.marks}/{grade.maxMarks}</span>
                            <span>•</span>
                            <span>{new Date(grade.examDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingGrade(grade);
                              setForm({
                                subject: grade.subject,
                                examType: grade.examType,
                                marks: grade.marks,
                                maxMarks: grade.maxMarks,
                                examDate: grade.examDate,
                              });
                              setShowModal(true);
                            }}
                            className="p-2 rounded-lg glass hover:border-[#FFC107] transition-all"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-2 rounded-lg glass hover:border-[#EF4444] transition-all text-[#EF4444]">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[#8B949E]">
                    <Award size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-medium">No grades added yet</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#8B949E]">
              <Award size={40} className="mx-auto mb-4 opacity-50" />
              <p className="font-medium">Select a student to view grades</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">{editingGrade ? 'Edit Grade' : 'Add New Grade'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg glass hover:border-[#EF4444]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Exam Type</label>
                <select
                  value={form.examType}
                  onChange={(e) => setForm({ ...form, examType: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                >
                  <option>Mid-term</option>
                  <option>Final</option>
                  <option>Quiz</option>
                  <option>Assignment</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Marks</label>
                  <input
                    type="number"
                    value={form.marks}
                    onChange={(e) => setForm({ ...form, marks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Max Marks</label>
                  <input
                    type="number"
                    value={form.maxMarks}
                    onChange={(e) => setForm({ ...form, maxMarks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Exam Date</label>
                <input
                  type="date"
                  value={form.examDate}
                  onChange={(e) => setForm({ ...form, examDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
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
                  {editingGrade ? 'Update' : 'Add'} Grade
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
