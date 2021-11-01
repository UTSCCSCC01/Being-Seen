import PropTypes from "prop-types";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import { tailwind } from "tailwind";

import colors from "../constants/colors";

/**
 * @function SearchBar
 * @module SearchBar
 * @description This components accepts a user input and navigates the user to a dedicated
 *              search result screen (SearchScreen) when the user submits.
 * @prop {object} [navigation] The navigation object provided by the react navigation library.
 * @prop {string} [resultScreenName] The name of the screen to which this component will
 *                                    navigate the user.
 * @prop {string} [serviceType] The name of the api endpoint to which the search screen will
 *                               send http requests.
 * @prop {string} [prefill] The prefill text in the search bar. Default: ""
 * @prop {bool} [isSecondary] Whether there will be a back button on the right side of the
 *                             text input. Default: false
 */
function SearchBar({
  navigation,
  resultScreenName,
  serviceType,
  prefill,
  isSecondary,
}) {
  const [searchString, setSearchString] = useState(prefill);
  const onSubmitEditing = () => {
    navigation.push(resultScreenName, {
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
  resultScreenName: PropTypes.string.isRequired,
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
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: -10,
    width: 40,
  },
  headerBackGround: {
    ...tailwind("bg-primary"),
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  searchBoxContainer: {
    ...tailwind("bg-white"),
    alignItems: "center",
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
