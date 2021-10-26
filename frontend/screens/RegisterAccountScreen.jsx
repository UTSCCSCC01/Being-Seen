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
 * @function RegisterAccountScreen
 * @module RegisterAccountScreen
 * @description Signup screen
 */
const RegisterAccountScreen = () => {
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
        headerText="Register"
      />
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
                "mailto:support@beingseen.com?subject=Register An Account&body="
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

export default RegisterAccountScreen;
