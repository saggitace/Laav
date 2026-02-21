import { useState } from 'react';
import { Link } from 'react-router';
import {
  Hospital,
  User,
  Calendar,
  DollarSign,
  Bell,
  Command,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Pill,
  Activity,
  Stethoscope,
  ClipboardList,
  CreditCard,
} from 'lucide-react';

export function HospitalHMS() {
  const [selectedPatient, setSelectedPatient] = useState({
    name: 'Priya Sharma',
    id: 'PAT-2024-5678',
    age: 32,
    gender: 'Female',
    phone: '+91 98765 43210',
    bloodGroup: 'O+',
    photo: 'https://images.unsplash.com/photo-1627260119158-13f1fca542a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGRvY3RvciUyMG1lZGljYWx8ZW58MXx8fHwxNzcxMjIwMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  });

  const [activeTab, setActiveTab] = useState<'history' | 'prescription' | 'billing'>('history');

  const medicalHistory = [
    { date: '2024-02-10', diagnosis: 'Seasonal Allergies', doctor: 'Dr. Kumar', status: 'Treated' },
    { date: '2024-01-15', diagnosis: 'Annual Check-up', doctor: 'Dr. Patel', status: 'Completed' },
    { date: '2023-11-20', diagnosis: 'Flu Symptoms', doctor: 'Dr. Reddy', status: 'Recovered' },
  ];

  const prescriptions = [
    { medicine: 'Amoxicillin 500mg', dosage: '1-0-1', duration: '7 days', prescribed: '2024-02-10' },
    { medicine: 'Paracetamol 650mg', dosage: '1-1-1', duration: '3 days', prescribed: '2024-02-10' },
    { medicine: 'Cetirizine 10mg', dosage: '0-0-1', duration: '5 days', prescribed: '2024-02-10' },
  ];

  const billingItems = [
    { item: 'Consultation Fee', amount: 500 },
    { item: 'Blood Test', amount: 800 },
    { item: 'X-Ray', amount: 1200 },
    { item: 'Medicines', amount: 450 },
  ];

  const doctors = [
    { name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', available: true, patients: 12 },
    { name: 'Dr. Priya Patel', specialty: 'Pediatrics', available: true, patients: 8 },
    { name: 'Dr. Amit Reddy', specialty: 'Orthopedics', available: false, patients: 15 },
    { name: 'Dr. Sneha Singh', specialty: 'Dermatology', available: true, patients: 6 },
    { name: 'Dr. Vikram Gupta', specialty: 'Neurology', available: true, patients: 10 },
  ];

  const timeSlots = [
    { time: '09:00 AM', status: 'booked' },
    { time: '09:30 AM', status: 'available' },
    { time: '10:00 AM', status: 'booked' },
    { time: '10:30 AM', status: 'available' },
    { time: '11:00 AM', status: 'available' },
    { time: '11:30 AM', status: 'booked' },
    { time: '12:00 PM', status: 'available' },
    { time: '12:30 PM', status: 'booked' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '03:00 PM', status: 'booked' },
    { time: '03:30 PM', status: 'available' },
    { time: '04:00 PM', status: 'booked' },
    { time: '04:30 PM', status: 'available' },
    { time: '05:00 PM', status: 'available' },
  ];

  const inventoryAlerts = [
    { medicine: 'Paracetamol 650mg', stock: 45, minStock: 100, status: 'low' },
    { medicine: 'Amoxicillin 500mg', stock: 230, minStock: 150, status: 'good' },
    { medicine: 'Insulin Glargine', stock: 12, minStock: 50, status: 'critical' },
    { medicine: 'Aspirin 75mg', stock: 340, minStock: 200, status: 'good' },
    { medicine: 'Omeprazole 20mg', stock: 68, minStock: 100, status: 'low' },
    { medicine: 'Metformin 500mg', stock: 25, minStock: 100, status: 'critical' },
  ];

  const totalBilling = billingItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/hospital" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Hospital size={24} style={{ color: 'var(--primary)' }} />
              <span className="text-xl font-bold">Hospital Management</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass max-w-md">
              <Command size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search patients, doctors, appointments..."
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
      </header>

      <div className="p-6 space-y-6">
        {/* OPD Patient Record */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient Info Card */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-2xl glass glow-border-blue">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedPatient.photo}
                  alt={selectedPatient.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedPatient.name}</h3>
                  <p className="text-sm text-[#8B949E] font-medium">{selectedPatient.id}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                  <span className="text-sm font-medium text-[#8B949E]">Age</span>
                  <span className="text-sm font-bold">{selectedPatient.age} years</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                  <span className="text-sm font-medium text-[#8B949E]">Gender</span>
                  <span className="text-sm font-bold">{selectedPatient.gender}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                  <span className="text-sm font-medium text-[#8B949E]">Blood Group</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>{selectedPatient.bloodGroup}</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl" style={{ background: 'rgba(0, 102, 255, 0.1)' }}>
                  <span className="text-sm font-medium text-[#8B949E]">Phone</span>
                  <span className="text-sm font-bold">{selectedPatient.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Records with Tabs */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl glass">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'history' ? 'glow-border-blue' : 'glass hover:bg-white/5'
                  }`}
                  style={{
                    background: activeTab === 'history' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                    color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-secondary)',
                  }}
                >
                  <ClipboardList size={16} />
                  Medical History
                </button>
                <button
                  onClick={() => setActiveTab('prescription')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'prescription' ? 'glow-border-blue' : 'glass hover:bg-white/5'
                  }`}
                  style={{
                    background: activeTab === 'prescription' ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                    color: activeTab === 'prescription' ? 'var(--primary)' : 'var(--text-secondary)',
                  }}
                >
                  <FileText size={16} />
                  Prescriptions
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'billing' ? 'glow-border-gold' : 'glass hover:bg-white/5'
                  }`}
                  style={{
                    background: activeTab === 'billing' ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                    color: activeTab === 'billing' ? 'var(--secondary)' : 'var(--text-secondary)',
                  }}
                >
                  <CreditCard size={16} />
                  Billing
                </button>
              </div>

              {/* Medical History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {medicalHistory.map((record, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold mb-1">{record.diagnosis}</h4>
                          <p className="text-sm text-[#8B949E] font-medium">Dr. {record.doctor}</p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: 'var(--success)',
                        }}>
                          {record.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#8B949E] font-medium">
                        <Calendar size={12} />
                        {record.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Prescription Tab */}
              {activeTab === 'prescription' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Current Medications</h3>
                    <span className="text-sm text-[#8B949E] font-medium">Prescribed: 2024-02-10</span>
                  </div>
                  {prescriptions.map((rx, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass hover:border-[#0066FF] transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0, 102, 255, 0.2)' }}>
                            <Pill size={24} style={{ color: 'var(--primary)' }} />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">{rx.medicine}</h4>
                            <p className="text-sm text-[#8B949E] font-medium">Dosage: {rx.dosage} (After meals)</p>
                            <p className="text-xs text-[#8B949E] font-medium mt-1">Duration: {rx.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div>
                  <div className="space-y-3 mb-6">
                    {billingItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl glass">
                        <span className="font-semibold">{item.item}</span>
                        <span className="text-lg font-bold" style={{ color: 'var(--secondary)' }}>₹{item.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 rounded-2xl glow-border-gold" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">Total Amount</span>
                      <span className="text-4xl font-bold" style={{ color: 'var(--secondary)' }}>₹{totalBilling}</span>
                    </div>
                    <button className="w-full mt-4 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FFC107 0%, #FFB300 100%)',
                      color: '#0B0E14',
                    }}>
                      Process Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Doctor Appointment System */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Doctor Schedule List */}
          <div className="p-6 rounded-2xl glass">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Stethoscope size={28} style={{ color: 'var(--primary)' }} />
              Doctor Schedules
            </h3>
            <div className="space-y-3">
              {doctors.map((doctor, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl glass hover:border-[#0066FF] transition-all cursor-pointer ${
                    !doctor.available ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold">{doctor.name}</h4>
                      <p className="text-sm text-[#8B949E] font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                        doctor.available
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {doctor.available ? 'Available' : 'Busy'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <User size={14} style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[#8B949E] font-medium">{doctor.patients} patients today</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slot Booking Grid */}
          <div className="p-6 rounded-2xl glass">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar size={28} style={{ color: 'var(--primary)' }} />
              Available Time Slots
            </h3>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass">
                <div className="w-3 h-3 rounded" style={{ background: 'var(--primary)' }}></div>
                <span className="text-xs font-medium">Booked</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass">
                <div className="w-3 h-3 rounded" style={{ background: 'var(--secondary)' }}></div>
                <span className="text-xs font-medium">Available</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot, idx) => (
                <button
                  key={idx}
                  className={`p-3 rounded-xl font-semibold text-sm transition-all ${
                    slot.status === 'booked'
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105 cursor-pointer'
                  }`}
                  style={{
                    background: slot.status === 'booked'
                      ? 'rgba(0, 102, 255, 0.2)'
                      : 'rgba(255, 193, 7, 0.2)',
                    border: `2px solid ${slot.status === 'booked' ? 'var(--primary)' : 'var(--secondary)'}`,
                    color: slot.status === 'booked' ? 'var(--primary)' : 'var(--secondary)',
                  }}
                  disabled={slot.status === 'booked'}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pharmacy Inventory Alert */}
        <div className="p-6 rounded-2xl glass">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Pill size={28} style={{ color: 'var(--secondary)' }} />
            Pharmacy Inventory Alerts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventoryAlerts.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl glass transition-all ${
                  item.status === 'critical'
                    ? 'border-2 border-red-500 glow-border-gold'
                    : item.status === 'low'
                    ? 'border-2 border-yellow-500'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-sm">{item.medicine}</h4>
                  {item.status !== 'good' && (
                    <AlertTriangle
                      size={20}
                      style={{ color: item.status === 'critical' ? '#EF4444' : 'var(--secondary)' }}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B949E] font-medium">Current Stock:</span>
                    <span className={`font-bold ${
                      item.status === 'critical' ? 'text-red-500' :
                      item.status === 'low' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {item.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B949E] font-medium">Min. Required:</span>
                    <span className="font-bold">{item.minStock} units</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        background: item.status === 'critical' ? '#EF4444' :
                                   item.status === 'low' ? 'var(--secondary)' : 'var(--success)',
                        width: `${(item.stock / item.minStock) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
