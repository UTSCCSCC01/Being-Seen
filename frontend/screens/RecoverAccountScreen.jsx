import React from "react";
import { Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

/**
 * @function RecoverAccountScreen
 * @module RecoverAccountScreen
 * @description Account recovery screen
 */
const RecoverAccountScreen = () => {
  return (
    <SafeAreaView style={styles.recoverAccountPage}>
      <ScreenHeader leftNode={<BackButton />} headerText="Recover Account" />
      <View style={styles.body}>
        <Text style={styles.text}>
          Can&apos;t log in? Don&apos;t worry! Email us and we will help you go
          through a series of steps to securely recover your account.{"\n"}
          {"\n"}
          Click below to email us why you can&apos;t log in. We will be
          contacting you shortly with next steps.
        </Text>
        <View style={styles.buttonView}>
          <Button
            label="Recover account"
            onClick={() =>
              Linking.openURL(
                "mailto:beingseen.2020@gmail.com?subject=Can't Log In&body="
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
  backButton: {
    ...tailwind("text-primary text-opacity-90 text-xl"),
  },
  body: {
    ...tailwind("px-4 py-6"),
  },
  buttonView: {
    ...tailwind("px-4 py-8"),
  },
  recoverAccountPage: {
    ...tailwind("flex-1"),
  },
  text: {
    ...tailwind("text-black text-base"),
  },
});

export default RecoverAccountScreen;
