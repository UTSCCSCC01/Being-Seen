import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import { tailwind } from "tailwind";

function QuotationBlock({ text, fontSize, style }) {
  return (
    <View style={[styles.blockContainer, style]}>
      <View style={styles.veriticalRuler} />
      <Text style={{ fontSize }}>{text}</Text>
    </View>
  );
}
QuotationBlock.PropTypes = {
  text: PropTypes.string,
  fontFize: PropTypes.number,
  style: ViewPropTypes.style,
};

QuotationBlock.defaultProps = {
  text: "Default Text",
  fontSize: 16,
  style: null,
}



export default QuotationBlock;

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: "row",
  },
  veriticalRuler: {
    ...tailwind("border-l-2 border-gray-300 mr-3"),
  },
});
