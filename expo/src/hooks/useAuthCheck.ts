import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../infra/firestore/firebaseConfig';
import { useEffect, useRef } from 'react';

export const useAuthCheck = (redirectUrl: string = '/memo/list'): boolean => {
  const isLogged = useRef(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        if (redirectUrl) {
          router.replace(redirectUrl);
        }
        isLogged.current = true;
      }
    });
  }, [redirectUrl]);
  return isLogged.current.valueOf();
};
