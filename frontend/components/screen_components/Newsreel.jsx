import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tailwind } from "tailwind";

/**
 * @function Newsreel
 * @module Newsreel
 * @description Newsreel list
 * @prop {Object} navigation - The navigation provided by react navigaition library.
 * @prop {string} numPosts - The type of the service displayed in this list
 * @prop {funcion} infoGetter - A function with which this component uses to get data
 */
export default function Newsreel({ navigation, numPosts, infoGetter }) {
  const [information, setInformation] = useState([
    { name: `Error: Can't load posts` },
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
    <View style={styles.newsPostView}>
      {information.map((item) => {
        return (
          <Pressable
            key={item._id + item.picture}
            style={styles.newsPostList}
            onPress={() => {
              navigation.push(`NewsPost`, {
                query: "news",
                itemId: item._id,
                post: item,
              });
            }}
          >
            <View style={styles.firstRow}>
              {item.picture ? (
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.picture }}
                />
              ) : null}
              <View style={styles.textContainer}>
                <Text
                  style={styles.headline}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item?.headline}
                </Text>
                <Text
                  style={styles.contentPreview}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.content}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

Newsreel.propTypes = {
  navigation: PropTypes.object.isRequired,
  numPosts: PropTypes.string.isRequired,
  infoGetter: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  contentPreview: {
    ...tailwind("text-sm"),
  },
  firstRow: {
    ...tailwind("flex-row"),
  },
  headline: {
    ...tailwind("text-lg font-bold"),
  },
  newsPostList: {
    ...tailwind("flex-col bg-light-grey m-1 p-2 rounded-xl"),
  },
  newsPostView: {
    ...tailwind("mt-4"),
  },
  textContainer: {
    ...tailwind("ml-2 px-2 flex-col"),
    width: "70%",
  },
  thumbnail: {
    borderRadius: 8,
    height: 100,
    width: 100,
  },
});
