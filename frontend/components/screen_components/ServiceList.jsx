import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import colors from "../../constants/colors";
import apiHandler from "../../util/APIHandler";
import { capitalize, getTags } from "../../util/FormatHelper";
import SearchBar from "../SearchBar";

/* eslint-disable react-native/no-color-literals */

/**
 * @function ShelterList display list of shelters
 * @module ShelterList ShelterList
 * @description display list of shelters
 * @prop {Object} [navigation] - The navigation provided by react navigaition library.
 * @param {string} [query] - The type of the service displayed in this list
 *
 */
export default function ServiceList({ navigation, query }) {
  const [information, setInformation] = useState([
    { name: `Error ${query} not loaded` },
  ]);
  const [sheltersRefreshing, setSheltersRefreshing] = useState(false);

  useEffect(() => {
    apiHandler
      .getInfoFromApi(query)
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
  }, [query]);

  async function refreshFromApi() {
    setSheltersRefreshing(true);
    apiHandler
      .getInfoFromApi(query)
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
    setSheltersRefreshing(false);
  }
  return (
    <FlatList
      ListHeaderComponent={
        <SearchBar
          navigation={navigation}
          screenName="searchResult"
          serviceType={query}
        />
      }
      data={information}
      refreshing={sheltersRefreshing}
      onRefresh={refreshFromApi}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItemContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(`${capitalize(query)}Details`, {
                  itemId: item._id,
                  query,
                });
              }}
              style={styles.itemElementContainer}
            >
              <>
                {item.picture ? (
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: item.picture }}
                  />
                ) : null}
                <View style={styles.textContainer}>
                  <Text style={styles.text} numberOfLines={1}>
                    Name: {item.name}
                  </Text>
                  {item.address && (
                    <Text style={styles.text} numberOfLines={1}>
                      Address: {item.address}
                    </Text>
                  )}
                  <Text style={styles.text} numberOfLines={1}>
                    Phone: {item.phoneNumber}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    Tags: {item.tags ? getTags(item.tags) : "None"}
                  </Text>
                </View>
              </>
            </TouchableOpacity>
          </View>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
      style={[
        styles.scrollBackground,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}
    />
  );
}

ServiceList.propTypes = {
  navigation: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  itemElementContainer: {
    ...tailwind("border-primary"),
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: 80,
    margin: 3,
  },
  listItemContainer: {
    ...tailwind("bg-gray-200"),
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
  textContainer: {
    flex: 1,
    margin: 2,
  },
  thumbnail: {
    borderRadius: 8,
    height: 76,
    width: 76,
  },
});
