import { createRemoteJWKSet, jwtVerify } from 'jose';
import { isDevelopment, getEnv } from './env.js';

type FirebaseUser = {
  id: string;
  email: string | undefined;
  displayName?: string;
  photoURL?: string;
  providerId?: string;
  providerData?: any[];
  firebase?: {
    sign_in_provider?: string;
    identities?: Record<string, any>;
  };
};

const getJWKS = () => {
  if (isDevelopment()) {
    // Use emulator JWKS endpoint with dynamic port
    const firebaseAuthHost = getEnv('FIREBASE_AUTH_EMULATOR_HOST') ?? 'localhost:5503';
    const emulatorUrl = firebaseAuthHost.startsWith('http') 
      ? firebaseAuthHost 
      : `http://${firebaseAuthHost}`;
    
    return createRemoteJWKSet(
      new URL(`${emulatorUrl}/www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com`)
    );
  } else {
    // Use production Firebase JWKS
    return createRemoteJWKSet(
      new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
    );
  }
};

export async function verifyFirebaseToken(token: string, projectId: string): Promise<FirebaseUser> {
  if (!projectId) {
    throw new Error('FIREBASE_PROJECT_ID environment variable is not set');
  }

  // In emulator mode, use simplified token verification
  if (isDevelopment()) {
    try {
      // Decode the token without verification for emulator
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      // Basic validation for emulator tokens - be more lenient
      if (!payload.sub) {
        throw new Error('Invalid token payload - missing sub');
      }
      
      // For emulator, the audience might be different, so don't enforce strict matching
      console.log('Emulator token payload:', { 
        sub: payload.sub, 
        aud: payload.aud, 
        projectId,
        email: payload.email 
      });
      
      return {
        id: payload.sub as string,
        email: payload.email as string | undefined,
        displayName: payload.name as string | undefined,
        photoURL: payload.picture as string | undefined,
        providerId: payload.provider_id as string | undefined,
        providerData: payload.provider_data as any[] | undefined,
        firebase: payload.firebase as any | undefined,
      };
    } catch (error) {
      console.error('Emulator token decode error:', error);
      throw new Error(`Invalid emulator token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Production token verification
  try {
    const JWKS = getJWKS();
    const issuer = `https://securetoken.google.com/${projectId}`;

    const { payload } = await jwtVerify(token, JWKS, {
      issuer,
      audience: projectId,
    });

    return {
      id: payload.sub as string,
      email: payload.email as string | undefined,
      displayName: payload.name as string | undefined,
      photoURL: payload.picture as string | undefined,
      providerId: payload.provider_id as string | undefined,
      providerData: payload.provider_data as any[] | undefined,
      firebase: payload.firebase as any | undefined,
    };
  } catch (error) {
    throw new Error('Invalid token');
  }
} 