import { Redirect, router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../infra/firestore/firebaseConfig';
import { useEffect } from 'react';

const Index = (): JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.dir(user, { depth: null });
      if (user !== null) {
        router.replace('/memo/list');
      }
    });
  }, [onAuthStateChanged, auth]);
  return <Redirect href="auth/login" />;
};

export default Index;
