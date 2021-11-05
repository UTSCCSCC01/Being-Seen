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

import { capitalize, getTags } from "../../util/FormatHelper";

/**
 * @function ServiceList
 * @module ServiceList
 * @description Display list of a service
 * @prop {Object} [navigation] - The navigation provided by react navigaition library.
 * @prop {string} [query] - The type of the service displayed in this list
 * @prop {funcion} [infoGetter] - A function with which this component uses to get data
 * @prop {element} [listHeader] - A react component as the list header, usually a search bar
 */
export default function ServiceList({
  navigation,
  query,
  infoGetter,
  listHeader,
}) {
  const [information, setInformation] = useState([
    { name: `Error ${query} not loaded` },
  ]);
  const [sheltersRefreshing, setSheltersRefreshing] = useState(false);

  useEffect(() => {
    infoGetter()
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
  }, [infoGetter]);

  async function refreshFromApi() {
    setSheltersRefreshing(true);
    infoGetter()
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
    setSheltersRefreshing(false);
  }
  return (
    <FlatList
      ListHeaderComponent={listHeader}
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
      style={styles.scrollBackground}
    />
  );
}

ServiceList.propTypes = {
  navigation: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  infoGetter: PropTypes.func.isRequired,
  listHeader: PropTypes.element,
};

ServiceList.defaultProps = {
  listHeader: null,
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
  scrollBackground: {
    flex: 1,
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
