import { INITIAL_USER } from "./mock-data";
import { User } from "./types";

const AUTH_STORAGE_KEY = "vaultpulse_user_session";

/**
 * Web Crypto SHA-256 password hashing.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = "vaultpulse_security_salt_2026";
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Retrieve current authenticated user from LocalStorage.
 */
export function getCurrentUser(): User {
  if (typeof window === "undefined") return INITIAL_USER;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to read user auth state:", e);
  }
  return INITIAL_USER;
}

/**
 * Save user session.
 */
export function saveUserSession(user: User): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user session:", e);
  }
}

/**
 * Clear user session (Logout).
 */
export function clearUserSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear session:", e);
  }
}
