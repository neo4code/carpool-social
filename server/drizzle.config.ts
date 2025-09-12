import type { Config } from 'drizzle-kit';
import { getDatabaseUrl } from './src/lib/env.js';

// For production, use DATABASE_URL environment variable directly
// For development, use the getDatabaseUrl function
const databaseUrl = process.env.DATABASE_URL || getDatabaseUrl() || 'postgresql://postgres:password@localhost:5433/postgres';

export default {
  schema: './src/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: databaseUrl,
  },
  schemaFilter: ['app'],
} satisfies Config; 