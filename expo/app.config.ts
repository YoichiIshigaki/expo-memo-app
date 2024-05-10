import { ExpoConfig, ConfigContext } from 'expo/config';
import firebaseConfig from './config-submodule/project-config/vue3-tutorial/firebase';

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);
  console.log('process.env.EMULATOR = ', process.env.EMULATOR);

  return {
    ...config,
    slug: config.slug as string,
    name: config.name as string,
    extra: {
      ...config.extra,
      firebaseConfig,
      env: process.env.NODE_ENV,
      isEmulator: !!process.env.EMULATOR,
    },
  };
};
