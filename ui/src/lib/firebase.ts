import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, connectAuthEmulator } from 'firebase/auth';
import firebaseConfig from './firebase-config.json';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure authentication providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const facebookProvider = new FacebookAuthProvider();

// Configure provider-specific settings
googleProvider.addScope('email');
googleProvider.addScope('profile');

appleProvider.addScope('email');
appleProvider.addScope('name');

facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Connect to Firebase Auth emulator only when explicitly enabled
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    const firebaseAuthPort = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT || '9099';
    const emulatorUrl = `http://localhost:${firebaseAuthPort}`;
    connectAuthEmulator(auth, emulatorUrl, { disableWarnings: true });
    console.log(`🧪 Connected to Firebase Auth emulator at ${emulatorUrl}`);
  } catch (error) {
    // Emulator already connected or not available
    console.debug('Firebase Auth emulator connection skipped:', error);
  }
} else {
  console.log(`🏭 Using production Firebase Auth (Project: ${firebaseConfig.projectId})`);
} 