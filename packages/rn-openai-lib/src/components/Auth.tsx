import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';

import { supabase } from '../../lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button // eslint-disable-next-line react-native/no-inline-styles
          contentStyle={{ height: 56 }}
          // eslint-disable-next-line react-native/no-inline-styles
          labelStyle={{ fontSize: 16 }}
          mode="contained"
          disabled={loading}
          onPress={() => signInWithEmail()}
        >
          Sign in
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button // eslint-disable-next-line react-native/no-inline-styles
          contentStyle={{ height: 56 }}
          // eslint-disable-next-line react-native/no-inline-styles
          labelStyle={{ fontSize: 16 }}
          mode="contained"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        >
          Sign up
        </Button>

        <Link href="/forgot" style={styles.forget}>
          Forgot Password?
        </Link>
      </View>

      <Text style={styles.text}>
        By signing up, you agree to our{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL(
              'https://docs.google.com/document/d/e/2PACX-1vQ272k3xzqtA9oQ8zGgNsczeC_H7Oxg89ZZPd46u9iYTMC74Fnf48YzmrCB4dqfn9_LyOr4HVmtW-fR/pub'
            )
          }
        >
          Terms & Conditions
        </Text>{' '}
        and{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL(
              'https://docs.google.com/document/d/e/2PACX-1vQvlFsIE7X4K6TufCmJ6UL3ffcx0vqDPh8cOq9uZcTZ4cSiZNAcixOTciQeFFSoDdjEnifLlgwi5Gh6/pub'
            )
          }
        >
          Privacy Policies
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    color: 'grey',
  },
  forget: {
    // color: '#004D3A',
    fontSize: 14,
    margin: 7,
    paddingTop: 7,
    fontWeight: '600',
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
});
