import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authMiddleware } from './middleware/auth';
import { getDatabase, testDatabaseConnection } from './lib/db';
import { setEnvContext, clearEnvContext, getDatabaseUrl } from './lib/env';
import * as schema from './schema/users';
import { authEvents } from './schema/auth-events';

type Env = {
  RUNTIME?: string;
  [key: string]: any;
};

const app = new Hono<{ Bindings: Env }>();

// In Node.js environment, set environment context from process.env
if (typeof process !== 'undefined' && process.env) {
  setEnvContext(process.env);
}

// Environment context middleware - detect runtime using RUNTIME env var
app.use('*', async (c, next) => {
  if (c.env?.RUNTIME === 'cloudflare') {
    setEnvContext(c.env);
  }
  
  await next();
  // No need to clear context - env vars are the same for all requests
  // In fact, clearing the context would cause the env vars to potentially be unset for parallel requests
});

// Middleware
app.use('*', logger());
app.use('*', cors());

// Health check route - public
app.get('/', (c) => c.json({ status: 'ok', message: 'API is running' }));

// API routes
const api = new Hono();

// Public routes go here (if any)
api.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

// Database test route - public for testing
api.get('/db-test', async (c) => {
  try {
    // Use external DB URL if available, otherwise use local PostgreSQL database server
    // Note: In development, the port is dynamically allocated by port-manager.js
    const defaultLocalConnection = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5502/postgres';
    const dbUrl = getDatabaseUrl() || defaultLocalConnection;
    
    const db = await getDatabase(dbUrl);
    const isHealthy = await testDatabaseConnection();
    
    if (!isHealthy) {
      return c.json({
        error: 'Database connection is not healthy',
        timestamp: new Date().toISOString(),
      }, 500);
    }
    
    const result = await db.select().from(schema.users).limit(5);
    
    return c.json({
      message: 'Database connection successful!',
      users: result,
      connectionHealthy: isHealthy,
      usingLocalDatabase: !getDatabaseUrl(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database test error:', error);
    return c.json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// Protected routes - require authentication
const protectedRoutes = new Hono();

protectedRoutes.use('*', authMiddleware);

protectedRoutes.get('/me', (c) => {
  const user = c.get('user');
  return c.json({
    user,
    message: 'You are authenticated!',
  });
});

// Auth event logging endpoint
protectedRoutes.post('/auth/log-event', async (c) => {
  try {
    const user = c.get('user');
    const { event_type, provider, metadata } = await c.req.json();

    // Validate required fields
    if (!event_type || !provider) {
      return c.json({ error: 'event_type and provider are required' }, 400);
    }

    // Validate event_type
    if (!['signup', 'login', 'logout'].includes(event_type)) {
      return c.json({ error: 'event_type must be one of: signup, login, logout' }, 400);
    }

    const databaseUrl = getDatabaseUrl();
    const db = await getDatabase(databaseUrl);

    // Capture IP address and User-Agent from request headers
    const ipAddress = c.req.header('x-forwarded-for') || 
                     c.req.header('x-real-ip') || 
                     c.req.header('cf-connecting-ip') ||
                     'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';

    // Log the auth event
    await db.insert(authEvents)
      .values({
        user_id: user.id,
        event_type,
        provider,
        ip_address: ipAddress,
        user_agent: userAgent,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      });

    return c.json({ success: true, message: 'Auth event logged successfully' });
  } catch (error) {
    console.error('Error logging auth event:', error);
    return c.json({ error: 'Failed to log auth event' }, 500);
  }
});

// Mount the protected routes under /protected
api.route('/protected', protectedRoutes);

// Mount the API router
app.route('/api/v1', api);

export default app; 