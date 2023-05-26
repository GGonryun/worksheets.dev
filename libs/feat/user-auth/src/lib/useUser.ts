import {
  AuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '@worksheets/firebase/client';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!firebaseAuth) return;
    const unlisten = firebaseAuth.onAuthStateChanged((newUser) => {
      newUser ? setUser(newUser) : setUser(null);
      setLoading(false);
    });
    return () => {
      unlisten();
    };
  }, []);

  const signIn: SignInFunction = async (e, p) => {
    if (!firebaseAuth) return;
    return signInWithEmailAndPassword(firebaseAuth, e, p);
  };

  const signInProvider: SignInProviderFunction = async (
    provider: AuthProvider
  ) => {
    if (!firebaseAuth) return;

    try {
      return await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      const error = err as any;
      const errorCode = error.code;
      throw new Error(`failed to signin with popup: ${errorCode}`);
    }
  };

  const signOut: SignOutFunction = async () => {
    if (!firebaseAuth) return;

    await firebaseAuth.signOut();
  };
  const signUp: SignUpFunction = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Invalid email or password');
    }
    if (!firebaseAuth) return;
    return createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      (credentials) => {
        sendEmailVerification(credentials.user);
        return credentials;
      }
    );
  };

  const resendVerification: ResendVerificationFunction = async () => {
    if (!user) return;
    sendEmailVerification(user);
  };

  return {
    loading,
    user,
    signIn,
    signInProvider,
    signOut,
    resendVerification,
    signUp,
    hasUser: !!user && !loading,
  };
};

export type SignUpFunction = (
  email: string,
  password: string
) => Promise<UserCredential | undefined>;
export type SignInFunction = (
  email: string,
  password: string
) => Promise<UserCredential | undefined>;
export type SignInProviderFunction = (
  provider: AuthProvider
) => Promise<UserCredential | undefined>;
export type SignOutFunction = () => Promise<void>;
export type ResendVerificationFunction = () => Promise<void>;
