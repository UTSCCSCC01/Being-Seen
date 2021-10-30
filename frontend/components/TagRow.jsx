import PropTypes from "prop-types";
import React from "react";
import { FlatList, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import { tailwind } from "tailwind";

/**
 * @function TagRow
 * @module TagRow
 * @description Displays given tags within a row of boxes
 * @prop {array} [tagList] The list of tags to be displayed
 * @prop {style} [boxStyle] The style of the container of each tag text
 * @prop {style} [textStyle] The style of the text
 *
 */
export default function TagRow({ tagList, boxStyle, textStyle }) {
  return (
    <FlatList
      horizontal
      data={tagList}
      renderItem={({ item }) => (
        <View style={boxStyle}>
          <Text style={textStyle}>{item.tagName}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const defaultStyles = StyleSheet.create({
  defaultBoxStyle: {
    ...tailwind("bg-gray-300"),
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  defaultTextStyle: {
    fontSize: 16,
  },
});

TagRow.propTypes = {
  tagList: PropTypes.array.isRequired,
  boxStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
};

TagRow.defaultProps = {
  boxStyle: defaultStyles.defaultBoxStyle,
  textStyle: defaultStyles.defaultTextStyle,
};
