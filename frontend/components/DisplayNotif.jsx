/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import PropTypes from "prop-types";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { tailwind } from "tailwind";
/**
 * @function DisplayNotif
 * @module DisplayNotif
 * @Description component that displays text if display is true
 * @prop {boolean} display
 * @prop {string} notification
 *
 */
const DisplayNotif = ({ display, notification, color }) => {
  if (!color) color = "red";
  if (display) {
    return <Text style={{ color }}>{notification}</Text>;
  }
  return null;
};

DisplayNotif.propTypes = {
  display: PropTypes.bool.isRequired,
  notification: PropTypes.string.isRequired,
};

export default DisplayNotif;
