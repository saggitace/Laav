# LaavDesign SaaS Backend

A complete, production-ready backend for a multi-tenant SaaS application built with Express.js, Node.js, TypeScript, and MongoDB. This backend supports School ERP, HRMS, and Hospital HMS systems with database-per-tenant architecture.

## Features

✅ **Multi-Tenant Architecture** - Complete database isolation per tenant  
✅ **JWT Authentication** - Secure token-based authentication with refresh tokens  
✅ **Role-Based Access Control** - Admin, teacher, student, parent, staff roles  
✅ **School ERP** - Classes, students, attendance, grades, fees  
✅ **Messaging System** - Send messages, inbox, sent items  
✅ **Input Validation** - Express-validator for comprehensive input validation  
✅ **Error Handling** - Centralized error handling middleware  
✅ **Secure** - Helmet.js, CORS, password hashing with bcrypt  
✅ **Scalable** - Modular architecture with services, controllers, routes  
✅ **TypeScript** - Full TypeScript support for type safety  
✅ **Logging** - Morgan HTTP request logging  

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (multi-tenant)
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet.js, CORS
- **Logging**: Morgan

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts           # MongoDB connection & multi-tenant setup
│   ├── controllers/
│   │   ├── auth.controller.ts    # Auth endpoints
│   │   ├── school.controller.ts  # School, Class, Student endpoints
│   │   └── erp.controller.ts     # Attendance, Grades, Fees, Messages
│   ├── middleware/
│   │   ├── auth.ts               # JWT & RBAC middleware
│   │   ├── tenant.ts             # Tenant isolation middleware
│   │   └── validation.ts         # Input validation schemas
│   ├── models/
│   │   └── (models are generated from schemas)
│   ├── routes/
│   │   ├── auth.routes.ts        # Authentication routes
│   │   ├── school.routes.ts      # School management routes
│   │   └── erp.routes.ts         # ERP features routes
│   ├── schemas/
│   │   └── schemas.ts            # MongoDB schemas for all entities
│   ├── services/
│   │   ├── auth.service.ts       # Auth business logic
│   │   ├── database.service.ts   # Database management
│   │   ├── school.service.ts     # School business logic
│   │   └── erp.service.ts        # ERP business logic
│   ├── utils/
│   │   ├── helpers.ts            # Utility functions
│   │   ├── jwt.ts                # JWT token generation/verification
│   │   ├── password.ts           # Password hashing & validation
│   │   └── response.ts           # Standardized API responses
│   └── index.ts                  # Application entry point
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+ 
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Setup

1. **Clone and setup**
```bash
cd backend
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
MONGODB_URL=mongodb://localhost:27017/
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

3. **Start MongoDB**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URL in .env
```

4. **Run development server**
```bash
npm run dev
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new tenant & admin user
POST   /api/auth/login             - Login with email & password
POST   /api/auth/refresh           - Refresh access token
POST   /api/auth/logout            - Logout
GET    /api/auth/profile           - Get current user profile
```

### Schools Management
```
POST   /api/v1/schools             - Create school
GET    /api/v1/schools             - Get all schools
GET    /api/v1/schools/:schoolId   - Get school details
PUT    /api/v1/schools/:schoolId   - Update school
DELETE /api/v1/schools/:schoolId   - Delete school
```

### Classes
```
POST   /api/v1/schools/:schoolId/classes        - Create class
GET    /api/v1/schools/:schoolId/classes        - Get classes by school
GET    /api/v1/classes/:classId                 - Get class details
PUT    /api/v1/classes/:classId                 - Update class
DELETE /api/v1/classes/:classId                 - Delete class
```

### Students
```
POST   /api/v1/students                         - Create student
GET    /api/v1/schools/:schoolId/students       - Get students by school
GET    /api/v1/classes/:classId/students        - Get students by class
GET    /api/v1/students/:studentId              - Get student details
PUT    /api/v1/students/:studentId              - Update student
DELETE /api/v1/students/:studentId              - Delete student
```

### Attendance
```
POST   /api/v1/erp/attendance                   - Mark attendance
GET    /api/v1/erp/attendance/class/:classId    - Get class attendance
GET    /api/v1/erp/attendance/student/:studentId - Get student attendance
```

### Grades
```
POST   /api/v1/erp/grades                       - Submit grade
GET    /api/v1/erp/grades/student/:studentId    - Get student grades
GET    /api/v1/erp/grades/subject/:subjectId    - Get subject grades
PUT    /api/v1/erp/grades/:gradeId              - Update grade
```

### Fees
```
POST   /api/v1/erp/fees                         - Create fee
GET    /api/v1/erp/fees/student/:studentId      - Get student fees
GET    /api/v1/erp/fees/school/:schoolId        - Get school fees
PATCH  /api/v1/erp/fees/:feeId/status           - Update fee status
```

