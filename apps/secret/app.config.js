const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'Whisper AI (Dev)' : 'Whisper AI',
  slug: 'ai-secret-assistant',
  scheme: 'ai-secret-assistant',
  version: '1.1.8',
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
    url: 'https://u.expo.dev/97203b58-412a-47bb-8626-76f79c2eb9fa',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.secret'
      : 'com.aiassistant.secret',
    buildNumber: '30',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.aiassistant.secret' : 'com.aiassistant.secret',
    versionCode: 30,
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
      projectId: '97203b58-412a-47bb-8626-76f79c2eb9fa',
    },
  },
};
