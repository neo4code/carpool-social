import { pgTable, serial, text, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
import { appSchema, users } from './users';

export const authEvents = appSchema.table('auth_events', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => users.id),
  event_type: text('event_type').notNull(), // 'signup' | 'login' | 'logout'
  provider: text('provider').notNull(),     // 'email' | 'google' | 'apple' | 'facebook' | etc.
  ip_address: text('ip_address'),
  user_agent: text('user_agent'),
  metadata: jsonb('metadata'), // Additional provider-specific data
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('auth_events_user_id_idx').on(table.user_id),
  eventTypeIdx: index('auth_events_event_type_idx').on(table.event_type),
  createdAtIdx: index('auth_events_created_at_idx').on(table.created_at),
}));

export type AuthEvent = typeof authEvents.$inferSelect;
export type NewAuthEvent = typeof authEvents.$inferInsert;
