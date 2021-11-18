import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";

const EmailUsScreen = () => {
  return (
    <View>
      <ScreenHeader headerText="Email Us" leftNode={<BackButton />} />
      <View style={styles.emailUsView}>
        <Text style={styles.text}>
          If you have any concerns or questions, feel free to email us. We will
          be happy to answer them to the best of our ability!{" "}
        </Text>
        <View style={styles.buttonView}>
          <Button
            label="Send an email"
            disabled={false}
            onClick={() => {
              Linking.openURL("mailto:beingseen.2020@gmail.com");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EmailUsScreen;

const styles = StyleSheet.create({
  buttonView: {
    ...tailwind("m-4"),
  },
  emailUsView: {
    ...tailwind("p-4"),
  },
  text: {
    ...tailwind("text-black text-base"),
  },
});
