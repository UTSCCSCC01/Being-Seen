/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { tailwind } from "tailwind";
/**
 * @function DisplayNotif
 * @module DisplayNotif
 * @Description Component that displays text if display is true
 * @prop {boolean} display - boolean to display or not
 * @prop {string} notification - text to display on error
 *
 */
const DisplayNotif = ({ display, notification }) => {
  if (display) {
    return <Text style={styles.text}>{notification}</Text>;
  }
  return null;
};

DisplayNotif.propTypes = {
  display: PropTypes.bool.isRequired,
  notification: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    ...tailwind("text-error"),
  },
});

export default DisplayNotif;
