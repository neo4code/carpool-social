# Feature Toggles

This document explains how to enable or disable features in the Carpool Social application.

## Configuration

Feature toggles are managed in `src/lib/feature-config.ts`. Each feature can be enabled (`true`) or disabled (`false`).

## Available Features

### Currently Disabled (for production deployment):

- **PAGE1**: Demo page - disabled for production
- **PAGE2**: Demo page - disabled for production  
- **SETTINGS**: Settings page - disabled until fully implemented

### Always Enabled:

- **HOME**: Main home page - always enabled

## How to Enable a Feature

1. Open `src/lib/feature-config.ts`
2. Change the feature flag from `false` to `true`
3. Rebuild and redeploy the application

Example:
```typescript
export const FEATURES = {
  HOME: true,
  PAGE1: true,  // Changed from false to true
  PAGE2: false,
  SETTINGS: false,
} as const;
```

## What Happens When Features Are Disabled

- Navigation links are hidden from the sidebar
- Direct URL access redirects to the home page
- Routes are not registered in the router

This ensures a clean deployment where only implemented features are visible to users.
