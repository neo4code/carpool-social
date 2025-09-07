import { pgSchema, pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

// Create private schema for application tables
export const appSchema = pgSchema('app');

export const users = appSchema.table('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  display_name: text('display_name'),
  photo_url: text('photo_url'),
  provider: text('provider'), // primary auth provider: 'email' | 'google' | 'apple' | 'facebook'
  provider_data: jsonb('provider_data'), // provider-specific metadata
  last_login_at: timestamp('last_login_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert; 