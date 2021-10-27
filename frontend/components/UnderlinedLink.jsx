import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { tailwind } from "tailwind";

/**
 * @function UnderlinedLink
 * @module UnderlinedLink
 * @description An underlined text link
 * @prop {string} text - The text to display
 * @prop {string} to
 */
const UnderlinedLink = ({ text, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => navigation.push(to)}
      underlayColor="gray"
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

UnderlinedLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    ...tailwind("text-base text-primary text-opacity-75 underline"),
  },
});

export default UnderlinedLink;
