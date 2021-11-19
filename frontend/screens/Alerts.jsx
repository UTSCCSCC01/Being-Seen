import PropTypes from "prop-types";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Alert from "react-native-awesome-alerts";
import { tailwind } from "tailwind";

import icons from "../constants/icons";

function AlertOK({
  isShown,
  title,
  message,
  confirmText,
  onCancel,
  onConfirm,
  customView,
}) {
  return (
    <Alert
      show={isShown}
      showProgress={false}
      title={title}
      message={message}
      showCancelButton={false}
      showConfirmButton
      confirmText={confirmText}
      onCancelPressed={onCancel}
      onConfirmPressed={onConfirm}
      closeOnHardwareBackPress
      closeOnTouchOutside
      onDismiss={onCancel}
      contentContainerStyle={styles.okContainerStyle}
      confirmButtonColor="rgba(1, 158, 236, 1)"
      customView={
        <View style={styles.customViewContainer}>
          <Image source={icons.check_mark} style={styles.icon} />
          {customView}
        </View>
      }
    />
  );
}

AlertOK.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  customView: PropTypes.element,
};

AlertOK.defaultProps = {
  title: "",
  message: "",
  confirmText: "Confirm",
  onConfirm: () => {},
  customView: null,
};

function AlertWarning({
  isShown,
  title,
  message,
  showCancelButton,
  showConfirmButton,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  customView,
}) {
  return (
    <Alert
      show={isShown}
      showProgress={false}
      title={title}
      message={message}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      onCancelPressed={onCancel}
      onConfirmPressed={onConfirm}
      closeOnHardwareBackPress
      closeOnTouchOutside
      onDismiss={onCancel}
      contentContainerStyle={styles.warningContainerStyle}
      confirmButtonColor="rgba(1, 158, 236, 1)"
      customView={
        <View style={styles.customViewContainer}>
          <Image source={icons.trig_warn} style={styles.icon} />
          {customView}
        </View>
      }
    />
  );
}

AlertWarning.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  customView: PropTypes.element,
};

AlertWarning.defaultProps = {
  title: "",
  message: "",
  showCancelButton: true,
  showConfirmButton: true,
  cancelText: "Cancel",
  confirmText: "Confirm",
  onConfirm: () => {},
  customView: null,
};

function AlertError({
  isShown,
  title,
  message,
  showCancelButton,
  showConfirmButton,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  customView,
}) {
  return (
    <Alert
      show={isShown}
      showProgress={false}
      title={title}
      message={message}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      onCancelPressed={onCancel}
      onConfirmPressed={onConfirm}
      closeOnHardwareBackPress
      closeOnTouchOutside
      onDismiss={onCancel}
      contentContainerStyle={styles.errorContainerStyle}
      confirmButtonColor="rgba(1, 158, 236, 1)"
      customView={
        <View style={styles.customViewContainer}>
          <Image source={icons.error_warn} style={styles.icon} />
          {customView}
        </View>
      }
    />
  );
}

AlertError.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  customView: PropTypes.element,
};

AlertError.defaultProps = {
  title: "",
  message: "",
  showCancelButton: false,
  showConfirmButton: true,
  cancelText: "Cancel",
  confirmText: "Confirm",
  onConfirm: () => {},
  customView: null,
};

export { AlertError, AlertOK, AlertWarning };

const styles = StyleSheet.create({
  customViewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainerStyle: {
    ...tailwind("border-red-500 border-4"),
    width: 400,
  },
  icon: {
    height: 30,
    width: 30,
  },
  okContainerStyle: {
    ...tailwind("border-green-500 border-4"),
    width: 400,
  },
  warningContainerStyle: {
    ...tailwind("border-yellow-500 border-4"),
    width: 400,
  },
});
