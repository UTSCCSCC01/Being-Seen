import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const saveToken = async (value) => {
    await SecureStore.setItemAsync('token', value);
  };

  const deleteToken = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

  const submitLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log(username);
      console.log(password);
      if (data.access_token) {
        saveToken(data.access_token);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    deleteToken('token');
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.view}>
        <View style={styles.header}>
          <PrimaryHeader text="Login" />
        </View>
        <TextField placeholder="Username" onChangeText={(text) => setUsername(text)} />
        <TextField placeholder="Password" secure onChangeText={(text) => setPassword(text)} />
        <View style={styles.loginButton}>
          <Button label="Enter" disabled={false} onClick={submitLogin} />
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
