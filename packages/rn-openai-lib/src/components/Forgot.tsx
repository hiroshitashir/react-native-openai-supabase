import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import {
  Button,
  TextInput,
  MD3LightTheme,
  Provider as PaperProvider,
  HelperText,
} from 'react-native-paper';
import { Headline } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { Link, useLocalSearchParams } from 'expo-router';

import MateiralTheme from '../../assets/material-theme.json';
import { supabase } from '../../lib/supabase';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...MateiralTheme.schemes.light,
  },
};

const redirectUrl = Linking.createURL('password', {
  queryParams: {},
});

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { error, error_description } = useLocalSearchParams<{
    error?: string;
    error_description?: string;
  }>();

  async function resetPassword() {
    setLoading(true);
    console.log(`sending reset link to: ${redirectUrl}`);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (err) {
      Alert.alert(err.message);
    } else {
      setEmailSent(true);
    }
    setLoading(false);
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
          Forgot Password
        </Headline>
        {!emailSent ? (
          <>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <TextInput
                label="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={'none'}
              />
            </View>
            <View style={[styles.mt20]}>
              <Button
                // eslint-disable-next-line react-native/no-inline-styles
                contentStyle={{ height: 56 }}
                // eslint-disable-next-line react-native/no-inline-styles
                labelStyle={{ fontSize: 16 }}
                mode="contained"
                disabled={loading}
                onPress={() => resetPassword()}
              >
                Email reset link
              </Button>
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <HelperText
                type="error"
                style={styles.errorText}
                visible={error !== undefined}
              >
                {error_description?.replace('+', ' ') || error}
              </HelperText>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.centerText, styles.mt20]}>
              <Text style={styles.text}>Sent to your email</Text>
              <Link href="/password" style={styles.password}>
                Password
              </Link>
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
  errorText: {
    fontSize: 15,
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
  password: {
    display: 'none',
  },
});
