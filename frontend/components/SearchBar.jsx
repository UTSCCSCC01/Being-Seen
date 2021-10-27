import PropTypes from "prop-types";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../constants/colors";

function SearchBar({
  navigation,
  screenName,
  serviceType,
  prefill,
  isSecondary,
}) {
  const [searchString, setSearchString] = useState(prefill);
  const onSubmitEditing = () => {
    navigation.push(screenName, {
      serviceType: serviceType.toLowerCase(),
      searchKeys: searchString,
    });
  };

  return (
    <View style={styles.headerBackGround}>
      <View style={styles.searchBoxContainer}>
        <Icon name="search" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          onSubmitEditing={onSubmitEditing}
          onChangeText={(text) => {
            setSearchString(text);
          }}
          defaultValue={prefill}
        />
      </View>
      {isSecondary ? (
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon name="delete" style={styles.backIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

SearchBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenName: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  prefill: PropTypes.string,
  isSecondary: PropTypes.bool,
};

SearchBar.defaultProps = {
  prefill: "",
  isSecondary: false,
};

const styles = StyleSheet.create({
  backIcon: {
    color: colors.backgroundColor,
    fontSize: 24,
  },
  backIconContainer: {
    alignItems: "center",
    // backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: -10,
    width: 40,
  },
  headerBackGround: {
    alignItems: "center",
    backgroundColor: colors.themeMain,
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  searchBoxContainer: {
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    borderRadius: 20,
    flex: 1,
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
