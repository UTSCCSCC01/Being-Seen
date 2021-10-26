import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { tailwind } from "tailwind";

/**
 * @function TextField
 * @module TextField
 * @description A single line text field
 * @prop {string} placeholder - Placeholder text
 * @prop {string} [keyboardType] - Keyboard layout
 * @prop {string} [textContentType] - Type of text for autofill (iOS)
 * @prop {string} [autoCompleteType] - Type of text for autofill (Android)
 * @prop {boolean} [secure] - Censor text input
 * @prop {boolean} [autocorrect] - Autocorrect text input
 * @prop {function} [onChangeText] - Callback for text change
 * @prop {function} [onSubmitEditing] - Callback for submit
 */
const TextField = ({
  placeholder,
  keyboardType,
  textContentType,
  autoCompleteType,
  secure,
  autocorrect,
  onChangeText,
  onSubmitEditing,
}) => (
  <TextInput
    style={styles.textBox}
    placeholder={placeholder}
    keyboardType={keyboardType}
    textContentType={textContentType}
    autoCompleteType={autoCompleteType}
    secureTextEntry={secure}
    autocorrect={autocorrect}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
  />
);

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  textContentType: PropTypes.string,
  autoCompleteType: PropTypes.string,
  secure: PropTypes.bool,
  autocorrect: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

TextField.defaultProps = {
  keyboardType: "default",
  textContentType: "none",
  autoCompleteType: "off",
  secure: false,
  autocorrect: false,
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

const styles = StyleSheet.create({
  textBox: {
    ...tailwind("text-lg h-12 my-2 p-1 border-b-2 border-primaryPurple"),
  },
});

export default TextField;
