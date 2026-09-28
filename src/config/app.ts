// Centralized App Configuration -- update before deployment
export const APP_CONFIG = {
  APP_NAME_AR: '\u0648\u0642\u062a \u0627\u0644\u062f\u0648\u0627\u0621',
  APP_NAME_EN: 'Timely Meds',
  APP_VERSION: '1.1.0',
  MIN_ANDROID_VERSION: '6.0',
  MIN_ANDROID_API: 23,
  APK_DOWNLOAD_URL: '/downloads/Timely-Meds.apk',
  APK_SIZE: '32 MB',
  APP_LOGO: '/logo.png',
  SUPPORT_EMAIL: '',
  /** WhatsApp support number (international format, no + or spaces) */
  WHATSAPP_NUMBER: '201559019640',
  /** Backend API base URL — used to fetch app settings (video URL etc.) */
  API_BASE_URL: 'https://timely-meds.onrender.com',
  PRIVACY_POLICY_URL: '',
  TERMS_URL: '',
  SITE_URL: 'https://timely-meds-landing.vercel.app',
} as const;
