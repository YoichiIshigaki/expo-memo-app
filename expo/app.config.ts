import type { ExpoConfig, ConfigContext } from 'expo/config';
import firebaseConfig from './config-submodule/project-config/vue3-tutorial/firebase';

export default ({ config }: ConfigContext): ExpoConfig => {

  return {
    ...config,
    slug: String(config.slug),
    name: String(config.name),
    extra: {
      ...config.extra,
      firebaseConfig,
      env: process.env.NODE_ENV,
      isEmulator: process.env.EMULATOR === 'true',
    },
  };
};
