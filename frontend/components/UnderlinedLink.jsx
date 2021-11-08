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
 * @prop {string} [to] - Destination link
 */
const UnderlinedLink = ({ text, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => navigation.replace(to)}
      underlayColor="#E8E7E7"
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

UnderlinedLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
};

UnderlinedLink.defaultProps = {
  to: "",
};

const styles = StyleSheet.create({
  text: {
    ...tailwind("text-base text-primary text-opacity-75"),
  },
});

export default UnderlinedLink;
