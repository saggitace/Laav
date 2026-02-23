import { Response } from 'express';
import { sendSuccess, sendError, sendPaginated } from '../utils/response.js';
import { schoolService, classService, studentService } from '../services/school.service.js';
import { AuthRequest } from '../middleware/tenant.js';
import { parsePaginationParams } from '../utils/helpers.js';

export class SchoolController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const school = await schoolService.createSchool(tenantId, req.body);
      sendSuccess(res, school, 'School created successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const schools = await schoolService.getSchools(tenantId);
      sendSuccess(res, schools, 'Schools retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { schoolId } = req.params;
      const school = await schoolService.getSchoolById(tenantId, schoolId);

      if (!school) {
        sendError(res, 'School not found', 404);
        return;
      }

      sendSuccess(res, school, 'School retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { schoolId } = req.params;
      const school = await schoolService.updateSchool(tenantId, schoolId, req.body);

      if (!school) {
        sendError(res, 'School not found', 404);
        return;
      }

      sendSuccess(res, school, 'School updated successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { schoolId } = req.params;
      const school = await schoolService.deleteSchool(tenantId, schoolId);

      if (!school) {
        sendError(res, 'School not found', 404);
        return;
      }

      sendSuccess(res, {}, 'School deleted successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export class ClassController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const schoolClass = await classService.createClass(tenantId, req.body);
      sendSuccess(res, schoolClass, 'Class created successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getBySchool(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { schoolId } = req.params;
      const classes = await classService.getClassesBySchool(tenantId, schoolId);
      sendSuccess(res, classes, 'Classes retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { classId } = req.params;
      const schoolClass = await classService.getClassById(tenantId, classId);

      if (!schoolClass) {
        sendError(res, 'Class not found', 404);
        return;
      }

      sendSuccess(res, schoolClass, 'Class retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { classId } = req.params;
      const schoolClass = await classService.updateClass(tenantId, classId, req.body);

      if (!schoolClass) {
        sendError(res, 'Class not found', 404);
        return;
      }

      sendSuccess(res, schoolClass, 'Class updated successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { classId } = req.params;
      const schoolClass = await classService.deleteClass(tenantId, classId);

      if (!schoolClass) {
        sendError(res, 'Class not found', 404);
        return;
      }

      sendSuccess(res, {}, 'Class deleted successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export class StudentController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const student = await studentService.createStudent(tenantId, req.body);
      sendSuccess(res, student, 'Student created successfully', 201);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getByClass(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { classId } = req.params;
      const { page = 1, pageSize = 10 } = req.query;

      const students = await studentService.getStudentsByClass(tenantId, classId);
      const { skip, pageSize: size } = parsePaginationParams(page, pageSize);
      const paginatedStudents = students.slice(skip, skip + size);

      sendPaginated(res, paginatedStudents, students.length, Number(page), size);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getBySchool(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { schoolId } = req.params;
      const { page = 1, pageSize = 10 } = req.query;

      const students = await studentService.getStudentsBySchool(tenantId, schoolId);
      const { skip, pageSize: size } = parsePaginationParams(page, pageSize);
      const paginatedStudents = students.slice(skip, skip + size);

      sendPaginated(res, paginatedStudents, students.length, Number(page), size);
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { studentId } = req.params;
      const student = await studentService.getStudentById(tenantId, studentId);

      if (!student) {
        sendError(res, 'Student not found', 404);
        return;
      }

      sendSuccess(res, student, 'Student retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { studentId } = req.params;
      const student = await studentService.updateStudent(tenantId, studentId, req.body);

      if (!student) {
        sendError(res, 'Student not found', 404);
        return;
      }

      sendSuccess(res, student, 'Student updated successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId!;
      const { studentId } = req.params;
      const student = await studentService.deleteStudent(tenantId, studentId);

      if (!student) {
        sendError(res, 'Student not found', 404);
        return;
      }

      sendSuccess(res, {}, 'Student deleted successfully');
    } catch (error: any) {
      sendError(res, error.message, 400);
    }
  }
}

export const schoolController = new SchoolController();
export const classController = new ClassController();
export const studentController = new StudentController();
