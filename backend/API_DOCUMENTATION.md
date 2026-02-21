# API Documentation

## Quick Start

### 1. Register a Tenant
Register a new tenant (organization) and admin user.

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "email": "admin@myschool.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "tenantName": "My School"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "admin@myschool.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "tenantId": "tenant_456"
    },
    "tenant": {
      "id": "tenant_456",
      "name": "My School",
      "slug": "my-school"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Registration successful",
  "statusCode": 201,
  "timestamp": "2024-02-20T10:30:00.000Z"
}
```

**Save these values:**
- `tenant.id` → Use as `X-Tenant-ID` header
- `data.accessToken` → Use as `Authorization: Bearer <token>` header

---

### 2. Create a School

**Endpoint:** `POST /api/v1/schools`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "ABC High School",
  "email": "abc@school.com",
  "phone": "9876543210",
  "address": "123 School Street",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": "10001",
  "principalName": "Dr. Smith",
  "principalEmail": "principal@school.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "school_789",
    "name": "ABC High School",
    "email": "abc@school.com",
    "phone": "9876543210",
    "address": "123 School Street",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10001",
    "createdAt": "2024-02-20T10:35:00.000Z",
    "updatedAt": "2024-02-20T10:35:00.000Z"
  },
  "message": "School created successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T10:35:00.000Z"
}
```

---

### 3. Create Classes

**Endpoint:** `POST /api/v1/schools/{schoolId}/classes`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "schoolId": "school_789",
  "name": "Class 10",
  "section": "A",
  "academicYear": "2024-2025",
  "capacity": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "class_101",
    "schoolId": "school_789",
    "name": "Class 10",
    "section": "A",
    "academicYear": "2024-2025",
    "capacity": 50,
    "totalStudents": 0,
    "createdAt": "2024-02-20T10:40:00.000Z"
  },
  "message": "Class created successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T10:40:00.000Z"
}
```

---

### 4. Add Students

**Endpoint:** `POST /api/v1/students`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "schoolId": "school_789",
  "classId": "class_101",
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@student.com",
  "dateOfBirth": "2008-05-15",
  "rollNumber": "001",
  "gender": "female",
  "bloodGroup": "O+",
  "phone": "9876543211",
  "parentName": "Robert Johnson",
  "parentEmail": "robert@parent.com",
  "parentPhone": "9876543210",
  "address": "456 Parent Street"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "student_201",
    "schoolId": "school_789",
    "classId": "class_101",
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice@student.com",
    "rollNumber": "001",
    "dateOfBirth": "2008-05-15",
    "parentName": "Robert Johnson",
    "parentEmail": "robert@parent.com",
    "status": "active",
    "createdAt": "2024-02-20T10:45:00.000Z"
  },
  "message": "Student created successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T10:45:00.000Z"
}
```

---

### 5. Mark Attendance

**Endpoint:** `POST /api/v1/erp/attendance`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "classId": "class_101",
  "schoolId": "school_789",
  "date": "2024-02-20",
  "records": [
    {
      "studentId": "student_201",
      "status": "present"
    },
    {
      "studentId": "student_202",
      "status": "absent"
    },
    {
      "studentId": "student_203",
      "status": "late"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "attendance_301",
    "classId": "class_101",
    "studentId": "student_201",
    "date": "2024-02-20",
    "status": "present",
    "markedBy": "user_123",
    "createdAt": "2024-02-20T10:50:00.000Z"
  },
  "message": "Attendance marked successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T10:50:00.000Z"
}
```

---

### 6. Submit Grades

**Endpoint:** `POST /api/v1/erp/grades`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "schoolId": "school_789",
  "studentId": "student_201",
  "subjectId": "subject_401",
  "marks": 85,
  "gradeType": "midterm",
  "academicYear": "2024-2025",
  "remarks": "Good performance"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "grade_501",
    "studentId": "student_201",
    "subjectId": "subject_401",
    "marks": 85,
    "gradeType": "midterm",
    "academicYear": "2024-2025",
    "remarks": "Good performance",
    "createdAt": "2024-02-20T10:55:00.000Z"
  },
  "message": "Grade submitted successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T10:55:00.000Z"
}
```

