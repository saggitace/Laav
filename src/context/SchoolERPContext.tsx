import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  rollNo: number;
  dob: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollment_date: string;
  status: 'active' | 'inactive';
  photo: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  section: string;
  capacity: number;
  schedule: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  remarks: string;
}

export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  examType: string;
  marks: number;
  maxMarks: number;
  grade: string;
  examDate: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'partial' | 'overdue';
  feeType: string;
  month: string;
  receiptNo?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'student' | 'teacher' | 'parent' | 'admin';
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  audience: string;
  author: string;
}

interface SchoolERPContextType {
  // Students
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudent: (id: string) => Student | undefined;

  // Classes
  classes: SchoolClass[];
  addClass: (schoolClass: Omit<SchoolClass, 'id'>) => void;
  updateClass: (id: string, schoolClass: Partial<SchoolClass>) => void;
  deleteClass: (id: string) => void;
  getClassStudents: (classId: string) => Student[];

  // Attendance
  attendance: Attendance[];
  markAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: string, attendance: Partial<Attendance>) => void;
  getAttendanceByDate: (date: string) => Attendance[];
  getStudentAttendance: (studentId: string) => Attendance[];
  calculateAttendancePercentage: (studentId: string) => number;

  // Grades
  grades: Grade[];
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  updateGrade: (id: string, grade: Partial<Grade>) => void;
  getStudentGrades: (studentId: string) => Grade[];
  calculateGPA: (studentId: string) => number;

  // Fees
  fees: Fee[];
  addFee: (fee: Omit<Fee, 'id'>) => void;
  updateFee: (id: string, fee: Partial<Fee>) => void;
  getFeeByStudent: (studentId: string) => Fee[];
  getTotalPendingFees: () => number;

  // Messages
  messages: Message[];
  sendMessage: (message: Omit<Message, 'id'>) => void;
  getConversation: (userId1: string, userId2: string) => Message[];
  markMessageAsRead: (messageId: string) => void;
  getUnreadMessages: (userId: string) => Message[];

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: number, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: number) => void;

  // Statistics
  getTotalStudents: () => number;
  getTotalClasses: () => number;
  getAverageAttendance: () => number;
  getTodayAttendance: () => { present: number; absent: number; leave: number };
}

const SchoolERPContext = createContext<SchoolERPContextType | undefined>(undefined);

