const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'BizAdvise AI (Dev)' : 'BizAdvise AI',
  slug: 'ai-business-assistant',
  scheme: 'ai-business-assistant',
  version: '1.1.13',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/2150c636-e3c7-44dc-8a5a-7d5712ba71f0',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.business'
      : 'com.aiassistant.business',
    buildNumber: '29',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.aiassistant.business' : 'com.aiassistant.business',
    versionCode: 29,
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
      projectId: '2150c636-e3c7-44dc-8a5a-7d5712ba71f0',
    },
  },
};