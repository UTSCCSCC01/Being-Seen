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

import icons from "../../constants/icons";
import { capitalize, getTags } from "../../util/FormatHelper";
import Spinner from "../Spinner";
import TagRow from "../TagRow";

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
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    setRefreshing(true);
    infoGetter()
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .then(() => setRefreshing(false))
      .catch((error) => console.error(error));
  }, [infoGetter]);

  async function refreshFromApi() {
    setRefreshing(true);
    infoGetter()
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
    setRefreshing(false);
  }
  return refreshing ? (
    <Spinner />
  ) : (
    <FlatList
      ListHeaderComponent={listHeader}
      data={information}
      refreshing={refreshing}
      onRefresh={refreshFromApi}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItemContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(`${capitalize(query)} Details`, {
                  itemId: item._id,
                  query,
                });
              }}
              style={styles.itemElementContainer}
            >
              <View style={styles.firstRow}>
                {item.picture ? (
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: item.picture }}
                  />
                ) : (
                  <Image style={styles.thumbnail} source={icons.default_icon} />
                )}
                <View style={styles.headlineView}>
                  <Text
                    style={styles.name}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <TagRow tagList={item.tags} />
              </View>
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
  description: {
    ...tailwind("text-sm"),
  },
  firstRow: {
    ...tailwind("flex-row"),
  },
  headlineView: {
    ...tailwind("ml-2"),
    width: "70%",
  },
  itemElementContainer: {
    ...tailwind("flex-col bg-light-grey m-1 p-2 rounded-xl"),
  },
  listItemContainer: {
    ...tailwind("p-2"),
  },
  name: {
    ...tailwind("text-2xl font-bold"),
  },
  scrollBackground: {
    flex: 1,
  },
  tags: {
    ...tailwind("font-bold"),
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
