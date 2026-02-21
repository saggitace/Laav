# 🚀 Frontend Integration - Quick Reference Card

## Getting Started (2 Minutes)

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm run dev

# Browser
http://localhost:5173/onboarding
```

## API Usage Patterns

### Use Data Hooks
```typescript
import { useStudents, useGrades, useFees } from '../hooks/useData';

const { data, isLoading, error, refetch } = useStudents();
const { data: grades } = useGrades(studentId);
const { data: fees } = useFees(studentId);
```

### Use Authentication
```typescript
import { useAuth } from '../hooks/useAuth';
import { authUtils } from '../utils/auth';

const { login, register, logout, isLoading } = useAuth();
const user = authUtils.getUser();
const token = authUtils.getAccessToken();
const tenantId = authUtils.getTenantId();
```

### Create/Update/Delete
```typescript
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';

const tenantId = authUtils.getTenantId()!;

// Create
await apiClient.createStudent(data, tenantId);

// Update
await apiClient.updateStudent(id, data, tenantId);

// Delete
await apiClient.deleteStudent(id, tenantId);
```

## Common Data Models

### Student
```typescript
{
  id: string;
  name: string;
  email: string;
  classId: string;
  rollNo: number;
  status: 'active' | 'inactive';
}
```

### Class
```typescript
{
  id: string;
  name: string;
  section: string;
  teacherId: string;
  capacity: number;
  studentCount: number;
}
```

### Grade
```typescript
{
  id: string;
  studentId: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  examType: string;
}
```

### Fee
```typescript
{
  id: string;
  studentId: string;
  amount: number;
  feeType: string;
  month: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
}
```

### Attendance
```typescript
{
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  remarks?: string;
}
```

## All 37 Endpoints

### Auth (5)
```
POST   /auth/register         useAuth().register()
POST   /auth/login           useAuth().login()
POST   /auth/refresh         useAuth().refreshAuth()
POST   /auth/logout          useAuth().logout()
GET    /auth/profile         apiClient.getProfile()
```

### Schools (5)
```
GET    /schools              apiClient.getSchools(tenantId)
POST   /schools              apiClient.createSchool(data, tenantId)
GET    /schools/:id          apiClient.getSchoolById(id, tenantId)
PUT    /schools/:id          apiClient.updateSchool(id, data, tenantId)
DELETE /schools/:id          apiClient.deleteSchool(id, tenantId)
```

### Classes (5)
```
GET    /classes              apiClient.getClasses(schoolId, tenantId)
POST   /classes              apiClient.createClass(data, tenantId)
GET    /classes/:id          apiClient.getClassById(id, tenantId)
PUT    /classes/:id          apiClient.updateClass(id, data, tenantId)
DELETE /classes/:id          apiClient.deleteClass(id, tenantId)
```

### Students (6)
```
GET    /students             useStudents()
POST   /students             apiClient.createStudent(data, tenantId)
GET    /students/:id         apiClient.getStudentById(id, tenantId)
PUT    /students/:id         apiClient.updateStudent(id, data, tenantId)
DELETE /students/:id         apiClient.deleteStudent(id, tenantId)
PAGINATION support with filters
```

### Attendance (3)
```
POST   /attendance/mark                apiClient.markAttendance(data, tenantId)
GET    /attendance/class/:classId      apiClient.getAttendanceByClass(id, tenantId)
GET    /attendance/student/:studentId  useAttendance(studentId)
```

### Grades (4)
```
POST   /grades/submit                  apiClient.submitGrade(data, tenantId)
GET    /grades/student/:studentId      useGrades(studentId)
GET    /grades/subject/:subject        apiClient.getGradesBySubject(subj, tenantId)
PUT    /grades/:id                     apiClient.updateGrade(id, data, tenantId)
```

### Fees (4)
```
POST   /fees                           apiClient.createFee(data, tenantId)
GET    /fees/student/:studentId        useFees(studentId)
GET    /fees/school/:schoolId          apiClient.getFeesBySchool(id, tenantId)
PUT    /fees/:id/status                apiClient.updateFeeStatus(id, status, tenantId)
```

### Messages (5)
```
POST   /messages                       apiClient.sendMessage(data, tenantId)
GET    /messages/inbox                 useMessages()
GET    /messages/sent                  apiClient.getSent(tenantId)
PUT    /messages/:id/read              apiClient.markMessageAsRead(id, tenantId)
DELETE /messages/:id                   apiClient.deleteMessage(id, tenantId)
```

## Component Template

```typescript
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStudents } from '../hooks/useData';
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';
import { Loader, AlertCircle } from 'lucide-react';

