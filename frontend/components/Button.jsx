import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Pressable, Text } from 'react-native';
import { tailwind } from 'tailwind';

/**
 * @function Button
 * @module Button
 * @description Generic button
 * @prop {string} label - Button label
 * @prop {boolean} disabled - Disable button
 * @prop {function} onPress - Callback function to be executed on press
 */
const Button = ({
  label,
  disabled,
  onClick,
}) => {
  const opacity = disabled ? 0.5 : 1;

  return (
    <Pressable
      style={styles({
        opacity,
      }).button}
      disabled={disabled}
      onPress={onClick}
    >
      <Text style={styles({}).label}>
        {label}
      </Text>
    </Pressable>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = ({ opacity }) => StyleSheet.create({
  button: {
    ...tailwind('bg-primaryPurple text-white p-3 rounded-lg'),
    opacity,
  },
  label: {
    ...tailwind('text-white text-center text-xl font-semibold'),
  },
});

export default Button;
