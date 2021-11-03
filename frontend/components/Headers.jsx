/** @module Headers */
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { tailwind } from "tailwind";

/**
 * @function PrimaryHeader
 * @description Largest header
 * @prop {string} text - Text to display
 */
export const PrimaryHeader = ({ text }) => (
  <Text style={styles.primaryHeader}>{text}</Text>
);

PrimaryHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

/**
 * @function SecondaryHeader
 * @description Second-largest header
 * @prop {string} text - Text to display
 */
export const SecondaryHeader = ({ text }) => (
  <Text style={styles.secondaryHeader}>{text}</Text>
);

SecondaryHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

/**
 * @function TertiaryHeader
 * @description Third-largest header
 * @prop {string} text - Text to display
 */
export const TertiaryHeader = ({ text }) => (
  <Text style={styles.tertiaryHeader}>{text}</Text>
);

TertiaryHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  primaryHeader: {
    ...tailwind("text-primary font-bold"),
    fontSize: 30,
  },
  secondaryHeader: {
    ...tailwind("text-primary font-semibold"),
    fontSize: 25,
  },
  tertiaryHeader: {
    ...tailwind("text-primary font-medium"),
    fontSize: 20,
  },
});
