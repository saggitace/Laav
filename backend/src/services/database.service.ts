import { Connection } from 'mongoose';
import { getTenantConnection, getMainConnection } from '../config/database.js';
import {
  userSchema,
  tenantSchema,
  refreshTokenSchema,
  schoolSchema,
  classSchema,
  studentSchema,
  teacherSchema,
  subjectSchema,
  attendanceSchema,
  gradeSchema,
  feeSchema,
  messageSchema,
  notificationSchema,
  leaveRequestSchema,
} from '../schemas/schemas.js';

export class DatabaseService {
  private mainConnection!: Connection;
  private tenantConnection!: Connection;

  async initializeMainDB(): Promise<void> {
    this.mainConnection = await getMainConnection();

    // Create models for main database
    if (!this.mainConnection.models['Tenant']) {
      this.mainConnection.model('Tenant', tenantSchema);
    }
    if (!this.mainConnection.models['User']) {
      this.mainConnection.model('User', userSchema);
    }
    if (!this.mainConnection.models['RefreshToken']) {
      this.mainConnection.model('RefreshToken', refreshTokenSchema);
    }
  }

  async initializeTenantDB(tenantId: string): Promise<void> {
    this.tenantConnection = await getTenantConnection(tenantId);

    // Create models for tenant database
    if (!this.tenantConnection.models['School']) {
      this.tenantConnection.model('School', schoolSchema);
    }
    if (!this.tenantConnection.models['Class']) {
      this.tenantConnection.model('Class', classSchema);
    }
    if (!this.tenantConnection.models['Student']) {
      this.tenantConnection.model('Student', studentSchema);
    }
    if (!this.tenantConnection.models['Teacher']) {
      this.tenantConnection.model('Teacher', teacherSchema);
    }
    if (!this.tenantConnection.models['Subject']) {
      this.tenantConnection.model('Subject', subjectSchema);
    }
    if (!this.tenantConnection.models['Attendance']) {
      this.tenantConnection.model('Attendance', attendanceSchema);
    }
    if (!this.tenantConnection.models['Grade']) {
      this.tenantConnection.model('Grade', gradeSchema);
    }
    if (!this.tenantConnection.models['Fee']) {
      this.tenantConnection.model('Fee', feeSchema);
    }
    if (!this.tenantConnection.models['Message']) {
      this.tenantConnection.model('Message', messageSchema);
    }
    if (!this.tenantConnection.models['Notification']) {
      this.tenantConnection.model('Notification', notificationSchema);
    }
    if (!this.tenantConnection.models['LeaveRequest']) {
      this.tenantConnection.model('LeaveRequest', leaveRequestSchema);
    }
  }

  getMainModel(modelName: string) {
    return this.mainConnection.model(modelName);
  }

  getTenantModel(modelName: string) {
    return this.tenantConnection.model(modelName);
  }
}

export const dbService = new DatabaseService();
