import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { useConfig } from '../contexts/ConfigContext';
import Auth from './Auth';

const Login = () => {
  const { config } = useConfig();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={config.logo_image} />
      <Headline
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontWeight: 'bold',
          alignSelf: 'center',
          textAlign: 'center',
          marginBottom: 0,
          fontSize: 32,
        }}
      >
        {config.app_title}
      </Headline>
      <Auth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 47,
    marginBottom: 25,
  },
});

export default Login;
