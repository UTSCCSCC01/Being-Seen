import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

/**
 * @function RecoverAccountScreen
 * @module RecoverAccountScreen
 * @description Account recovery screen
 */
const RecoverAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScreenHeader
        leftNode={
          <View>
            <TouchableHighlight
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
            >
              <Text style={styles.backButton}>Back</Text>
            </TouchableHighlight>
          </View>
        }
        headerText="Recover Account"
      />
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
                "mailto:support@beingseen.com?subject=Can't Log In&body="
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
    ...tailwind("text-primaryPurple text-opacity-90 text-xl"),
  },
  body: {
    ...tailwind("px-4 py-6"),
  },
  buttonView: {
    ...tailwind("px-4 py-8"),
  },
  text: {
    ...tailwind("text-primaryPurple text-base"),
  },
});

export default RecoverAccountScreen;
