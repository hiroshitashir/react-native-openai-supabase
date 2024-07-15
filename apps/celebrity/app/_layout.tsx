import React from 'react';
import { Stack } from 'expo-router';

import 'react-native-gesture-handler';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot" options={{ title: '' }} />
      <Stack.Screen name="password" options={{ title: '' }} />
    </Stack>
  );
}
