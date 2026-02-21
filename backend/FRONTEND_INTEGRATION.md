# Frontend Integration Guide

## Backend API Base URL

Update your frontend configuration to point to the backend:

```typescript
// frontend/src/config/api.ts
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const API_VERSION = 'v1';

export const endpoints = {
  // Auth
  register: '/api/auth/register',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  profile: '/api/auth/profile',
  refreshToken: '/api/auth/refresh',

  // Schools
  schools: '/api/v1/schools',
  schoolDetails: (id: string) => `/api/v1/schools/${id}`,

  // Classes
  classes: (schoolId: string) => `/api/v1/schools/${schoolId}/classes`,
  classDetails: (id: string) => `/api/v1/classes/${id}`,

  // Students
  students: '/api/v1/students',
  studentsBySchool: (schoolId: string) => `/api/v1/schools/${schoolId}/students`,
  studentsByClass: (classId: string) => `/api/v1/classes/${classId}/students`,
  studentDetails: (id: string) => `/api/v1/students/${id}`,

  // ERP
  attendance: '/api/v1/erp/attendance',
  grades: '/api/v1/erp/grades',
  fees: '/api/v1/erp/fees',
  messages: '/api/v1/erp/messages',
};
```

## React Hook for API Calls

```typescript
// frontend/src/hooks/useApi.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useApi = () => {
  const getTenantId = () => localStorage.getItem('tenantId');
  const getAccessToken = () => localStorage.getItem('accessToken');

  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  // Add request interceptor
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    const tenantId = getTenantId();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
  });

  // Handle response
  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        // Handle token expiry - redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tenantId');
        window.location.href = '/login';
      }
      throw error;
    }
  );

  return api;
};
```

## Using in React Component

```typescript
// frontend/src/pages/SchoolManagement.tsx
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

export const SchoolManagement = () => {
  const api = useApi();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/schools');
      setSchools(response.data);
    } catch (error) {
      console.error('Failed to fetch schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSchool = async (schoolData: any) => {
    try {
      const response = await api.post('/api/v1/schools', schoolData);
      setSchools([...schools, response.data]);
    } catch (error) {
      console.error('Failed to create school:', error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div>
      <h1>Schools</h1>
      {/* Render schools */}
    </div>
  );
};
```

## Authentication Context

```typescript
// frontend/src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any | null;
  tenantId: string | null;
  isAuthenticated: boolean;
  register: (data: any) => Promise<void>;
  login: (email: string, password: string, tenantId: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [tenantId, setTenantId] = useState<string | null>(
    localStorage.getItem('tenantId')
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  });

  const register = async (data: any) => {
    try {
      const response = await api.post('/api/auth/register', data);
      const { user: newUser, tenant, accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('tenantId', tenant.id);

      setUser(newUser);
      setTenantId(tenant.id);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string, tenantId: string) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
        tenantId,
      });

      const { user: loginUser, accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('tenantId', tenantId);

      setUser(loginUser);
      setTenantId(tenantId);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tenantId');

    setUser(null);
    setTenantId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tenantId,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Usage in Frontend App

```typescript
// frontend/src/main.tsx
import { AuthProvider } from './context/AuthContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

## Login Page Example

```typescript
// frontend/src/pages/Login.tsx
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password, tenantId);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tenant ID"
        value={tenantId}
        onChange={(e) => setTenantId(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

## Protected Route Example

```typescript
// frontend/src/components/ProtectedRoute.tsx
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Usage:
// <ProtectedRoute>
//   <Dashboard />
// </ProtectedRoute>
```

## Environment Variables

Create `.env` in frontend root:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Vite Configuration (if using Vite)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

## API Response Handling

```typescript
// frontend/src/utils/apiResponse.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An error occurred';
};
```

## Common API Calls

```typescript
// Get current user
GET /api/auth/profile

// Create school
POST /api/v1/schools
{
  "name": "School Name",
  "email": "school@example.com",
  ...
}

// Get students with pagination
GET /api/v1/schools/:schoolId/students?page=1&pageSize=10

// Mark attendance
POST /api/v1/erp/attendance
{
  "classId": "class_id",
  "date": "2024-02-20",
  "records": [...]
}

// Get student grades
GET /api/v1/erp/grades/student/:studentId?academicYear=2024-2025

// Send message
POST /api/v1/erp/messages
{
  "recipientId": "user_id",
  "subject": "Subject",
  "body": "Message body"
}
```

## Testing API Locally

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

3. **Test Registration**
   - Go to http://localhost:5173/register
   - Create new tenant account
   - Backend creates database for tenant

4. **Test API**
   - Create school, classes, students
   - Mark attendance
   - View grades and fees

---

## Troubleshooting

### CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend CORS_ORIGIN includes frontend URL
- Check header: `X-Tenant-ID` is being sent

### 401 Unauthorized
**Error:** `Invalid token`

**Solution:**
- Refresh token: POST /api/auth/refresh
- Check token is not expired
- Re-login if token invalid

### 403 Forbidden
**Error:** `Insufficient permissions`

**Solution:**
- Check user role (admin, teacher, student)
- Some operations require admin role

---

## Next Steps

1. ✅ Backend running and tested
2. ✅ Frontend integrated with API
3. ✅ Authentication working
4. Next: Deploy both to production