---

### 7. Create Fees

**Endpoint:** `POST /api/v1/erp/fees`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "schoolId": "school_789",
  "studentId": "student_201",
  "amount": 10000,
  "dueDate": "2024-03-31",
  "feeType": "tuition",
  "remarks": "Monthly fee for February"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "fee_601",
    "schoolId": "school_789",
    "studentId": "student_201",
    "amount": 10000,
    "dueDate": "2024-03-31",
    "feeType": "tuition",
    "status": "unpaid",
    "paidAmount": 0,
    "createdAt": "2024-02-20T11:00:00.000Z"
  },
  "message": "Fee created successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T11:00:00.000Z"
}
```

---

### 8. Send Messages

**Endpoint:** `POST /api/v1/erp/messages`

**Headers:**
```
Authorization: Bearer <accessToken>
X-Tenant-ID: <tenantId>
Content-Type: application/json
```

**Request:**
```json
{
  "recipientId": "user_456",
  "subject": "Class Performance",
  "body": "Alice needs to improve her math grades. Please discuss with her about upcoming midterm exam."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "msg_701",
    "senderId": "user_123",
    "recipientId": "user_456",
    "subject": "Class Performance",
    "body": "Alice needs to improve her math grades...",
    "read": false,
    "createdAt": "2024-02-20T11:05:00.000Z"
  },
  "message": "Message sent successfully",
  "statusCode": 201,
  "timestamp": "2024-02-20T11:05:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "data": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ],
  "statusCode": 400,
  "timestamp": "2024-02-20T11:10:00.000Z"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "No authentication token provided",
  "statusCode": 401,
  "timestamp": "2024-02-20T11:10:00.000Z"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Admin access required",
  "statusCode": 403,
  "timestamp": "2024-02-20T11:10:00.000Z"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Student not found",
  "statusCode": 404,
  "timestamp": "2024-02-20T11:10:00.000Z"
}
```

---

## Pagination

When listing resources with pagination:

**Request:**
```
GET /api/v1/schools/school_789/students?page=1&pageSize=10
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "Students retrieved successfully",
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "statusCode": 200,
  "timestamp": "2024-02-20T11:15:00.000Z"
}
```

---

## Query Parameters

### Attendance Query
```
GET /api/v1/erp/attendance/student/student_201?startDate=2024-01-01&endDate=2024-02-20
```

### Grades Query
```
GET /api/v1/erp/grades/student/student_201?academicYear=2024-2025
```

### Fees Query
```
GET /api/v1/erp/fees/school/school_789
```

---

## Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Available Fields by Entity

### School
- `name`, `email`, `phone`, `address`, `city`, `state`, `country`, `pincode`
- `logo`, `principalName`, `principalEmail`, `established`, `board`

### Student
- `firstName`, `lastName`, `email`, `phone`, `dateOfBirth`, `gender`
- `rollNumber`, `bloodGroup`, `parentName`, `parentEmail`, `parentPhone`
- `address`, `emergencyContact`

### Class
- `name`, `section`, `academicYear`, `capacity`, `classTeacherId`

### Attendance
- `status`: `present`, `absent`, `late`, `half-day`
- `date`, `remarks`

### Grade
- `marks` (0-100), `gradeType` (midterm, final, assignment, project)
- `academicYear`, `term`, `remarks`

### Fee
- `amount`, `dueDate`, `feeType` (tuition, transport, activity, other)
- `status` (unpaid, partial, paid), `paidAmount`, `paymentMethod`

---

## Tips

1. **Always include tenant ID** in headers for authenticated requests
2. **Use pagination** for large datasets to improve performance
3. **Save response IDs** to use in subsequent requests
4. **Check status codes** to handle errors appropriately
5. **Use date format** YYYY-MM-DD for date fields
