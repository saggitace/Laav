import mongoose, { Connection } from 'mongoose';

interface TenantConnection {
  [tenantId: string]: Connection;
}

const tenantConnections: TenantConnection = {};
const mainConnection = mongoose.createConnection();

/**
 * Get or create a database connection for a specific tenant
 */
export const getTenantConnection = async (tenantId: string): Promise<Connection> => {
  if (tenantConnections[tenantId]) {
    return tenantConnections[tenantId];
  }

  try {
    const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/';
    const tenantDbName = `tenant_${tenantId}`;
    const tenantDbUrl = `${mongoUrl}${tenantDbName}`;

    const connection = mongoose.createConnection(tenantDbUrl, {
      maxPoolSize: 5,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    tenantConnections[tenantId] = connection;
    console.log(`✓ Connected to tenant database: ${tenantDbName}`);
    
    return connection;
  } catch (error) {
    console.error(`Failed to connect to tenant ${tenantId}:`, error);
    throw new Error(`Failed to create tenant connection for ${tenantId}`);
  }
};

/**
 * Get the main database connection (for system data, tenants, users)
 */
export const getMainConnection = async (): Promise<Connection> => {
  if (mainConnection.readyState === 1) {
    return mainConnection;
  }

  try {
    const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/';
    await mainConnection.openUri(`${mongoUrl}main`, {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✓ Connected to main database');
    return mainConnection;
  } catch (error) {
    console.error('Failed to connect to main database:', error);
    throw new Error('Failed to connect to main database');
  }
};

/**
 * Close a tenant connection
 */
export const closeTenantConnection = async (tenantId: string): Promise<void> => {
  const connection = tenantConnections[tenantId];
  if (connection) {
    await connection.close();
    delete tenantConnections[tenantId];
    console.log(`✓ Closed connection for tenant: ${tenantId}`);
  }
};

/**
 * Close all connections
 */
export const closeAllConnections = async (): Promise<void> => {
  try {
    // Close all tenant connections
    const tenantIds = Object.keys(tenantConnections);
    for (const tenantId of tenantIds) {
      await closeTenantConnection(tenantId);
    }

    // Close main connection
    if (mainConnection.readyState === 1) {
      await mainConnection.close();
      console.log('✓ Closed main database connection');
    }
  } catch (error) {
    console.error('Error closing database connections:', error);
  }
};

/**
 * Get connection status
 */
export const getConnectionStatus = () => {
  return {
    main: mainConnection.readyState,
    tenants: Object.keys(tenantConnections).length,
    tenantIds: Object.keys(tenantConnections),
  };
};
