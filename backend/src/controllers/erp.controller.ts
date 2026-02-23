import { Response } from 'express';
import { sendSuccess, sendError } from '../utils/response.js';
import { attendanceService, gradeService, feeService, messageService } from '../services/erp.service.js';
import { AuthRequest } from '../middleware/tenant.js';

export class AttendanceController {
  async mark(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const attendance = await attendanceService.markAttendance(tenantId, req.body);
      sendSuccess(res, attendance, 'Attendance marked successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getByClass(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { classId } = req.params;
      const { startDate, endDate } = req.query;

      const records = await attendanceService.getAttendanceByClass(
        tenantId,
        classId,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );

      sendSuccess(res, records, 'Attendance records retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getByStudent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { studentId } = req.params;
      const { startDate, endDate } = req.query;

      const records = await attendanceService.getAttendanceByStudent(
        tenantId,
        studentId,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );

      sendSuccess(res, records, 'Attendance records retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export class GradeController {
  async submit(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const grade = await gradeService.submitGrade(tenantId, req.body);
      sendSuccess(res, grade, 'Grade submitted successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getByStudent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { studentId } = req.params;
      const { academicYear } = req.query;

      const grades = await gradeService.getGradesByStudent(
        tenantId,
        studentId,
        academicYear as string
      );

      sendSuccess(res, grades, 'Grades retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getBySubject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { subjectId } = req.params;
      const { academicYear } = req.query;

      const grades = await gradeService.getGradesBySubject(
        tenantId,
        subjectId,
        academicYear as string
      );

      sendSuccess(res, grades, 'Grades retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { gradeId } = req.params;
      const grade = await gradeService.updateGrade(tenantId, gradeId, req.body);

      if (!grade) {
        sendError(res, 'Grade not found', 404);
        return;
      }

      sendSuccess(res, grade, 'Grade updated successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export class FeeController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const fee = await feeService.createFee(tenantId, req.body);
      sendSuccess(res, fee, 'Fee created successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getByStudent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { studentId } = req.params;
      const fees = await feeService.getFeesByStudent(tenantId, studentId);
      sendSuccess(res, fees, 'Fees retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getBySchool(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { schoolId } = req.params;
      const fees = await feeService.getFeesBySchool(tenantId, schoolId);
      sendSuccess(res, fees, 'Fees retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async updateStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { feeId } = req.params;
      const { status, paidAmount } = req.body;

      const fee = await feeService.updateFeeStatus(tenantId, feeId, status, paidAmount);

      if (!fee) {
        sendError(res, 'Fee not found', 404);
        return;
      }

      sendSuccess(res, fee, 'Fee status updated successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export class MessageController {
  async send(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.id;

      if (!userId) {
        sendError(res, 'User not authenticated', 401);
        return;
      }

      const message = await messageService.sendMessage(tenantId, {
        ...req.body,
        senderId: userId,
      });

      sendSuccess(res, message, 'Message sent successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getInbox(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.id;

      if (!userId) {
        sendError(res, 'User not authenticated', 401);
        return;
      }

      const messages = await messageService.getInbox(tenantId, userId);
      sendSuccess(res, messages, 'Inbox retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getSent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.id;

      if (!userId) {
        sendError(res, 'User not authenticated', 401);
        return;
      }

      const messages = await messageService.getSent(tenantId, userId);
      sendSuccess(res, messages, 'Sent messages retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async markAsRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { messageId } = req.params;

      const message = await messageService.markAsRead(tenantId, messageId);

      if (!message) {
        sendError(res, 'Message not found', 404);
        return;
      }

      sendSuccess(res, message, 'Message marked as read');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { messageId } = req.params;

      const message = await messageService.deleteMessage(tenantId, messageId);

      if (!message) {
        sendError(res, 'Message not found', 404);
        return;
      }

      sendSuccess(res, {}, 'Message deleted successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export const attendanceController = new AttendanceController();
export const gradeController = new GradeController();
export const feeController = new FeeController();
export const messageController = new MessageController();
