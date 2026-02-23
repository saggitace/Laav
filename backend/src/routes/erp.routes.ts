import { Router } from 'express';
import {
  attendanceController,
  gradeController,
  feeController,
  messageController,
} from '../controllers/erp.controller';
import { authMiddleware, verifyTenantAccess, requireAdmin } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import {
  markAttendanceValidation,
  submitGradeValidation,
  createFeeValidation,
  sendMessageValidation,
  handleValidationErrors,
} from '../middleware/validation';

const router = Router();

/**
 * All ERP routes require authentication and tenant verification
 */
router.use(authMiddleware, tenantMiddleware, verifyTenantAccess);

/**
 * Attendance routes
 */
router.post('/attendance', markAttendanceValidation, handleValidationErrors, attendanceController.mark.bind(attendanceController));
router.get('/attendance/class/:classId', attendanceController.getByClass.bind(attendanceController));
router.get('/attendance/student/:studentId', attendanceController.getByStudent.bind(attendanceController));

/**
 * Grade routes
 */
router.post('/grades', submitGradeValidation, handleValidationErrors, gradeController.submit.bind(gradeController));
router.get('/grades/student/:studentId', gradeController.getByStudent.bind(gradeController));
router.get('/grades/subject/:subjectId', gradeController.getBySubject.bind(gradeController));
router.put('/grades/:gradeId', requireAdmin, gradeController.update.bind(gradeController));

/**
 * Fee routes
 */
router.post('/fees', createFeeValidation, handleValidationErrors, feeController.create.bind(feeController));
router.get('/fees/student/:studentId', feeController.getByStudent.bind(feeController));
router.get('/fees/school/:schoolId', feeController.getBySchool.bind(feeController));
router.patch('/fees/:feeId/status', requireAdmin, feeController.updateStatus.bind(feeController));

/**
 * Message routes
 */
router.post('/messages', sendMessageValidation, handleValidationErrors, messageController.send.bind(messageController));
router.get('/messages/inbox', messageController.getInbox.bind(messageController));
router.get('/messages/sent', messageController.getSent.bind(messageController));
router.patch('/messages/:messageId/read', messageController.markAsRead.bind(messageController));
router.delete('/messages/:messageId', messageController.delete.bind(messageController));

export default router;
