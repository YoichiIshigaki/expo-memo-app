import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

import JA from './messages/ja';
import EN from './messages/en';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  ja: JA,
  en: EN,
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

console.log(i18n.t('screen.settings.username'));

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';

export default i18n;
