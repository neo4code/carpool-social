#!/usr/bin/env node

/**
 * Production setup script for Render deployment
 * This script ensures all database tables are created on first deploy
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupProduction() {
  console.log('🚀 Setting up production environment...');
  
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.log('⚠️  DATABASE_URL not found. Skipping database setup.');
      return;
    }
    
    console.log('📊 Setting up database schema...');
    
    // Run database migration
    const serverDir = join(__dirname, '..');
    process.chdir(serverDir);
    
    // Install drizzle-kit if not available
    try {
      execSync('npx drizzle-kit --version', { stdio: 'pipe' });
    } catch {
      console.log('📦 Installing drizzle-kit...');
      execSync('npm install drizzle-kit', { stdio: 'inherit' });
    }
    
    // Apply database schema
    console.log('🔄 Applying database migrations...');
    execSync('npx drizzle-kit push:pg', { 
      stdio: 'inherit',
      env: { ...process.env }
    });
    
    console.log('✅ Production setup complete!');
    
  } catch (error) {
    console.error('❌ Production setup failed:', error.message);
    // Don't exit with error - let the app start anyway
    console.log('⚠️  Continuing with app startup...');
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupProduction();
}