### Messages
```
POST   /api/v1/erp/messages                     - Send message
GET    /api/v1/erp/messages/inbox               - Get inbox
GET    /api/v1/erp/messages/sent                - Get sent messages
PATCH  /api/v1/erp/messages/:messageId/read     - Mark as read
DELETE /api/v1/erp/messages/:messageId          - Delete message
```

## Authentication

All protected endpoints require:

```
Authorization: Bearer <access_token>
X-Tenant-ID: <tenant_id>
```

### Register Flow
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "tenantName": "My School"
}

Response:
{
  "success": true,
  "data": {
    "user": { "id", "email", "role", "tenantId" },
    "tenant": { "id", "name", "slug" },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Login Flow
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "SecurePass123!",
  "tenantId": "tenant_xxx"
}
```

### Request with Auth
```bash
GET /api/v1/schools
Authorization: Bearer <access_token>
X-Tenant-ID: <tenant_id>
```

## Multi-Tenant Architecture

The backend implements **database-per-tenant** architecture:

- **Main Database** (`main`): Stores system data (tenants, users, refresh tokens)
- **Tenant Databases** (`tenant_<tenant_id>`): Each tenant gets isolated database

### How It Works

1. When a tenant registers, a new MongoDB database is created: `tenant_<tenant_id>`
2. All tenant data (schools, students, classes, etc.) stored in tenant's database
3. User authentication checks main database
4. Tenant ID is extracted from JWT token for every request
5. Requests are isolated to the tenant's database

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "statusCode": 200,
  "timestamp": "2024-02-20T10:30:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-02-20T10:30:00.000Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "statusCode": 200,
  "timestamp": "2024-02-20T10:30:00.000Z"
}
```

## Data Models

### User
- `_id`: String (unique)
- `email`: String (unique)
- `password`: String (hashed)
- `firstName`, `lastName`: String
- `role`: 'admin' | 'teacher' | 'student' | 'parent' | 'staff'
- `tenantId`: String
- `status`: 'active' | 'inactive' | 'suspended'

### Student
- `_id`: String
- `schoolId`, `classId`: String
- `firstName`, `lastName`: String
- `email`, `phone`: String
- `dateOfBirth`: Date
- `rollNumber`: String
- `parentName`, `parentEmail`, `parentPhone`: String

### Class
- `_id`: String
- `schoolId`: String
- `name`, `section`: String
- `academicYear`: String
- `capacity`: Number
- `classTeacherId`: String

### Attendance
- `_id`: String
- `classId`, `studentId`: String
- `date`: Date
- `status`: 'present' | 'absent' | 'late' | 'half-day'

### Grade
- `_id`: String
- `studentId`, `subjectId`: String
- `marks`: Number (0-100)
- `gradeType`: 'midterm' | 'final' | 'assignment' | 'project'
- `academicYear`: String

### Fee
- `_id`: String
- `studentId`: String
- `amount`: Number
- `dueDate`: Date
- `status`: 'unpaid' | 'partial' | 'paid'
- `feeType`: 'tuition' | 'transport' | 'activity'

### Message
- `_id`: String
- `senderId`, `recipientId`: String
- `subject`, `body`: String
- `read`: Boolean
- `attachments`: String[]

## Error Handling

The API uses standard HTTP status codes:

- `200 OK` - Successful GET/PUT requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Invalid input or validation error
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Scripts

```bash
# Development (with auto-reload)
npm run dev

# Build to JavaScript
npm run build

# Production
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for signing tokens
- `MONGODB_URL` - MongoDB connection string
- `CORS_ORIGIN` - Allowed origins for CORS

## Security Considerations

✅ **Implemented:**
- JWT-based authentication with refresh tokens
- Password hashing with bcryptjs
- Role-Based Access Control (RBAC)
- Input validation on all endpoints
- CORS protection
- Helmet.js security headers
- Tenant isolation

**For Production:**
- [ ] Enable HTTPS/SSL
- [ ] Set strong `JWT_SECRET` 
- [ ] Enable rate limiting
- [ ] Add request logging
- [ ] Set up monitoring & alerts
- [ ] Regular security audits
- [ ] Enable database encryption
- [ ] Implement API versioning

## Deployment

### Heroku
```bash
# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URL=your_mongodb_url

# Deploy
git push heroku main
```

### Docker
```bash
docker build -t laavdesign-backend .
docker run -e PORT=5000 -e MONGODB_URL=mongodb://... laavdesign-backend
```

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=generate_a_long_random_string_here
MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/main
CORS_ORIGIN=https://yourdomain.com
```

## Contributing

1. Follow TypeScript best practices
2. Add types for all functions
3. Follow the existing code structure
4. Write meaningful commit messages
5. Add input validation for new endpoints

## License

ISC

## Support

For issues and questions, please create an issue in the repository.
