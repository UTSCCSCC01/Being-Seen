import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Linking,
  TouchableHighlight,
} from "react-native";
import { tailwind } from "tailwind";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

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
          Can't log in? Don't worry! Email us and we will help you go through a
          series of steps to securely recover your account.{"\n"}
          {"\n"}
          Click below to email us why you can't log in. We will be contacting
          you shortly with next steps.
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
  text: {
    ...tailwind("text-primaryPurple text-base"),
  },
  buttonView: {
    ...tailwind("px-4 py-8"),
  },
});

export default RecoverAccountScreen;
