"use client";

/**
 * Single source of truth for the current user, their Firestore profile,
 * and every auth action the rest of the app needs. Everything that
 * touches Firebase Auth goes through this provider - pages just call
 * `useAuth()` and stay agnostic of the SDK.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, serverTimestamp, setDoc, type Timestamp } from "firebase/firestore";

import {
  applyPersistence,
  getFirebaseAuth,
  getFirebaseDb,
  isFirebaseConfigured,
} from "../lib/firebase";
import { preferGoogleRedirect } from "../lib/auth-google";
import { friendlyAuthError } from "../lib/auth-errors";

const REDIRECT_ERROR_KEY = "aa_auth_redirect_error";

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: string | null; // ISO string
  role: "student" | "parent" | "tutor";
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  configured: boolean;
  bootstrapError: string | null;
  clearBootstrapError: () => void;
  signUp: (input: {
    email: string;
    password: string;
    displayName?: string;
    remember?: boolean;
  }) => Promise<void>;
  signIn: (input: {
    email: string;
    password: string;
    remember?: boolean;
  }) => Promise<void>;
  signInWithGoogle: (remember?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}

/* -------------------------------------------------------------------- */

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);
  const configured = isFirebaseConfigured();

  /* Keep a reference to the current subscription so HMR doesn't double it up */
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    let cancelled = false;

    /* Finish any in-flight Google redirect BEFORE attaching the listener.
     * Calling both in parallel is a common cause of "Google sign-in did
     * nothing" on return from accounts.google.com. */
    (async () => {
      try {
        const cred = await withTimeout(getRedirectResult(auth), 4000);
        if (cred?.user && !cancelled) {
          setUser(cred.user);
          try {
            const p = await loadOrCreateProfile(cred.user);
            setProfile(p);
          } catch {
            /* profile is best-effort */
          }
        }
      } catch (err) {
        const message = friendlyAuthError(err);
        if (!cancelled) {
          setBootstrapError(message);
          if (typeof window !== "undefined") {
            sessionStorage.setItem(REDIRECT_ERROR_KEY, message);
          }
        }
        if (process.env.NODE_ENV === "development") {
          console.warn("[auth] redirect result failed", err);
        }
      }

      if (cancelled) return;

      /* Surface a redirect error saved before a full page reload */
      if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem(REDIRECT_ERROR_KEY);
        if (saved) {
          setBootstrapError(saved);
          sessionStorage.removeItem(REDIRECT_ERROR_KEY);
        }
      }

      const unsubscribe = onAuthStateChanged(auth, async (next) => {
        setUser(next);
        if (next) {
          try {
            const p = await loadOrCreateProfile(next);
            setProfile(p);
          } catch (err) {
            console.error("[auth] failed to load profile", err);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
      unsubRef.current = unsubscribe;
    })();

    return () => {
      cancelled = true;
      unsubRef.current?.();
      unsubRef.current = null;
    };
  }, [configured]);

  /* ----- actions ----- */

  const signUp = useCallback<AuthContextValue["signUp"]>(
    async ({ email, password, displayName, remember = true }) => {
      await applyPersistence(remember);
      const auth = getFirebaseAuth();
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      await loadOrCreateProfile(cred.user, displayName);
    },
    []
  );

  const signIn = useCallback<AuthContextValue["signIn"]>(
    async ({ email, password, remember = true }) => {
      await applyPersistence(remember);
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
    []
  );

  const signInWithGoogle = useCallback<AuthContextValue["signInWithGoogle"]>(
    async (remember = true) => {
      if (!isFirebaseConfigured()) {
        throw new Error(
          "Firebase isn't configured yet. Add your NEXT_PUBLIC_FIREBASE_* keys to .env.local and restart the dev server."
        );
      }
      await applyPersistence(remember);
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.setCustomParameters({ prompt: "select_account" });

      /* Popups break often on live domains - use a full-page redirect instead. */
      if (preferGoogleRedirect()) {
        await signInWithRedirect(auth, provider);
        return;
      }

      try {
        const cred = await signInWithPopup(auth, provider);
        setUser(cred.user);
        await loadOrCreateProfile(cred.user);
      } catch (err) {
        /* Popup blocked, storage restricted, or environment can't host a
         * popup - fall back to a full-page redirect. getRedirectResult()
         * above completes the exchange when the user lands back here. */
        if (
          err instanceof FirebaseError &&
          (err.code === "auth/popup-blocked" ||
            err.code === "auth/cancelled-popup-request" ||
            err.code === "auth/web-storage-unsupported" ||
            err.code === "auth/operation-not-supported-in-this-environment")
        ) {
          await signInWithRedirect(auth, provider);
          return;
        }
        throw err;
      }
    },
    []
  );

  const clearBootstrapError = useCallback(() => setBootstrapError(null), []);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const auth = getFirebaseAuth();
    await sendPasswordResetEmail(auth, email);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      configured,
      bootstrapError,
      clearBootstrapError,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      sendPasswordReset,
    }),
    [
      user,
      profile,
      loading,
      configured,
      bootstrapError,
      clearBootstrapError,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      sendPasswordReset,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* -------------------------------------------------------------------- */
/* Firestore profile read/upsert. Profiles are best-effort - if Firestore
 * isn't enabled in the user's Firebase project, auth still works and we
 * just return a synthesized profile from the auth record.            */
/* -------------------------------------------------------------------- */

async function loadOrCreateProfile(
  user: User,
  preferredDisplayName?: string
): Promise<UserProfile> {
  try {
    const db = getFirebaseDb();
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        email: user.email,
        displayName: preferredDisplayName || user.displayName || null,
        photoURL: user.photoURL || null,
        role: "student",
        createdAt: serverTimestamp(),
      });
      return {
        uid: user.uid,
        email: user.email,
        displayName: preferredDisplayName || user.displayName || null,
        role: "student",
        createdAt: new Date().toISOString(),
      };
    }

    const data = snap.data() as {
      displayName?: string | null;
      role?: UserProfile["role"];
      createdAt?: Timestamp;
    };
    return {
      uid: user.uid,
      email: user.email,
      displayName: data.displayName ?? user.displayName ?? null,
      role: data.role ?? "student",
      createdAt: data.createdAt?.toDate().toISOString() ?? null,
    };
  } catch (err) {
    // Firestore probably isn't enabled - return a minimal profile from auth.
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[auth] Firestore profile read failed (auth still works). Enable Firestore in Firebase Console to persist profiles.",
        err
      );
    }
    return {
      uid: user.uid,
      email: user.email,
      displayName: preferredDisplayName || user.displayName || null,
      role: "student",
      createdAt: user.metadata.creationTime
        ? new Date(user.metadata.creationTime).toISOString()
        : null,
    };
  }
}
