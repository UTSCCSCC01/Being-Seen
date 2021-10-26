import PropTypes from "prop-types";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tailwind } from "tailwind";

/**
 * @function ScreenHeader
 * @module ScreenHeader
 * @description Header component for a screen
 * @prop {JSX.Element} [leftNode] - left header component
 * @prop {JSX.Element} [rightNode] - right header component
 * @prop {string} [headerText] - header text
 * @prop {Function} [handleOnPressLeftNode] - onPress function for left header component
 * @prop {Function} [handleOnPressRightNode] - onPress function for right header component
 * @prop {style} [rightContainerStyle] - styling for right header component
 * @prop {style} [leftContainerStyle] - styling for left header component
 */
const ScreenHeader = ({
  leftNode,
  rightNode,
  headerText,
  handleOnPressLeftNode,
  handleOnPressRightNode,
  rightContainerStyle,
  leftContainerStyle,
}) => (
  <SafeAreaView>
    <View style={styles.pageHeaderContainer}>
      <Pressable
        onPress={handleOnPressLeftNode}
        style={leftContainerStyle || styles.leftItem}
      >
        {leftNode}
      </Pressable>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <Pressable
        onPress={handleOnPressRightNode}
        style={rightContainerStyle || styles.rightItem}
      >
        {rightNode}
      </Pressable>
    </View>
  </SafeAreaView>
);

ScreenHeader.propTypes = {
  leftNode: PropTypes.element,
  rightNode: PropTypes.element,
  headerText: PropTypes.string,
  handleOnPressLeftNode: PropTypes.func,
  handleOnPressRightNode: PropTypes.func,
  rightContainerStyle: ViewPropTypes.style,
  leftContainerStyle: ViewPropTypes.style,
};

ScreenHeader.defaultProps = {
  leftNode: null,
  rightNode: null,
  headerText: "",
  handleOnPressLeftNode: null,
  handleOnPressRightNode: null,
  rightContainerStyle: null,
  leftContainerStyle: null,
};

const styles = StyleSheet.create({
  headerItem: {
    ...tailwind("py-4 items-center"),
    flex: 3,
  },
  headerText: tailwind("text-primaryPurple font-bold text-2xl"),
  leftItem: tailwind("flex-1 pl-4 py-4"),
  pageHeaderContainer: tailwind(
    "flex flex-row items-center justify-between border-b border-gray-200"
  ),
  rightItem: tailwind("flex-1 pr-4 items-end py-4"),
});

export default ScreenHeader;
