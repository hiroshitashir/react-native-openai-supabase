import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import {
  Button,
  TextInput,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Headline } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

import MateiralTheme from '../../assets/material-theme.json';
import { supabase } from '../../lib/supabase';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...MateiralTheme.schemes.light,
  },
};

type Tokens = {
  access_token: string;
  refresh_token: string;
};

export default function Password() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const router = useRouter();

  const loginWithToken = async ({ access_token, refresh_token }: Tokens) => {
    //console.warn('loginWithToken:');
    try {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      await supabase.auth.refreshSession();
    } catch (error) {
      console.error(`Error while loginWithToken: `, error);
    }
  };

  useEffect(() => {
    async function checkAuthToken() {
      let url = await Linking.getInitialURL();
      //Alert.alert('checkAuthToken - url: ' + url);

      if (url !== null) {
        url = url.replace('#', '?');
        const parsedUrl = Linking.parse(url);

        const error = parsedUrl.queryParams?.error;
        const error_description = parsedUrl.queryParams?.error_description;
        if (error) {
          Alert.alert(
            'error:' + error + ', error_description:' + error_description
          );
          console.warn(
            'error: ' + error + 'error_description:' + error_description
          );

          if (error === 'unauthorized_client') {
            router.replace(
              `/forgot?error=${error}&error_description=${error_description}`
            );
          }
          return;
        }

        const access_token = parsedUrl.queryParams?.access_token;
        const refresh_token = parsedUrl.queryParams?.refresh_token;
        if (
          typeof access_token === 'string' &&
          typeof refresh_token === 'string'
        ) {
          await loginWithToken({ access_token, refresh_token });
        }
      }
    }

    checkAuthToken();
  }, [router]);

  async function updatePassword() {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    setLoading(false);

    if (error) {
      Alert.alert(error.message);
      return;
    }

    setPasswordUpdated(true);
    router.replace('/');
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Headline
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 6,
            fontSize: 30,
          }}
        >
          Update Password
        </Headline>
        {!passwordUpdated ? (
          <>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <TextInput
                label="Password"
                secureTextEntry
                // right={<TextInput.Icon icon="eye" />}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="password"
                autoCapitalize={'none'}
                disabled={loading}
              />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <Button
                // eslint-disable-next-line react-native/no-inline-styles
                contentStyle={{ height: 56 }}
                // eslint-disable-next-line react-native/no-inline-styles
                labelStyle={{ fontSize: 16 }}
                mode="contained"
                disabled={loading}
                onPress={() => updatePassword()}
              >
                Update
              </Button>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.centerText, styles.mt20]}>
              <Text style={styles.text}>Password updated</Text>
            </View>
          </>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 42,
    paddingTop: 150,
    justifyContent: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  centerText: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'center',
  },
  mt20: {
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 25,
  },
  link: {
    color: 'blue',
  },
});
