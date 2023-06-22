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
import { UserAccessFailure } from './failures';
import { FirebaseFailure } from '@worksheets/firebase/client';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!firebaseAuth) return;
    const unlisten = firebaseAuth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
        newUser
          .getIdToken()
          .then((t) => setToken(t))
          .catch((error) =>
            console.error('unexpected error getting user token', error)
          );
      } else {
        setUser(null);
        setToken('');
      }
      setLoading(false);
    });
    return () => {
      unlisten();
    };
  }, []);

  const signIn: SignInFunction = async (e, p) => {
    if (!firebaseAuth)
      throw new UserAccessFailure({
        code: 'service-unavailable',
      });

    return signInWithEmailAndPassword(firebaseAuth, e, p);
  };

  const signInProvider: SignInProviderFunction = async (
    provider: AuthProvider
  ) => {
    if (!firebaseAuth)
      throw new UserAccessFailure({
        code: 'service-unavailable',
      });

    try {
      const credentials = await signInWithPopup(firebaseAuth, provider);
      return credentials.user;
    } catch (error) {
      if (error instanceof FirebaseFailure) {
        const errorCode = error.code;
        throw new UserAccessFailure({
          code: 'firebase',
          cause: error,
          message: `failed to signin with popup: ${errorCode}`,
        });
      }

      throw new UserAccessFailure({
        code: 'unexpected',
        cause: error,
        message: `unexpected failure during auth process`,
      });
    }
  };

  const signOut: SignOutFunction = async () => {
    if (!firebaseAuth)
      throw new UserAccessFailure({
        code: 'service-unavailable',
      });

    await firebaseAuth.signOut();
  };
  const signUp: SignUpFunction = async (email: string, password: string) => {
    if (!email || !password) {
      throw new UserAccessFailure({
        code: 'invalid-input',
        message: 'Invalid email or password',
      });
    }

    if (!firebaseAuth)
      throw new UserAccessFailure({
        code: 'service-unavailable',
      });

    return createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      (credentials) => {
        sendEmailVerification(credentials.user);
        return credentials;
      }
    );
  };

  const resendVerification: ResendVerificationFunction = async () => {
    if (!user) throw new UserAccessFailure({ code: 'unauthorized' });
    sendEmailVerification(user);
  };

  const getRequestToken: GetRequestTokenFunction = async () => {
    if (!user) throw new UserAccessFailure({ code: 'unauthorized' });
    return await user.getIdToken();
  };

  return {
    loading,
    user,
    signIn,
    signInProvider,
    signOut,
    resendVerification,
    signUp,
    getRequestToken,
    token,
    hasUser: !!user && !loading,
  };
};

export type GetRequestTokenFunction = () => Promise<string>;
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
) => Promise<User | null>;
export type SignOutFunction = () => Promise<void>;
export type ResendVerificationFunction = () => Promise<void>;
