-- Migration: Add authentication events table and update users table
-- This migration adds support for multi-platform authentication with event logging

-- Create the private schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS app;

-- Move existing users table to app schema and add new columns
CREATE TABLE IF NOT EXISTS app.users (
  id text PRIMARY KEY,
  email text UNIQUE NOT NULL,
  display_name text,
  photo_url text,
  provider text, -- primary auth provider: 'email' | 'google' | 'apple' | 'facebook'
  provider_data jsonb, -- provider-specific metadata
  last_login_at timestamp,
  created_at timestamp DEFAULT NOW() NOT NULL,
  updated_at timestamp DEFAULT NOW() NOT NULL
);

-- Migrate existing data from public.users to app.users (if exists)
INSERT INTO app.users (id, email, display_name, photo_url, created_at, updated_at)
SELECT id, email, display_name, photo_url, created_at, updated_at
FROM public.users
ON CONFLICT (id) DO NOTHING;

-- Create auth_events table in app schema
CREATE TABLE IF NOT EXISTS app.auth_events (
  id SERIAL PRIMARY KEY,
  user_id text NOT NULL REFERENCES app.users(id),
  event_type text NOT NULL, -- 'signup' | 'login' | 'logout'
  provider text NOT NULL,   -- 'email' | 'google' | 'apple' | 'facebook' | etc.
  ip_address text,
  user_agent text,
  metadata jsonb,           -- Additional provider-specific data
  created_at timestamp DEFAULT NOW() NOT NULL
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS auth_events_user_id_idx ON app.auth_events(user_id);
CREATE INDEX IF NOT EXISTS auth_events_event_type_idx ON app.auth_events(event_type);
CREATE INDEX IF NOT EXISTS auth_events_created_at_idx ON app.auth_events(created_at);

-- Drop old public.users table after migration (optional - uncomment if desired)
-- DROP TABLE IF EXISTS public.users;
