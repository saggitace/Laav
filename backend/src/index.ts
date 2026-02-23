import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import { errorHandler, notFoundHandler } from './middleware/tenant';
import { dbService } from './services/database.service';

// Import routes
import authRoutes from './routes/auth.routes';
import schoolRoutes from './routes/school.routes';
import erpRoutes from './routes/erp.routes';
import contactRoutes from './routes/contact.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (req: any, res: any) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/erp', erpRoutes);
app.use('/api/contact', contactRoutes);

// // 404 handler
// app.use(notFoundHandler);

// // Error handler
// app.use(errorHandler);

/**
 * Start server
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Initialize main database
    await dbService.initializeMainDB();
    console.log('✓ Database initialized');

    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║  SaaS Backend Server Started           ║
║  Port: ${PORT}                          ║
║  Environment: ${process.env.NODE_ENV || 'development'}        ║
║  URL: http://localhost:${PORT}           ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✓ Shutting down gracefully...');
  process.exit(0);
});

startServer();

export default app;
