const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'AI Dating Assistant (Dev)' : 'AI Dating Assistant',
  slug: 'ai-dating-assistant',
  scheme: 'ai-dating-assistant',
  version: '1.1.17',
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
    url: 'https://u.expo.dev/f5c5fc48-1cb6-4856-a11b-8c255f1309bd',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.dating'
      : 'com.aiassistant.dating',
    buildNumber: '29',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.aiassistant.dating' : 'com.aiassistant.dating',
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
      projectId: 'f5c5fc48-1cb6-4856-a11b-8c255f1309bd',
    },
  },
};
