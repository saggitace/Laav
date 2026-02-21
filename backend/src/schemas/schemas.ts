import { Schema, Model, Connection } from 'mongoose';

/**
 * Main database schemas - stored in main database
 */

// Tenant Schema
export const tenantSchema = new Schema({
  _id: { type: String, default: () => `tenant_${Date.now()}_${Math.random()}` },
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  phone: String,
  logo: String,
  website: String,
  subscription: {
    plan: { type: String, enum: ['free', 'starter', 'professional', 'enterprise'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    startDate: Date,
    endDate: Date,
    autoRenewal: { type: Boolean, default: true },
  },
  features: [String],
  maxUsers: { type: Number, default: 50 },
  maxStorage: { type: Number, default: 1000 }, // in MB
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// User Schema (Main DB)
export const userSchema = new Schema({
  _id: { type: String, default: () => `user_${Date.now()}_${Math.random()}` },
  tenantId: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: { type: String, enum: ['super-admin', 'admin', 'teacher', 'student', 'parent', 'staff'], required: true },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  avatar: String,
  phone: String,
  verified: { type: Boolean, default: false },
  verificationToken: String,
  resetToken: String,
  resetTokenExpire: Date,
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Refresh Token Schema
export const refreshTokenSchema = new Schema({
  _id: { type: String, default: () => `token_${Date.now()}_${Math.random()}` },
  userId: { type: String, required: true },
  tenantId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Audit Log Schema
export const auditLogSchema = new Schema({
  _id: { type: String, default: () => `log_${Date.now()}_${Math.random()}` },
  tenantId: { type: String, required: true },
  userId: String,
  action: String,
  resource: String,
  resourceId: String,
  changes: Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

/**
 * Tenant database schemas - created per tenant
 */

// School Schema
export const schoolSchema = new Schema({
  _id: { type: String, default: () => `school_${Date.now()}_${Math.random()}` },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  logo: String,
  principalName: String,
  principalEmail: String,
  established: Date,
  board: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Class Schema
export const classSchema = new Schema({
  _id: { type: String, default: () => `class_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  name: { type: String, required: true },
  academicYear: String,
  section: String,
  classTeacherId: String,
  capacity: Number,
  totalStudents: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Student Schema
export const studentSchema = new Schema({
  _id: { type: String, default: () => `student_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  classId: { type: String, required: true },
  userId: String,
  rollNumber: String,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bloodGroup: String,
  phone: String,
  parentName: String,
  parentPhone: String,
  parentEmail: String,
  address: String,
  emergencyContact: String,
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
  admissionDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Teacher Schema
export const teacherSchema = new Schema({
  _id: { type: String, default: () => `teacher_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  userId: String,
  employeeId: String,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  qualification: String,
  specialization: String,
  phone: String,
  address: String,
  joinDate: Date,
  experience: Number,
  status: { type: String, enum: ['active', 'inactive', 'on-leave'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Subject Schema
export const subjectSchema = new Schema({
  _id: { type: String, default: () => `subject_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  name: { type: String, required: true },
  code: String,
  description: String,
  totalMarks: { type: Number, default: 100 },
  passingMarks: { type: Number, default: 40 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Attendance Schema
export const attendanceSchema = new Schema({
  _id: { type: String, default: () => `attendance_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  classId: { type: String, required: true },
  studentId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late', 'half-day'], required: true },
  remarks: String,
  markedBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Grade Schema
export const gradeSchema = new Schema({
  _id: { type: String, default: () => `grade_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  studentId: { type: String, required: true },
  subjectId: { type: String, required: true },
  academicYear: String,
  term: String,
  marks: { type: Number, required: true },
  gradeType: { type: String, enum: ['midterm', 'final', 'assignment', 'project', 'test'], required: true },
  remarks: String,
  submittedBy: String,
  submittedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Fee Schema
export const feeSchema = new Schema({
  _id: { type: String, default: () => `fee_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  feeType: { type: String, enum: ['tuition', 'transport', 'activity', 'other'], required: true },
  status: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  paidAmount: { type: Number, default: 0 },
  paidDate: Date,
  paymentMethod: String,
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Message Schema
export const messageSchema = new Schema({
  _id: { type: String, default: () => `msg_${Date.now()}_${Math.random()}` },
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  subject: String,
  body: { type: String, required: true },
  attachments: [String],
  read: { type: Boolean, default: false },
  readAt: Date,
  starred: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Notification Schema
export const notificationSchema = new Schema({
  _id: { type: String, default: () => `notif_${Date.now()}_${Math.random()}` },
  userId: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'error', 'success'], default: 'info' },
  title: String,
  body: String,
  read: { type: Boolean, default: false },
  readAt: Date,
  metadata: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

// Leave Request Schema
export const leaveRequestSchema = new Schema({
  _id: { type: String, default: () => `leave_${Date.now()}_${Math.random()}` },
  schoolId: { type: String, required: true },
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: String,
  leaveType: { type: String, enum: ['sick', 'casual', 'urgent'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: String,
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
