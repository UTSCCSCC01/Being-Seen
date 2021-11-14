import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { tailwind } from "tailwind";

function Spinner({ style }) {
  const { color, size } = style;
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}

Spinner.propTypes = {
  style: PropTypes.object,
};

Spinner.defaultProps = {
  style: {
    ...tailwind("text-primary"),
    size: "large",
  },
};

const styles = StyleSheet.create({
  spinnerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default Spinner;
