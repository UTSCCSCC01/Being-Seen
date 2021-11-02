import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { tailwind } from "tailwind";

function QuotationBlock({ text, fontSize, style }) {
  return (
    <View style={[styles.blockContainer, style]}>
      <View style={styles.veriticalRuler} />
      <Text style={{ fontSize }}>{text}</Text>
    </View>
  );
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
