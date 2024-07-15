import * as React from 'react';
import { useEffect } from 'react';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Updates from 'expo-updates';

import MateiralTheme from '../../assets/material-theme.json';
import Navigator from './Navigator';
import type { AppConfigType } from './config';
import { ConfigProvider } from '../contexts/ConfigContext';
import { Alert } from 'react-native';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...MateiralTheme.schemes.light,
  },
};

interface Props {
  appConfig: AppConfigType;
}

export default function App({ appConfig }: Props) {
  useEffect(() => {
    async function checkAppUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        console.error(`Error fetching latest Expo update: ${error}`);
        Alert.alert(`Error fetching latest Expo update: ${error}`);
      }
    }

    if (!__DEV__) {
      checkAppUpdate();
    }
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ConfigProvider config={appConfig}>
        <Navigator />
      </ConfigProvider>
    </PaperProvider>
  );
}
