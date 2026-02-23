import { dbService } from './database.service.js';
import { generateId } from '../utils/helpers.js';

export class AttendanceService {
  async markAttendance(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Attendance = dbService.getTenantModel('Attendance');

      const attendance = await Attendance.create({
        ...data,
        _id: generateId(),
      });

      return attendance;
    } catch (error: any) {
      throw new Error(`Failed to mark attendance: ${error.message}`);
    }
  }

  async getAttendanceByClass(tenantId: string, classId: string, startDate?: Date, endDate?: Date) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Attendance = dbService.getTenantModel('Attendance');

      const query: any = { classId };
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = startDate;
        if (endDate) query.date.$lte = endDate;
      }

      return await Attendance.find(query).sort({ date: -1 });
    } catch (error: any) {
      throw new Error(`Failed to fetch attendance: ${error.message}`);
    }
  }

  async getAttendanceByStudent(tenantId: string, studentId: string, startDate?: Date, endDate?: Date) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Attendance = dbService.getTenantModel('Attendance');

      const query: any = { studentId };
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = startDate;
        if (endDate) query.date.$lte = endDate;
      }

      return await Attendance.find(query).sort({ date: -1 });
    } catch (error: any) {
      throw new Error(`Failed to fetch attendance: ${error.message}`);
    }
  }
}

export class GradeService {
  async submitGrade(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Grade = dbService.getTenantModel('Grade');

      const grade = await Grade.create({
        ...data,
        _id: generateId(),
      });

      return grade;
    } catch (error: any) {
      throw new Error(`Failed to submit grade: ${error.message}`);
    }
  }

  async getGradesByStudent(tenantId: string, studentId: string, academicYear?: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Grade = dbService.getTenantModel('Grade');

      const query: any = { studentId };
      if (academicYear) query.academicYear = academicYear;

      return await Grade.find(query);
    } catch (error: any) {
      throw new Error(`Failed to fetch grades: ${error.message}`);
    }
  }

  async getGradesBySubject(tenantId: string, subjectId: string, academicYear?: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Grade = dbService.getTenantModel('Grade');

      const query: any = { subjectId };
      if (academicYear) query.academicYear = academicYear;

      return await Grade.find(query);
    } catch (error: any) {
      throw new Error(`Failed to fetch grades: ${error.message}`);
    }
  }

  async updateGrade(tenantId: string, gradeId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Grade = dbService.getTenantModel('Grade');

      return await Grade.findByIdAndUpdate(gradeId, data, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to update grade: ${error.message}`);
    }
  }
}

export class FeeService {
  async createFee(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Fee = dbService.getTenantModel('Fee');

      const fee = await Fee.create({
        ...data,
        _id: generateId(),
      });

      return fee;
    } catch (error: any) {
      throw new Error(`Failed to create fee: ${error.message}`);
    }
  }

  async getFeesByStudent(tenantId: string, studentId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Fee = dbService.getTenantModel('Fee');

      return await Fee.find({ studentId });
    } catch (error: any) {
      throw new Error(`Failed to fetch fees: ${error.message}`);
    }
  }

  async getFeesBySchool(tenantId: string, schoolId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Fee = dbService.getTenantModel('Fee');

      return await Fee.find({ schoolId });
    } catch (error: any) {
      throw new Error(`Failed to fetch fees: ${error.message}`);
    }
  }

  async updateFeeStatus(tenantId: string, feeId: string, status: string, paidAmount?: number) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Fee = dbService.getTenantModel('Fee');

      const updateData: any = { status, paidDate: new Date() };
      if (paidAmount) updateData.paidAmount = paidAmount;

      return await Fee.findByIdAndUpdate(feeId, updateData, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to update fee: ${error.message}`);
    }
  }
}

export class MessageService {
  async sendMessage(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Message = dbService.getTenantModel('Message');

      const message = await Message.create({
        ...data,
        _id: generateId(),
      });

      return message;
    } catch (error: any) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async getInbox(tenantId: string, userId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Message = dbService.getTenantModel('Message');

      return await Message.find({ recipientId: userId, archived: false }).sort({ createdAt: -1 });
    } catch (error: any) {
      throw new Error(`Failed to fetch inbox: ${error.message}`);
    }
  }

  async getSent(tenantId: string, userId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Message = dbService.getTenantModel('Message');

      return await Message.find({ senderId: userId }).sort({ createdAt: -1 });
    } catch (error: any) {
      throw new Error(`Failed to fetch sent messages: ${error.message}`);
    }
  }

  async markAsRead(tenantId: string, messageId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Message = dbService.getTenantModel('Message');

      return await Message.findByIdAndUpdate(messageId, { read: true, readAt: new Date() }, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to mark message as read: ${error.message}`);
    }
  }

  async deleteMessage(tenantId: string, messageId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Message = dbService.getTenantModel('Message');

      return await Message.findByIdAndDelete(messageId);
    } catch (error: any) {
      throw new Error(`Failed to delete message: ${error.message}`);
    }
  }
}

export const attendanceService = new AttendanceService();
export const gradeService = new GradeService();
export const feeService = new FeeService();
export const messageService = new MessageService();
