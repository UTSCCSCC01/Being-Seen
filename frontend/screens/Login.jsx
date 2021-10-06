import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { tailwind } from 'tailwind';
import { PrimaryHeader } from '../components/Headers';
import TextField from '../components/TextField';
import Button from '../components/Button';
import UnderlinedLink from '../components/UnderlinedLink';

/**
 * @function Login
 * @module Login
 * @description Login screen
 */
const Login = () => {
  const hey = "adasd";

  return (
    <ScrollView>
      <SafeAreaView style={styles.view}>
        <View style={styles.header}>
          <PrimaryHeader text="Login" />
        </View>
        <TextField placeholder="Username" />
        <TextField placeholder="Password" secure />
        <View style={styles.loginButton}>
          <Button label="Enter" disabled={false} onClick={() => {}} />
        </View>
        <View style={styles.underlinedLinks}>
          <UnderlinedLink text="Don't have an account?" />
          <UnderlinedLink text="Can't log in?" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    ...tailwind('flex flex-col justify-center mx-5 my-10'),
  },
  header: {
    ...tailwind('flex items-center my-10'),
  },
  loginButton: {
    ...tailwind('my-5'),
  },
  underlinedLinks: {
    ...tailwind('flex flex-col items-center'),
  },
});

export default Login;
