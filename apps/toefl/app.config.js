const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'AI TOEFL Coach (Dev)' : 'AI TOEFL Coach',
  slug: 'ai-toefl-assistant',
  scheme: 'ai-toefl-assistant',
  version: '1.1.5',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    enabled: true,
    url: 'https://u.expo.dev/207a756d-baa0-474c-b8c1-410ab91aaee5',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.toefl'
      : 'com.aiassistant.toefl',
    buildNumber: '27',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.aiassistant.toefl' : 'com.aiassistant.toefl',
    versionCode: 27,
    permissions: ['com.android.vending.BILLING'],
  },
  web: {
    favicon: './assets/icon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-updates',
      {
        username: 'hiroshitashir',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          enableProguardInReleaseBuilds: true,
        },
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '207a756d-baa0-474c-b8c1-410ab91aaee5',
    },
  },
};
