import { useState } from 'react';
import { useSchoolERP } from '../context/SchoolERPContext';
import { AdminLayout } from '../components/AdminLayout';
import { DollarSign, Plus, Check, X, AlertCircle, TrendingUp, Download } from 'lucide-react';

export function FeeManagement() {
  const { students, fees, addFee, updateFee, getFeeByStudent, getTotalPendingFees } = useSchoolERP();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    amount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    feeType: 'Monthly Tuition',
    month: new Date().toLocaleString('default', { month: 'long' }),
  });

  const studentFees = selectedStudent ? getFeeByStudent(selectedStudent) : [];
  const totalPending = getTotalPendingFees();
  const totalPaid = fees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);

  const handleAddFee = () => {
    if (!selectedStudent) return;
    addFee({
      studentId: selectedStudent,
      ...form,
      status: 'pending',
    });
    setForm({
      amount: 0,
      dueDate: new Date().toISOString().split('T')[0],
      feeType: 'Monthly Tuition',
      month: new Date().toLocaleString('default', { month: 'long' }),
    });
    setShowModal(false);
  };

  const handleMarkPaid = (feeId: string) => {
    updateFee(feeId, {
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0],
      receiptNo: `RCP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <DollarSign size={28} style={{ color: 'var(--primary)' }} />
          Fee Management
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
              <Check size={20} style={{ color: '#10B981' }} />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#10B981' }}>
              ₹{(totalPaid / 100000).toFixed(1)}L
            </span>
          </div>
          <p className="text-xs text-[#8B949E] font-medium">Total Collected</p>
        </div>
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle size={20} style={{ color: '#EF4444' }} />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#EF4444' }}>
              ₹{(totalPending / 100000).toFixed(1)}L
            </span>
          </div>
          <p className="text-xs text-[#8B949E] font-medium">Pending Collection</p>
        </div>
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(0, 102, 255, 0.2)' }}>
              <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
              {Math.round((totalPaid / (totalPaid + totalPending)) * 100) || 0}%
            </span>
          </div>
          <p className="text-xs text-[#8B949E] font-medium">Collection Rate</p>
        </div>
      </div>

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
                <div>{student.name}</div>
                <div className="text-xs text-[#8B949E]">{student.class}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fees List */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  {students.find((s) => s.id === selectedStudent)?.name}'s Fees
                </h3>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  <Plus size={20} />
                  Add Fee
                </button>
              </div>

              <div className="space-y-3">
                {studentFees.length > 0 ? (
                  studentFees.map((fee) => (
                    <div
                      key={fee.id}
                      className={`p-4 rounded-xl glass hover:bg-white/5 transition-all border-l-4`}
                      style={{
                        borderColor:
                          fee.status === 'paid'
                            ? '#10B981'
                            : fee.status === 'overdue'
                            ? '#EF4444'
                            : '#F59E0B',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{fee.feeType}</h4>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-bold text-white"
                              style={{
                                background:
                                  fee.status === 'paid'
                                    ? '#10B981'
                                    : fee.status === 'overdue'
                                    ? '#EF4444'
                                    : '#F59E0B',
                              }}
                            >
                              {fee.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#8B949E] font-medium">
                            <span>₹{fee.amount}</span>
                            <span>•</span>
                            <span>Due: {new Date(fee.dueDate).toLocaleDateString()}</span>
                            {fee.paidDate && (
                              <>
                                <span>•</span>
                                <span>Paid: {new Date(fee.paidDate).toLocaleDateString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                        {fee.status !== 'paid' && (
                          <button
                            onClick={() => handleMarkPaid(fee.id)}
                            className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                            style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
                          >
                            <Check size={16} />
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[#8B949E]">
                    <DollarSign size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-medium">No fees added yet</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#8B949E]">
              <DollarSign size={40} className="mx-auto mb-4 opacity-50" />
              <p className="font-medium">Select a student to view fees</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Add New Fee</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Fee Type</label>
                <select
                  value={form.feeType}
                  onChange={(e) => setForm({ ...form, feeType: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                >
                  <option>Monthly Tuition</option>
                  <option>Annual Fee</option>
                  <option>Exam Fee</option>
                  <option>Transport</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Month</label>
                <input
                  type="text"
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg glass bg-white/5 outline-none focus:border-[#0066FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
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
                  onClick={handleAddFee}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  Add Fee
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
