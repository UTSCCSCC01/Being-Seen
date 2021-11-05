import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { tailwind } from "tailwind";

import icons from "../constants/icons";

/**
 * @function BackButton
 * @module BackButton
 * @description A button that navigates back to the previous screen
 */
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Image source={icons.back_button} style={styles.backButton} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    ...tailwind("p-2"),
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.1,
  },
});
