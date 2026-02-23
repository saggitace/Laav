import { dbService } from './database.service.js';
import { generateId } from '../utils/helpers.js';

export class SchoolService {
  async createSchool(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const School = dbService.getTenantModel('School');

      const school = await School.create({
        ...data,
        _id: generateId(),
      });

      return school;
    } catch (error: any) {
      throw new Error(`Failed to create school: ${error.message}`);
    }
  }

  async getSchools(tenantId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const School = dbService.getTenantModel('School');

      return await School.find({});
    } catch (error: any) {
      throw new Error(`Failed to fetch schools: ${error.message}`);
    }
  }

  async getSchoolById(tenantId: string, schoolId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const School = dbService.getTenantModel('School');

      return await School.findById(schoolId);
    } catch (error: any) {
      throw new Error(`Failed to fetch school: ${error.message}`);
    }
  }

  async updateSchool(tenantId: string, schoolId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const School = dbService.getTenantModel('School');

      return await School.findByIdAndUpdate(schoolId, data, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to update school: ${error.message}`);
    }
  }

  async deleteSchool(tenantId: string, schoolId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const School = dbService.getTenantModel('School');

      return await School.findByIdAndDelete(schoolId);
    } catch (error: any) {
      throw new Error(`Failed to delete school: ${error.message}`);
    }
  }
}

export class ClassService {
  async createClass(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Class = dbService.getTenantModel('Class');

      const schoolClass = await Class.create({
        ...data,
        _id: generateId(),
      });

      return schoolClass;
    } catch (error: any) {
      throw new Error(`Failed to create class: ${error.message}`);
    }
  }

  async getClassesBySchool(tenantId: string, schoolId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Class = dbService.getTenantModel('Class');

      return await Class.find({ schoolId });
    } catch (error: any) {
      throw new Error(`Failed to fetch classes: ${error.message}`);
    }
  }

  async getClassById(tenantId: string, classId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Class = dbService.getTenantModel('Class');

      return await Class.findById(classId);
    } catch (error: any) {
      throw new Error(`Failed to fetch class: ${error.message}`);
    }
  }

  async updateClass(tenantId: string, classId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Class = dbService.getTenantModel('Class');

      return await Class.findByIdAndUpdate(classId, data, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to update class: ${error.message}`);
    }
  }

  async deleteClass(tenantId: string, classId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Class = dbService.getTenantModel('Class');

      return await Class.findByIdAndDelete(classId);
    } catch (error: any) {
      throw new Error(`Failed to delete class: ${error.message}`);
    }
  }
}

export class StudentService {
  async createStudent(tenantId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Student = dbService.getTenantModel('Student');

      const student = await Student.create({
        ...data,
        _id: generateId(),
      });

      return student;
    } catch (error: any) {
      throw new Error(`Failed to create student: ${error.message}`);
    }
  }

  async getStudentsByClass(tenantId: string, classId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Student = dbService.getTenantModel('Student');

      return await Student.find({ classId });
    } catch (error: any) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
  }

  async getStudentsBySchool(tenantId: string, schoolId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Student = dbService.getTenantModel('Student');

      return await Student.find({ schoolId });
    } catch (error: any) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
  }

  async getStudentById(tenantId: string, studentId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Student = dbService.getTenantModel('Student');

      return await Student.findById(studentId);
    } catch (error: any) {
      throw new Error(`Failed to fetch student: ${error.message}`);
    }
  }

  async updateStudent(tenantId: string, studentId: string, data: any) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Student = dbService.getTenantModel('Student');

      return await Student.findByIdAndUpdate(studentId, data, { new: true });
    } catch (error: any) {
      throw new Error(`Failed to update student: ${error.message}`);
    }
  }

  async deleteStudent(tenantId: string, studentId: string) {
    try {
      await dbService.initializeTenantDB(tenantId);
      const Student = dbService.getTenantModel('Student');

      return await Student.findByIdAndDelete(studentId);
    } catch (error: any) {
      throw new Error(`Failed to delete student: ${error.message}`);
    }
  }
}

export const schoolService = new SchoolService();
export const classService = new ClassService();
export const studentService = new StudentService();
