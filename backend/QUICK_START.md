# Quick Start Guide

## For Windows/Mac/Linux

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB (Windows)**
```bash
# Download MongoDB from https://www.mongodb.com/try/download/community
# Install and run MongoDB
# Default: mongodb://localhost:27017/
```

**Option B: MongoDB Atlas (Cloud)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string (mongodb+srv://...)
```

### 3. Configure Environment

```bash
# Copy example env
cp .env.example .env

# Edit .env with your values
MONGODB_URL=mongodb://localhost:27017/
JWT_SECRET=your_secret_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

Server starts at: **http://localhost:5000**

---

## Using Docker (Recommended)

### Quick Start with Docker Compose

```bash
cd backend

# Start MongoDB + Backend
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop everything
docker-compose down
```

---

## Testing API

### 1. Register Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "tenantName": "My School"
  }'
```

### 2. Save Response Data
- Copy `data.accessToken` 
- Copy `data.user.tenantId`

### 3. Create School

Replace `<TOKEN>` and `<TENANT_ID>` with values from response:

```bash
curl -X POST http://localhost:5000/api/v1/schools \
  -H "Authorization: Bearer <TOKEN>" \
  -H "X-Tenant-ID: <TENANT_ID>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC High School",
    "email": "abc@school.com",
    "phone": "9876543210",
    "address": "123 School Street"
  }'
```

---

## Using Postman

1. **Import Collection**
   - Open Postman
   - File → Import
   - Choose `POSTMAN_COLLECTION.json`

2. **Set Variables**
   - Open collection variables
   - Set `baseUrl`: http://localhost:5000
   - Set `tenantId` after register
   - Set `accessToken` after login

3. **Make Requests**
   - Variables auto-fill in URLs and headers
   - Try: Register → Login → Create School → Create Class

---

## Build for Production

```bash
# Build TypeScript
npm run build

# Run built files
npm start
```

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Start MongoDB: mongod
2. Or update MONGODB_URL to your Atlas connection string
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000

Solution:
1. Change PORT in .env to 5001
2. Or kill process on 5000: lsof -ti:5000 | xargs kill -9
```

### Authentication Failed
```
Error: Invalid credentials

Solution:
1. Ensure tenantId in header matches registered tenant
2. Check accessToken is not expired
3. Refresh token: POST /api/auth/refresh
```

---

## File Structure Reference

```
backend/
├── src/
│   ├── index.ts              ← Main server
│   ├── config/database.ts    ← MongoDB setup
│   ├── middleware/           ← Auth, validation
│   ├── controllers/          ← Request handlers
│   ├── services/             ← Business logic
│   ├── routes/               ← API endpoints
│   └── utils/                ← Helpers
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Next Steps

1. ✅ Server running
2. ✅ Database connected
3. ✅ API tested
4. Next: **Connect Frontend**
   - Update API_BASE_URL to backend URL
   - Frontend at: `http://localhost:5173`

---

## Common Commands

```bash
# Development
npm run dev              # Hot reload server

# Build
npm run build            # Compile to JavaScript

# Production
npm start                # Run compiled code

# Testing
npm test                 # Run tests

# Clean
rm -rf node_modules dist
npm install
```

---

## Environment Variables

Required:
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for signing tokens

Optional:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed frontend URLs
- `JWT_EXPIRE` - Token expiry (default: 7d)

---

## Need Help?

1. Check [README.md](./README.md) for detailed docs
2. See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API reference
3. Review error messages - they indicate the issue
4. Check logs in terminal for debugging

---

## Security Checklist for Production

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Enable HTTPS/SSL
- [ ] Set `NODE_ENV=production`
- [ ] Use strong database password
- [ ] Enable database backups
- [ ] Setup monitoring and logging
- [ ] Rate limit API endpoints
- [ ] Regular security audits

---

Happy Coding! 🚀
