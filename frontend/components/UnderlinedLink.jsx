import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { tailwind } from 'tailwind';

/**
 * @function UnderlinedLink
 * @module UnderlinedLink
 * @description An underlined text link
 * @prop {string} text - The text to display
 */
const UnderlinedLink = ({ text }) => (
  <Text style={styles.text}>{text}</Text>
);

UnderlinedLink.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  text: {
    ...tailwind('text-base text-primaryPurple text-opacity-75 underline'),
  },
});

export default UnderlinedLink;
