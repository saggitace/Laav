# Dashboard & Component Integration Checklist

## Frontend Integration Progress

### ✅ COMPLETED
- [x] API Client Service (api.ts)
- [x] Authentication utilities and hooks
- [x] Custom data fetching hooks
- [x] Protected Route component
- [x] Login page component
- [x] Onboarding page with backend integration
- [x] Routes updated with protected pages
- [x] Environment configuration (.env)
- [x] Axios installed

### 🔄 IN PROGRESS
- [x] StudentDashboard - Basic integration done

### ⏳ REMAINING

#### Dashboards (4 pages)
- [ ] TeacherDashboard.tsx
  - Use useClasses() to get teacher's classes
  - Use useStudents() to get class students
  - Use useGrades() to manage grades
  - Use useAttendance() to view attendance
  
- [ ] ParentDashboard.tsx
  - Display student info
  - Show fees using useFees()
  - Show grades using useGrades()
  - Show attendance using useAttendance()
  
- [ ] AdminSchoolERP.tsx
  - Display school statistics
  - Manage schools, classes, students
  - Use API for CRUD operations
  
- [ ] SchoolERP.tsx
  - Main dashboard for school
  - Display overview statistics

#### Management Pages (5 pages)
- [ ] ClassManagement.tsx
  - useClasses() for data
  - Add: apiClient.createClass(data, tenantId)
  - Update: apiClient.updateClass(classId, data, tenantId)
  - Delete: apiClient.deleteClass(classId, tenantId)
  
- [ ] AttendanceManagement.tsx
  - useAttendance() for data
  - Mark: apiClient.markAttendance(data, tenantId)
  - Filter by class/date
  
- [ ] GradeManagement.tsx
  - useGrades() for data
  - Submit: apiClient.submitGrade(data, tenantId)
  - Update: apiClient.updateGrade(gradeId, data, tenantId)
  
- [ ] FeeManagement.tsx
  - useFees() for data
  - Create: apiClient.createFee(data, tenantId)
  - Update Status: apiClient.updateFeeStatus(feeId, status, tenantId)
  
- [ ] MessagingSystem.tsx
  - useMessages() for data
  - Send: apiClient.sendMessage(data, tenantId)
  - Delete: apiClient.deleteMessage(messageId, tenantId)

#### Other Components
- [ ] Navigation components - Add logout and user menu
- [ ] Error boundaries - Wrap pages for error handling
- [ ] Loading skeletons - Create skeleton loaders
- [ ] Toast notifications - Add success/error messages
- [ ] Form components - Add validation and submission

## Quick Implementation Pattern

```typescript
import { useState } from 'react';
import { useStudents } from '../hooks/useData';
import apiClient from '../services/api';
import { authUtils } from '../utils/auth';
import { Loader, AlertCircle } from 'lucide-react';

export function MyPage() {
  const { data, isLoading, error, refetch } = useStudents();
  const tenantId = authUtils.getTenantId()!;
  const [creating, setCreating] = useState(false);

  const handleCreate = async (formData) => {
    setCreating(true);
    try {
      await apiClient.createStudent(formData, tenantId);
      await refetch();
      // Show success toast
    } catch (error) {
      // Show error toast
    } finally {
      setCreating(false);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div>
      {/* UI here */}
    </div>
  );
}
```

## Testing Each Feature

### Authentication
```bash
# Test registration
1. Go to /onboarding
2. Fill form and submit
3. Check localStorage for tokens
4. Should redirect to /school-erp
```

### Data Loading
```bash
# Test data fetching
1. Login successfully
2. Go to any dashboard
3. Check Network tab for API calls
4. Verify data appears on page
```

### CRUD Operations
```bash
# Test create
1. Fill form and submit
2. Check API request/response
3. Data should appear in list

# Test update
1. Edit existing record
2. Submit changes
3. Data should update

# Test delete
1. Click delete button
2. Confirm action
3. Item should disappear
```

## Environment Setup

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Debugging Tips

1. Check browser console for errors
2. Use Network tab to inspect API calls
3. Check localStorage for auth tokens
4. Verify tenantId is set correctly
5. Look at backend logs for API errors
6. Use React DevTools to inspect component state

## Performance Considerations

- [ ] Implement pagination for large lists
- [ ] Add request caching
- [ ] Debounce search inputs
- [ ] Lazy load images
- [ ] Use React.memo for list items
- [ ] Implement infinite scroll where needed

## Security Checklist

- [ ] Never expose sensitive data in logs
- [ ] Validate inputs on both client and server
- [ ] Use HTTPS in production
- [ ] Secure token storage (httpOnly cookies preferred)
- [ ] Implement CSRF protection
- [ ] Add rate limiting on backend
- [ ] Sanitize user inputs
