import React from "react";
import { Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

/**
 * @function RegisterAccountScreen
 * @module RegisterAccountScreen
 * @description Signup screen
 */
const RegisterAccountScreen = () => {
  return (
    <SafeAreaView style={styles.registerPage}>
      <ScreenHeader leftNode={<BackButton />} headerText="Register" />
      <View style={styles.body}>
        <Text style={styles.text}>
          Don&apos;t have an account? Email us today and we will create one for
          you! Don&apos;t miss out on the opportunities this app can give you!
          {"\n"}
          {"\n"}
          Click below to email us and tell us what you are looking for in this
          app. We will be contacting you shortly with next steps.
        </Text>
        <View style={styles.buttonView}>
          <Button
            label="Register"
            onClick={() =>
              Linking.openURL(
                "mailto:beingseen.2020@gmail.com?subject=Register An Account&body="
              )
            }
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    ...tailwind("px-4 py-6"),
  },
  buttonView: {
    ...tailwind("px-4 py-8"),
  },
  registerPage: {
    ...tailwind("flex-1"),
  },
  text: {
    ...tailwind("text-black text-base"),
  },
});

export default RegisterAccountScreen;
