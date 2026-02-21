import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';

interface UseDataReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseDataFilters {
  classId?: string;
  schoolId?: string;
  page?: number;
  limit?: number;
}

// Students Hook
export const useStudents = (filters?: UseDataFilters): UseDataReturn<any> => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = authUtils.getTenantId();

  const fetchStudents = useCallback(async () => {
    if (!tenantId) {
      setError('Tenant ID not found');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.getStudents(filters, tenantId);
      if (response.success) {
        setData(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  }, [filters, tenantId]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { data, isLoading, error, refetch: fetchStudents };
};

// Classes Hook
export const useClasses = (schoolId?: string): UseDataReturn<any> => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = authUtils.getTenantId();

  const fetchClasses = useCallback(async () => {
    if (!tenantId || !schoolId) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getClasses(schoolId, tenantId);
      if (response.success) {
        setData(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch classes');
    } finally {
      setIsLoading(false);
    }
  }, [schoolId, tenantId]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return { data, isLoading, error, refetch: fetchClasses };
};

// Attendance Hook
export const useAttendance = (classId?: string): UseDataReturn<any> => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = authUtils.getTenantId();

  const fetchAttendance = useCallback(async () => {
    if (!tenantId || !classId) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getAttendanceByClass(classId, tenantId);
      if (response.success) {
        setData(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch attendance');
    } finally {
      setIsLoading(false);
    }
  }, [classId, tenantId]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { data, isLoading, error, refetch: fetchAttendance };
};

// Grades Hook
export const useGrades = (studentId?: string): UseDataReturn<any> => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = authUtils.getTenantId();

  const fetchGrades = useCallback(async () => {
    if (!tenantId || !studentId) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getGradesByStudent(studentId, tenantId);
      if (response.success) {
        setData(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch grades');
    } finally {
      setIsLoading(false);
    }
  }, [studentId, tenantId]);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  return { data, isLoading, error, refetch: fetchGrades };
};

// Fees Hook
export const useFees = (studentId?: string): UseDataReturn<any> => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = authUtils.getTenantId();

  const fetchFees = useCallback(async () => {
    if (!tenantId || !studentId) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getFeesByStudent(studentId, tenantId);
      if (response.success) {
        setData(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch fees');
    } finally {
      setIsLoading(false);
    }
  }, [studentId, tenantId]);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  return { data, isLoading, error, refetch: fetchFees };
};

// Messages Hook
export const useMessages = (): UseDataReturn<any> => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = authUtils.getTenantId();

  const fetchMessages = useCallback(async () => {
    if (!tenantId) return;

    setIsLoading(true);
    try {
      const response = await apiClient.getInbox(tenantId);
      if (response.success) {
        setData(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { data, isLoading, error, refetch: fetchMessages };
};
