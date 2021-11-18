import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Alert from "react-native-awesome-alerts";
import { tailwind } from "tailwind";

import icons from "../constants/icons";

function AlertOK({
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
      closeOnHardwareBackPress={false}
      closeOnTouchOutside={false}
      contentContainerStyle={styles.okContainerStyle}
      customView={
        <View style={styles.customViewContainer}>
          <Image source={icons.home_filled} style={styles.icon} />
          {customView}
        </View>
      }
    />
  );
}

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
      closeOnHardwareBackPress={false}
      closeOnTouchOutside={false}
    />
  );
}

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
      closeOnHardwareBackPress={false}
      closeOnTouchOutside={false}
    />
  );
}

export { AlertError, AlertOK, AlertWarning };

const styles = StyleSheet.create({
  customViewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 30,
    width: 30,
  },
  okContainerStyle: {
    ...tailwind("border-green-500 border-4"),
    width: 400,
  },
});
