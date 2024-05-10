import get from 'lodash.get';
import constants from 'expo-constants';
import { FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = get(
  constants,
  'expoConfig.extra.firebaseConfig',
);

const isEmulator: boolean = get(constants, 'expoConfig.extra.isEmulator');

export default {
  firebaseConfig,
  isEmulator,
  functionUrl: isEmulator
    ? 'http://127.0.0.1:5001/vue3-tutorial-127e1/us-central1/'
    : 'https://us-central1-vue3-tutorial-127e1.cloudfunctions.net/',
};
