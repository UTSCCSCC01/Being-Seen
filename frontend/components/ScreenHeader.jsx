import React from 'react';
import {
  Pressable, StyleSheet, View, ViewPropTypes, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tailwind } from 'tailwind';

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
      <Pressable onPress={handleOnPressLeftNode} style={leftContainerStyle || styles.leftItem}>
        {leftNode}
      </Pressable>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <Pressable onPress={handleOnPressRightNode} style={rightContainerStyle || styles.rightItem}>
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
  headerText: '',
  handleOnPressLeftNode: null,
  handleOnPressRightNode: null,
  rightContainerStyle: null,
  leftContainerStyle: null,
};

const styles = StyleSheet.create({
  pageHeaderContainer: tailwind(
    'flex flex-row items-center justify-between border-b border-gray-200',
  ),
  leftItem: tailwind('flex-1 pl-4 py-4'),
  rightItem: tailwind('flex-1 pr-4 items-end py-4'),
  headerItem: {
    ...tailwind('py-4 items-center'),
    flex: 3,
  },
  headerText: tailwind('text-primaryPurple font-bold text-2xl'),
});

export default ScreenHeader;
