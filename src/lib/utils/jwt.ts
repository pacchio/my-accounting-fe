import type { User } from '@/types';

/**
 * Decode JWT token to extract user information
 * Note: This only decodes the payload, does NOT verify the signature
 * Signature verification is done on the backend
 */
export function decodeJWT(token: string): User | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (base64url)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);

    // Extract user info from JWT payload
    return {
      person_id: decoded.person_id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return true;
    }

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);

    if (!decoded.exp) {
      return false; // No expiration
    }

    // Check if current time is past expiration (exp is in seconds)
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
}
