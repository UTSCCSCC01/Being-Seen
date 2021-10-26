import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../constants/colors";

function SearchBar({ navigation, screenName }) {
  const onSubmitEditing = () => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.headerBackGround}>
      <View style={styles.searchBoxContainer}>
        <Icon name="search" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    </SafeAreaView>
  );
}

SearchBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  headerBackGround: {
    backgroundColor: colors.themeMain,
    height: 80,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchBoxContainer: {
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    borderRadius: 20,
    flexDirection: "row",
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SearchBar;
