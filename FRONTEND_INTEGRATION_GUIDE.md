# Frontend Integration Complete - Setup Guide

## ✅ What's Been Done

### 1. **API Client Service** (`src/services/api.ts`)
- Axios-based HTTP client for backend communication
- Automatic JWT token injection in request headers
- Error handling and token refresh logic
- All endpoints from backend mapped to service methods
- Supports multi-tenant requests with `X-Tenant-ID` headers

### 2. **Authentication System**
- **Auth Utils** (`src/utils/auth.ts`): Token and user management
- **useAuth Hook** (`src/hooks/useAuth.ts`): Registration, login, logout flows
- Secure localStorage for token persistence
- Token expiration checking

### 3. **Data Fetching Hooks** (`src/hooks/useData.ts`)
- `useStudents()` - Fetch student data with filters
- `useClasses()` - Fetch classes by school
- `useAttendance()` - Fetch attendance records
- `useGrades()` - Fetch student grades
- `useFees()` - Fetch fee records
- `useMessages()` - Fetch messages/inbox

### 4. **Authentication Pages**
- **Login Page** (`src/pages/Login.tsx`) - New login component
- **Onboarding Page** - Updated with backend integration
  - Register tenant and admin user
  - Saves tokens and redirects to dashboard

### 5. **Protected Routes** (`src/components/ProtectedRoute.tsx`)
- Route protection based on authentication
- Role-based access control support
- Automatic redirect to login if not authenticated

### 6. **Updated Routes** (`src/routes.ts`)
- New `/login` route
- Protected routes with `<ProtectedRoute>` wrapper
- Role-based route protection
- Updated navigation paths

### 7. **Environment Configuration** (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 How to Use

### Step 1: Start the Backend
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

### Step 2: Start the Frontend
```bash
cd root directory
npm run dev
# Frontend runs on http://localhost:5173 (or similar)
```

### Step 3: Test the Flow
1. Go to `http://localhost:5173/onboarding`
2. Fill in the registration form:
   - Organization Name
   - First Name
   - Last Name
   - Email
   - Password (min 6 chars)
3. Click "Create Account"
4. You'll be redirected to the School ERP dashboard
5. Tokens are automatically saved to localStorage

### Step 4: Making API Calls in Components

**Using the API Client Directly:**
```typescript
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';

const tenantId = authUtils.getTenantId();

// Get schools
const response = await apiClient.getSchools(tenantId);

// Create a student
await apiClient.createStudent(studentData, tenantId);

// Update attendance
await apiClient.markAttendance(attendanceData, tenantId);
```

**Using Custom Hooks:**
```typescript
import { useStudents, useGrades, useFees } from '../hooks/useData';

export function MyComponent() {
  const { data: students, isLoading, error } = useStudents();
  const { data: grades } = useGrades(studentId);
  const { data: fees } = useFees(studentId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {students.map(student => (
        <div key={student.id}>{student.name}</div>
      ))}
    </div>
  );
}
```

**Using useAuth Hook:**
```typescript
import { useAuth } from '../hooks/useAuth';

export function LoginComponent() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    await login(email, password, tenantId);
    // Redirect happens in hook
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      Sign In
    </button>
  );
}
```

## 📋 Remaining Tasks

### 1. Update Dashboard Pages
- [ ] StudentDashboard - Integration partially done, complete the rest
- [ ] TeacherDashboard - Add API calls for classes, students, grades
- [ ] ParentDashboard - Add API calls for fees, attendance, grades
- [ ] AdminSchoolERP - Add API calls for all admin functions

### 2. Update Management Pages
- [ ] ClassManagement - Add create, update, delete with API calls
- [ ] AttendanceManagement - Integrate attendance marking
- [ ] GradeManagement - Integrate grade submission
- [ ] FeeManagement - Integrate fee creation and management
- [ ] MessagingSystem - Integrate messaging endpoints

### 3. Error Handling
- [ ] Add error boundaries in components
- [ ] Display user-friendly error messages
- [ ] Implement retry logic for failed requests

### 4. Loading States
- [ ] Add skeleton loaders for data
- [ ] Show loading indicators during requests

### 5. Form Handling
- [ ] Add form validation
- [ ] Show success/error toasts for API responses
- [ ] Implement optimistic updates where applicable

## 🔧 API Integration Example

Here's how to integrate a simple CRUD operation:

```typescript
import { useState } from 'react';
import { useStudents } from '../hooks/useData';
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';

export function StudentManagement() {
  const { data: students, refetch } = useStudents();
  const tenantId = authUtils.getTenantId()!;
  const [loading, setLoading] = useState(false);

  const handleAddStudent = async (formData) => {
    setLoading(true);
    try {
      await apiClient.createStudent(formData, tenantId);
      await refetch(); // Refresh the list
      // Show success toast
    } catch (error) {
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {students.map(student => (
        <StudentCard key={student.id} student={student} onDelete={refetch} />
      ))}
    </div>
  );
}
```

## 🎯 Next Steps

1. **Complete Dashboard Integrations**: Update remaining dashboard pages with real API data
2. **Add CRUD Operations**: Implement create, update, delete for all management pages
3. **Error Handling**: Add comprehensive error handling and user feedback
4. **Loading States**: Implement proper loading indicators
5. **Form Validation**: Add client-side validation for all forms
6. **Testing**: Test all flows end-to-end

## 🔒 Authentication Flow

1. User goes to `/onboarding` or `/login`
2. Submits credentials via `useAuth` hook
3. Backend validates and returns JWT tokens
4. Tokens stored in localStorage via `authUtils`
5. All subsequent API calls include token in Authorization header
6. If token expires, 401 interceptor redirects to login
7. Protected routes check `authUtils.isAuthenticated()` before rendering

## 📚 Important Files

- `src/services/api.ts` - API client with all endpoints
- `src/hooks/useAuth.ts` - Authentication hook
- `src/hooks/useData.ts` - Data fetching hooks
- `src/utils/auth.ts` - Auth utility functions
- `src/components/ProtectedRoute.tsx` - Route protection
- `.env` - Environment variables
- `src/routes.ts` - Application routes

## ⚠️ Common Issues

**Issue: CORS errors**
- Solution: Backend should have CORS enabled for http://localhost:5173

**Issue: 401 Unauthorized**
- Solution: Check if token is properly saved in localStorage
- Try logging in again

**Issue: Tenant ID not found**
- Solution: Make sure you registered/logged in successfully
- Check localStorage for 'tenantId' key

**Issue: API not responding**
- Solution: Make sure backend is running on port 5000
- Check VITE_API_URL in .env file

## 🎉 Success Indicators

When everything is working:
- ✅ Can register a new organization
- ✅ Can login with credentials
- ✅ Dashboard loads with real data
- ✅ Can create/update/delete data
- ✅ Logout clears auth state
- ✅ Protected routes work correctly
