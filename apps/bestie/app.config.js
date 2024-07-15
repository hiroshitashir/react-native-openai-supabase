const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'AI Bestie (Dev)' : 'AI Bestie',
  slug: 'ai-bestie-assistant',
  scheme: 'ai-bestie-assistant',
  version: '1.1.9',
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
    url: 'https://u.expo.dev/31520255-6a0c-4615-be80-8d89e8d2d913',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.bestie'
      : 'com.aiassistant.bestie',
    buildNumber: '22',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.aiassistant.bestie' : 'com.aiassistant.bestie',
    versionCode: 22,
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
      projectId: '31520255-6a0c-4615-be80-8d89e8d2d913',
    },
  },
};
