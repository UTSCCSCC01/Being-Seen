import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { tailwind } from "tailwind";

import Button from "../components/Button";
import DisplayNotif from "../components/DisplayNotif";
import { PrimaryHeader } from "../components/Headers";
import TextField from "../components/TextField";
import UnderlinedLink from "../components/UnderlinedLink";

/**
 * @function Login
 * @module Login
 * @description Login screen
 */
const Login = () => {
  const androidPath = "10.0.2.2:3000/";
  const otherPath = "192.168.2.49:3000/";
  const failedLoginMessage = "Error: Incorrect Username Or Password";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const navigation = useNavigation();

  const saveToken = async (value) => {
    await SecureStore.setItemAsync("token", value);
  };

  const deleteToken = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

  const submitLogin = async () => {
    try {
      const response = await fetch(`http://${androidPath}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (data.access_token) {
        saveToken(data.access_token);
        navigation.navigate("Home");
      } else setFailedLogin(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    deleteToken("token");
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.view}>
        <View style={styles.header}>
          <PrimaryHeader text="Login" />
        </View>
        <View style={styles.errorMessage}>
          <DisplayNotif
            notification={failedLoginMessage}
            display={failedLogin}
            color="indianred"
          />
        </View>

        <TextField
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextField
          placeholder="Password"
          secure
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.loginButton}>
          <Button label="Enter" disabled={false} onClick={submitLogin} />
        </View>
        <View style={styles.underlinedLinks}>
          <UnderlinedLink text="Don't have an account?" to="RegisterAccount" />
          <UnderlinedLink text="Can't log in?" to="RecoverAccount" />
          <UnderlinedLink text="Learn More About Being Seen" to="Landing" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    ...tailwind("items-center"),
  },
  header: {
    ...tailwind("flex items-center my-10"),
  },
  loginButton: {
    ...tailwind("my-5"),
  },
  underlinedLinks: {
    ...tailwind("flex flex-col items-center"),
  },
  view: {
    ...tailwind("flex flex-col justify-center mx-5 my-10"),
  },
});

export default Login;