export function MyPage() {
  const navigate = useNavigate();
  const user = authUtils.getUser();
  const tenantId = authUtils.getTenantId();
  
  const { data, isLoading, error, refetch } = useStudents();
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleCreate = async (formData) => {
    setCreating(true);
    try {
      await apiClient.createStudent(formData, tenantId!);
      await refetch();
      // Show success toast
    } catch (err) {
      // Show error toast
    } finally {
      setCreating(false);
    }
  };

  if (isLoading) return <Loader className="animate-spin" />;
  if (error) return <AlertCircle /> {error};

  return (
    <div>
      {/* Your UI */}
    </div>
  );
}
```

## Error Handling

```typescript
try {
  const response = await apiClient.createStudent(data, tenantId);
  if (response.success) {
    // Handle success
  } else {
    console.error(response.message);
  }
} catch (error: any) {
  const errorMsg = error.response?.data?.message || error.message;
  console.error(errorMsg);
}
```

## State Management

```typescript
// User auth state
const user = authUtils.getUser();           // AuthUser | null
const tenantId = authUtils.getTenantId();  // string | null
const token = authUtils.getAccessToken();  // string | null

// Data state (from hooks)
const { data, isLoading, error, refetch } = useStudents();

// Form state
const [formData, setFormData] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
```

## Protected Route

```typescript
// In routes.ts
import { ProtectedRoute } from './components/ProtectedRoute';

// Basic protection
<ProtectedRoute>
  <MyPage />
</ProtectedRoute>

// Role-based protection
<ProtectedRoute requiredRole={['admin']}>
  <AdminPage />
</ProtectedRoute>

// Multiple roles
<ProtectedRoute requiredRole={['admin', 'teacher']}>
  <TeacherPage />
</ProtectedRoute>
```

## File Locations

| What | Where |
|------|-------|
| API Client | `src/services/api.ts` |
| Auth Hook | `src/hooks/useAuth.ts` |
| Data Hooks | `src/hooks/useData.ts` |
| Auth Utils | `src/utils/auth.ts` |
| Form Utils | `src/utils/formUtils.ts` |
| Protected Route | `src/components/ProtectedRoute.tsx` |
| Login Page | `src/pages/Login.tsx` |
| Environment | `.env` |

## Common Tasks

### Check if Logged In
```typescript
const isAuthenticated = authUtils.isAuthenticated();
if (!isAuthenticated) navigate('/login');
```

### Get User Info
```typescript
const user = authUtils.getUser();
console.log(user.firstName, user.role);
```

### Fetch Data
```typescript
const { data, isLoading, refetch } = useStudents();
// When data changes: await refetch();
```

### Make API Call
```typescript
const tenantId = authUtils.getTenantId()!;
const response = await apiClient.createStudent(data, tenantId);
```

### Logout
```typescript
import { useNavigate } from 'react-router';

const handleLogout = async () => {
  await apiClient.logout();
  authUtils.clearAuth();
  navigate('/login');
};
```

## Debugging

```typescript
// Check localStorage
console.log(localStorage.getItem('accessToken'));
console.log(localStorage.getItem('user'));
console.log(localStorage.getItem('tenantId'));

// Check API response
const response = await apiClient.getStudents();
console.log(response);

// Check auth status
console.log(authUtils.isAuthenticated());
console.log(authUtils.getUser());
```

## Status Codes

```
200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized (redirect to login)
403 - Forbidden
404 - Not Found
500 - Server Error
```

---

**Print this and keep by your desk! 📋**
