import { MiddlewareHandler } from 'hono';
import { verifyFirebaseToken } from '../lib/firebase-auth.js';
import { getDatabase } from '../lib/db.js';
import { eq } from 'drizzle-orm';
import { User, users } from '../schema/users.js';
import { authEvents } from '../schema/auth-events.js';
import { getFirebaseProjectId, getDatabaseUrl } from '../lib/env.js';

declare module 'hono' {
  interface ContextVariableMap {
    user: User;
  }
}

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware: No auth header or invalid format');
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split('Bearer ')[1];
    console.log('Auth middleware: Processing token for user authentication');
    const firebaseProjectId = getFirebaseProjectId();
    const firebaseUser = await verifyFirebaseToken(token, firebaseProjectId);
    console.log('Auth middleware: Firebase user verified:', { id: firebaseUser.id, email: firebaseUser.email });

    const databaseUrl = getDatabaseUrl();
    const db = await getDatabase(databaseUrl);

    // Extract provider information from Firebase token
    const provider = firebaseUser.firebase?.sign_in_provider || 'email';
    const providerData = {
      providerId: firebaseUser.providerId,
      providerData: firebaseUser.providerData,
      firebase: firebaseUser.firebase,
    };

    // Check if user exists
    const [existingUser] = await db.select()
      .from(users)
      .where(eq(users.id, firebaseUser.id))
      .limit(1);

    const isNewUser = !existingUser;

    // Upsert user with provider information and update last_login_at
    await db.insert(users)
      .values({
        id: firebaseUser.id,
        email: firebaseUser.email!,
        display_name: firebaseUser.displayName || null,
        photo_url: firebaseUser.photoURL || null,
        provider: provider,
        provider_data: providerData,
        last_login_at: new Date(),
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          display_name: firebaseUser.displayName || null,
          photo_url: firebaseUser.photoURL || null,
          last_login_at: new Date(),
          updated_at: new Date(),
        },
      });

    // Log authentication event
    try {
      const ipAddress = c.req.header('x-forwarded-for') || 
                       c.req.header('x-real-ip') || 
                       c.req.header('cf-connecting-ip') ||
                       'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';

      await db.insert(authEvents)
        .values({
          user_id: firebaseUser.id,
          event_type: isNewUser ? 'signup' : 'login',
          provider: provider,
          ip_address: ipAddress,
          user_agent: userAgent,
          metadata: {
            ...providerData,
            timestamp: new Date().toISOString(),
          },
        });
    } catch (authEventError) {
      console.error('Error logging auth event:', authEventError);
      // Continue without failing - auth event logging is not critical for basic auth
    }

    // Get the updated user
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, firebaseUser.id))
      .limit(1);

    if (!user) {
      throw new Error('Failed to create or retrieve user');
    }

    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Auth error:', error);
    return c.json({ error: 'Unauthorized' }, 401);
  }
}; 