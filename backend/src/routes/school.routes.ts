import { Router } from 'express';
import { schoolController, classController, studentController } from '../controllers/school.controller';
import { authMiddleware, verifyTenantAccess, requireAdmin } from '../middleware/auth';
import { tenantMiddleware } from '../middleware/tenant';
import {
  createSchoolValidation,
  createClassValidation,
  createStudentValidation,
  handleValidationErrors,
} from '../middleware/validation';

const router = Router();

/**
 * All school routes require authentication and tenant verification
 */
router.use(authMiddleware, tenantMiddleware, verifyTenantAccess);

/**
 * School routes
 */
router.post('/schools', createSchoolValidation, handleValidationErrors, schoolController.create.bind(schoolController));
router.get('/schools', schoolController.getAll.bind(schoolController));
router.get('/schools/:schoolId', schoolController.getById.bind(schoolController));
router.put('/schools/:schoolId', requireAdmin, schoolController.update.bind(schoolController));
router.delete('/schools/:schoolId', requireAdmin, schoolController.delete.bind(schoolController));

/**
 * Class routes
 */
router.post('/schools/:schoolId/classes', createClassValidation, handleValidationErrors, classController.create.bind(classController));
router.get('/schools/:schoolId/classes', classController.getBySchool.bind(classController));
router.get('/classes/:classId', classController.getById.bind(classController));
router.put('/classes/:classId', requireAdmin, classController.update.bind(classController));
router.delete('/classes/:classId', requireAdmin, classController.delete.bind(classController));

/**
 * Student routes
 */
router.post('/students', createStudentValidation, handleValidationErrors, studentController.create.bind(studentController));
router.get('/schools/:schoolId/students', studentController.getBySchool.bind(studentController));
router.get('/classes/:classId/students', studentController.getByClass.bind(studentController));
router.get('/students/:studentId', studentController.getById.bind(studentController));
router.put('/students/:studentId', studentController.update.bind(studentController));
router.delete('/students/:studentId', requireAdmin, studentController.delete.bind(studentController));

export default router;
