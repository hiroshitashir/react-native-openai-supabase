const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  name: IS_DEV ? 'AI Girlfriend (Dev)' : 'AI Girlfriend',
  slug: 'ai-girlfriend-assistant',
  scheme: 'ai-girlfriend-assistant',
  version: '1.1.11',
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
    url: 'https://u.expo.dev/8cb48bc9-911c-417a-ab25-070cd57011b4',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? 'com.aiassistant.girlfriend'
      : 'com.aiassistant.girlfriend',
    buildNumber: '33',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV
      ? 'com.aiassistant.girlfriend'
      : 'com.aiassistant.girlfriend',
    versionCode: 33,
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
      projectId: '8cb48bc9-911c-417a-ab25-070cd57011b4',
    },
  },
};
