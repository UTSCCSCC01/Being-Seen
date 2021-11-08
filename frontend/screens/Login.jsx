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
import apiHandler from "../util/APIHandler";

/**
 * @function Login
 * @module Login
 * @description Login screen
 */
const Login = () => {
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
      const response = await apiHandler.submitLogin(username, password);
      const data = await response.json();
      if (data.access_token) {
        saveToken(data.access_token);
        navigation.replace("Home");
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
          onSubmitEditing={submitLogin}
        />
        <TextField
          placeholder="Password"
          secure
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={submitLogin}
        />
        <View style={styles.loginButton}>
          <Button label="Enter" disabled={false} onClick={submitLogin} />
        </View>
        <View style={styles.underlinedLinks}>
          <UnderlinedLink text="Don't have an account?" to="RegisterAccount" />
          <UnderlinedLink text="Can't log in?" to="RecoverAccount" />
          <UnderlinedLink text="Learn more about Being Seen" to="Tutorial" />
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
