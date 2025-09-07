// Feature toggle configuration
// Set to true to enable a feature, false to hide it

export const FEATURES = {
  // Core pages - always enabled
  HOME: true,
  
  // Feature pages - toggle these as features are implemented
  PAGE1: false,  // Demo page - disabled for production
  PAGE2: false,  // Demo page - disabled for production
  SETTINGS: false, // Settings page - enable when fully implemented
} as const;

export type FeatureKey = keyof typeof FEATURES;

export function isFeatureEnabled(feature: FeatureKey): boolean {
  return FEATURES[feature];
}
