const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'AI Movie Buff (Dev)' : 'AI Movie Buff',
  slug: 'ai-movie-assistant',
  scheme: 'ai-movie-assistant',
  version: '1.0.11',
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
    url: 'https://u.expo.dev/ffab8ce8-660b-4006-b332-9c767fc63181',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.movie'
      : 'com.aiassistant.movie',
    buildNumber: '19',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.aiassistant.movie' : 'com.aiassistant.movie',
    versionCode: 19,
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
      projectId: 'ffab8ce8-660b-4006-b332-9c767fc63181',
    },
  },
};
