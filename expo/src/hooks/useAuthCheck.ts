import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../infra/firestore/firebaseConfig';
import { useEffect, useRef } from 'react';

export const useAuthCheck = (redirect = true): boolean => {
  const isLogged = useRef(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        if (redirect) {
          router.replace('/memo/list');
        }
        isLogged.current = true;
      }
    });
  }, [redirect]);
  return isLogged.current.valueOf();
};
