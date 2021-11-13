import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator } from "react-native";
import { tailwind } from "tailwind";

function Spinner({ style }) {
  const { color, size } = style;
  return <ActivityIndicator color={color} size={size} />;
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

export default Spinner;
