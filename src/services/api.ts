import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to attach token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantName: string;
  }): Promise<ApiResponse<any>> {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async login(email: string, password: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/auth/login', { email, password, tenantId });
    return response.data;
  }

  async refreshToken(token: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/auth/refresh', { refreshToken: token });
    return response.data;
  }

  async logout(): Promise<ApiResponse<any>> {
    const response = await this.client.post('/auth/logout');
    return response.data;
  }

  async getProfile(): Promise<ApiResponse<any>> {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  // School endpoints
  async getSchools(tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get('/schools', {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getSchoolById(schoolId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.get(`/schools/${schoolId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async createSchool(schoolData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/schools', schoolData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async updateSchool(schoolId: string, schoolData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.put(`/schools/${schoolId}`, schoolData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async deleteSchool(schoolId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.delete(`/schools/${schoolId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Class endpoints
  async getClasses(schoolId: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/classes?schoolId=${schoolId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getClassById(classId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.get(`/classes/${classId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async createClass(classData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/classes', classData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async updateClass(classId: string, classData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.put(`/classes/${classId}`, classData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async deleteClass(classId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.delete(`/classes/${classId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Student endpoints
  async getStudents(filters?: any, tenantId?: string): Promise<PaginatedResponse<any>> {
    const params = new URLSearchParams();
    if (filters?.classId) params.append('classId', filters.classId);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.page) params.append('page', filters.page);
    if (filters?.limit) params.append('limit', filters.limit);

    const response = await this.client.get(`/students?${params}`, {
      headers: tenantId ? { 'X-Tenant-ID': tenantId } : {},
    });
    return response.data;
  }

  async getStudentById(studentId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.get(`/students/${studentId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async createStudent(studentData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/students', studentData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async updateStudent(studentId: string, studentData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.put(`/students/${studentId}`, studentData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async deleteStudent(studentId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.delete(`/students/${studentId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Attendance endpoints
  async markAttendance(attendanceData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/attendance/mark', attendanceData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getAttendanceByClass(classId: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/attendance/class/${classId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getAttendanceByStudent(studentId: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/attendance/student/${studentId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Grade endpoints
  async submitGrade(gradeData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/grades/submit', gradeData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getGradesByStudent(studentId: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/grades/student/${studentId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getGradesBySubject(subject: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/grades/subject/${subject}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async updateGrade(gradeId: string, gradeData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.put(`/grades/${gradeId}`, gradeData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Fee endpoints
  async createFee(feeData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/fees', feeData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getFeesByStudent(studentId: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/fees/student/${studentId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getFeesBySchool(schoolId: string, tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get(`/fees/school/${schoolId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async updateFeeStatus(feeId: string, status: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.put(`/fees/${feeId}/status`, { status }, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Message endpoints
  async sendMessage(messageData: any, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post('/messages', messageData, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getInbox(tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get('/messages/inbox', {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async getSent(tenantId: string): Promise<ApiResponse<any[]>> {
    const response = await this.client.get('/messages/sent', {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async markMessageAsRead(messageId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.put(`/messages/${messageId}/read`, {}, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  async deleteMessage(messageId: string, tenantId: string): Promise<ApiResponse<any>> {
    const response = await this.client.delete(`/messages/${messageId}`, {
      headers: { 'X-Tenant-ID': tenantId },
    });
    return response.data;
  }

  // Contact endpoints
  async sendContactEmail(data: {
    senderName: string;
    senderEmail: string;
    company?: string;
    message: string;
    companyEmail: string;
  }): Promise<ApiResponse<any>> {
    const response = await this.client.post('/contact/send-email', data);
    return response.data;
  }
}

export default new ApiClient();
