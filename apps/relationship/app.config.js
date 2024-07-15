const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV
    ? 'AI Relationship Counselor (Dev)'
    : 'AI Relationship Counselor',
  slug: 'ai-relationship-assistant',
  scheme: 'ai-relationship-assistant',
  version: '1.1.3',
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
    url: 'https://u.expo.dev/ddc72e9c-e517-455f-9dc8-095283879761',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.relationship'
      : 'com.aiassistant.relationship',
    buildNumber: '25',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV
      ? 'com.aiassistant.relationship'
      : 'com.aiassistant.relationship',
    versionCode: 25,
    permissions: ['com.android.vending.BILLING'],
  },
  web: {
    favicon: './assets/icon.png',
  },
  plugins: [
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
      projectId: 'ddc72e9c-e517-455f-9dc8-095283879761',
    },
  },
};
