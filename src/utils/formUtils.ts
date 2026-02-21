// Common form utilities for easy API integration
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';

export const formUtils = {
  // Generic create handler
  async createResource(
    endpoint: (data: any, tenantId: string) => Promise<any>,
    data: any,
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) {
    const tenantId = authUtils.getTenantId();
    if (!tenantId) {
      onError?.('Tenant ID not found');
      return;
    }

    try {
      const response = await endpoint(data, tenantId);
      if (response.success) {
        onSuccess?.();
        return response.data;
      } else {
        onError?.(response.message || 'Failed to create');
      }
    } catch (error: any) {
      onError?.(error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Generic update handler
  async updateResource(
    endpoint: (id: string, data: any, tenantId: string) => Promise<any>,
    id: string,
    data: any,
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) {
    const tenantId = authUtils.getTenantId();
    if (!tenantId) {
      onError?.('Tenant ID not found');
      return;
    }

    try {
      const response = await endpoint(id, data, tenantId);
      if (response.success) {
        onSuccess?.();
        return response.data;
      } else {
        onError?.(response.message || 'Failed to update');
      }
    } catch (error: any) {
      onError?.(error.response?.data?.message || error.message);
      throw error;
    }
  },

  // Generic delete handler
  async deleteResource(
    endpoint: (id: string, tenantId: string) => Promise<any>,
    id: string,
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) {
    const tenantId = authUtils.getTenantId();
    if (!tenantId) {
      onError?.('Tenant ID not found');
      return;
    }

    try {
      const response = await endpoint(id, tenantId);
      if (response.success) {
        onSuccess?.();
        return response.data;
      } else {
        onError?.(response.message || 'Failed to delete');
      }
    } catch (error: any) {
      onError?.(error.response?.data?.message || error.message);
      throw error;
    }
  },
};

// Example usage in a component:
/*
import { formUtils } from '../utils/formUtils';
import apiClient from '../services/api';

const handleCreateStudent = async (studentData) => {
  await formUtils.createResource(
    apiClient.createStudent,
    studentData,
    () => {
      console.log('Student created successfully');
      refetch(); // Refresh list
    },
    (error) => {
      console.error('Error creating student:', error);
      // Show error toast
    }
  );
};
*/
