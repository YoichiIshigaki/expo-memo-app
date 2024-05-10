import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../infra/firestore/firebaseConfig';
import { useEffect } from 'react';

export const useAuthCheck = (): void => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace('/memo/list');
      }
    });
  }, [onAuthStateChanged, auth]);
};