export function SchoolERPProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'STU-001',
      name: 'Rajesh Kumar',
      email: 'rajesh@school.edu',
      phone: '+91 98765 43210',
      class: '10th Grade - A',
      rollNo: 15,
      dob: '2009-05-12',
      address: '123 Main St, City',
      parentName: 'Ramesh Kumar',
      parentPhone: '+91 98765 43200',
      parentEmail: 'ramesh@email.com',
      enrollment_date: '2024-01-15',
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200',
    },
    {
      id: 'STU-002',
      name: 'Priya Singh',
      email: 'priya@school.edu',
      phone: '+91 98765 43211',
      class: '10th Grade - A',
      rollNo: 22,
      dob: '2009-03-20',
      address: '456 Oak Ave, City',
      parentName: 'Vikram Singh',
      parentPhone: '+91 98765 43201',
      parentEmail: 'vikram@email.com',
      enrollment_date: '2024-01-15',
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200',
    },
  ]);

  const [classes, setClasses] = useState<SchoolClass[]>([
    {
      id: 'CLASS-001',
      name: '10th Grade - A',
      teacherId: 'TEA-001',
      teacherName: 'Mrs. Sharma',
      studentCount: 35,
      section: 'A',
      capacity: 40,
      schedule: 'Morning Shift (9 AM - 3 PM)',
    },
    {
      id: 'CLASS-002',
      name: '10th Grade - B',
      teacherId: 'TEA-002',
      teacherName: 'Mr. Patel',
      studentCount: 38,
      section: 'B',
      capacity: 40,
      schedule: 'Morning Shift (9 AM - 3 PM)',
    },
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    {
      id: 'ATT-001',
      studentId: 'STU-001',
      classId: 'CLASS-001',
      date: '2024-02-18',
      status: 'present',
      remarks: '',
    },
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    {
      id: 'GRD-001',
      studentId: 'STU-001',
      classId: 'CLASS-001',
      subject: 'Mathematics',
      examType: 'Mid-term',
      marks: 85,
      maxMarks: 100,
      grade: 'A',
      examDate: '2024-02-10',
    },
  ]);

  const [fees, setFees] = useState<Fee[]>([
    {
      id: 'FEE-001',
      studentId: 'STU-001',
      amount: 5000,
      dueDate: '2024-02-28',
      status: 'paid',
      feeType: 'Monthly Tuition',
      month: 'February',
      receiptNo: 'RCP-001',
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Annual Exam Schedule Released',
      content: 'Annual exams will start from March 28. Check your time table on the portal.',
      date: '2024-03-10',
      priority: 'high',
      audience: 'Students & Parents',
      author: 'Admin',
    },
  ]);

  // Student Methods
  const addStudent = (student: Omit<Student, 'id'>) => {
    const newId = `STU-${String(students.length + 1).padStart(3, '0')}`;
    setStudents([...students, { ...student, id: newId }]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const getStudent = (id: string) => students.find((s) => s.id === id);

  // Class Methods
  const addClass = (schoolClass: Omit<SchoolClass, 'id'>) => {
    const newId = `CLASS-${String(classes.length + 1).padStart(3, '0')}`;
    setClasses([...classes, { ...schoolClass, id: newId }]);
  };

  const updateClass = (id: string, updates: Partial<SchoolClass>) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const getClassStudents = (classId: string) => students.filter((s) => s.class === classId);

  // Attendance Methods
  const markAttendance = (att: Omit<Attendance, 'id'>) => {
    const newId = `ATT-${String(new Date().getTime()).slice(-6)}`;
    setAttendance([...attendance, { ...att, id: newId }]);
  };

  const updateAttendance = (id: string, updates: Partial<Attendance>) => {
    setAttendance(attendance.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const getAttendanceByDate = (date: string) => attendance.filter((a) => a.date === date);

  const getStudentAttendance = (studentId: string) => attendance.filter((a) => a.studentId === studentId);

  const calculateAttendancePercentage = (studentId: string) => {
    const studentAtt = getStudentAttendance(studentId);
    if (studentAtt.length === 0) return 0;
    const present = studentAtt.filter((a) => a.status === 'present' || a.status === 'late').length;
    return Math.round((present / studentAtt.length) * 100);
  };

  // Grade Methods
  const addGrade = (grade: Omit<Grade, 'id'>) => {
    const newId = `GRD-${String(grades.length + 1).padStart(3, '0')}`;
    setGrades([...grades, { ...grade, id: newId }]);
  };

  const updateGrade = (id: string, updates: Partial<Grade>) => {
    setGrades(grades.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const getStudentGrades = (studentId: string) => grades.filter((g) => g.studentId === studentId);

  const calculateGPA = (studentId: string) => {
    const studentGrades = getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;
    const total = studentGrades.reduce((sum, g) => sum + g.marks, 0);
    return Number((total / studentGrades.length).toFixed(2));
  };

  // Fee Methods
  const addFee = (fee: Omit<Fee, 'id'>) => {
    const newId = `FEE-${String(fees.length + 1).padStart(3, '0')}`;
    setFees([...fees, { ...fee, id: newId }]);
  };

  const updateFee = (id: string, updates: Partial<Fee>) => {
    setFees(fees.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const getFeeByStudent = (studentId: string) => fees.filter((f) => f.studentId === studentId);

  const getTotalPendingFees = () => {
    return fees
      .filter((f) => f.status === 'pending' || f.status === 'overdue')
      .reduce((sum, f) => sum + f.amount, 0);
  };

  // Message Methods
  const sendMessage = (message: Omit<Message, 'id'>) => {
    const newId = `MSG-${String(new Date().getTime()).slice(-8)}`;
    setMessages([...messages, { ...message, id: newId }]);
  };

  const getConversation = (userId1: string, userId2: string) => {
    return messages.filter(
      (m) =>
        (m.senderId === userId1 && m.recipientId === userId2) ||
        (m.senderId === userId2 && m.recipientId === userId1)
    );
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)));
  };

  const getUnreadMessages = (userId: string) => {
    return messages.filter((m) => m.recipientId === userId && !m.read);
  };

  // Announcement Methods
  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newId = Math.max(...announcements.map((a) => a.id), 0) + 1;
    setAnnouncements([...announcements, { ...announcement, id: newId }]);
  };

  const updateAnnouncement = (id: number, updates: Partial<Announcement>) => {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // Statistics Methods
  const getTotalStudents = () => students.length;

  const getTotalClasses = () => classes.length;

  const getAverageAttendance = () => {
    if (students.length === 0) return 0;
    const attendances = students.map((s) => calculateAttendancePercentage(s.id));
    return Math.round(attendances.reduce((a, b) => a + b, 0) / attendances.length);
  };

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAtt = getAttendanceByDate(today);
    return {
      present: todayAtt.filter((a) => a.status === 'present' || a.status === 'late').length,
      absent: todayAtt.filter((a) => a.status === 'absent').length,
      leave: todayAtt.filter((a) => a.status === 'leave').length,
    };
  };

  const value: SchoolERPContextType = {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudent,
    classes,
    addClass,
    updateClass,
    deleteClass,
    getClassStudents,
    attendance,
    markAttendance,
    updateAttendance,
    getAttendanceByDate,
    getStudentAttendance,
    calculateAttendancePercentage,
    grades,
    addGrade,
    updateGrade,
    getStudentGrades,
    calculateGPA,
    fees,
    addFee,
    updateFee,
    getFeeByStudent,
    getTotalPendingFees,
    messages,
    sendMessage,
    getConversation,
    markMessageAsRead,
    getUnreadMessages,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getTotalStudents,
    getTotalClasses,
    getAverageAttendance,
    getTodayAttendance,
  };

  return <SchoolERPContext.Provider value={value}>{children}</SchoolERPContext.Provider>;
}

export function useSchoolERP() {
  const context = useContext(SchoolERPContext);
  if (!context) {
    throw new Error('useSchoolERP must be used within SchoolERPProvider');
  }
  return context;
}
