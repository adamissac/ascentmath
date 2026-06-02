/**
 * Firebase bootstrap.
 *
 * - All config is read from public env vars (`NEXT_PUBLIC_FIREBASE_*`).
 *   These are bundled into the client - that is the standard pattern for
 *   Firebase web SDKs and is safe; security comes from Auth + Firestore
 *   rules, not from hiding the API key.
 * - We initialize lazily so the rest of the app doesn't crash if env
 *   vars are missing during local dev; pages that need auth call
 *   `getFirebaseAuth()` / `isFirebaseConfigured()` and degrade gracefully.
 */

import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  type Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _emulatorsConnected = false;

function connectEmulatorsIfNeeded(auth: Auth, db: Firestore) {
  if (_emulatorsConnected || process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR !== "true") return;
  if (typeof window === "undefined") return;
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  _emulatorsConnected = true;
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Copy `.env.example` to `.env.local` and fill in NEXT_PUBLIC_FIREBASE_* values."
    );
  }
  if (_app) return _app;
  _app = getApps().length ? getApp() : initializeApp(config);
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (_auth) return _auth;
  const app = getFirebaseApp();
  _auth = getAuth(app);
  if (!_db) _db = getFirestore(app);
  connectEmulatorsIfNeeded(_auth, _db);
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (_db) return _db;
  const app = getFirebaseApp();
  _db = getFirestore(app);
  if (!_auth) _auth = getAuth(app);
  connectEmulatorsIfNeeded(_auth, _db);
  return _db;
}

/**
 * Switch persistence between "remember me" (browserLocal - survives
 * browser restarts) and one-session-only (browserSession).
 */
export async function applyPersistence(remember: boolean) {
  const auth = getFirebaseAuth();
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}
