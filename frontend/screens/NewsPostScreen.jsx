import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageStore,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import openMap from "react-native-open-maps";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import { PrimaryHeader } from "../components/Headers";
import ScreenHeader from "../components/ScreenHeader";
import TagRow from "../components/TagRow";
import apiHandler from "../util/APIHandler";
import { capitalize, formatDate, openPhone } from "../util/FormatHelper";

/**
 * @function NewsPostScreen
 * @module NewsPostScreen
 * @description This is a screen that displays the details of a news post.
 * @prop {object} route Must contain {query, itemId} in route.params, where query is the name of
 *                         the endpoint to which this component will send http requests
 *                         and itemId is the id of the service of interest.
 * @prop {object} navigation The navigation object provided by react navigation library.
 * @prop {object} post The news post data.
 */
export default function NewsPostScreen({ route, navigation }) {
  const { query, itemId, post } = route.params;
  const [headline, setHeadline] = useState("");
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setHeadline(post.headline);
    setPicture(post.picture);
    const parsedContent = post.content.replace(/\\n/g, "\n\n");
    setContent(parsedContent);
  }, [post]);

  return (
    <>
      {!post ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView style={styles.newsPostView}>
          <ScreenHeader leftNode={<BackButton />} />
          <ScrollView style={styles.articleView}>
            <Text style={styles.headline}>{headline}</Text>
            {picture ? (
              <Image
                source={{ uri: picture }}
                style={styles.image}
                resizeMethod="resize"
                resizeMode="contain"
              />
            ) : (
              <View />
            )}
            <Text style={styles.content}>{content}</Text>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

NewsPostScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  articleView: {
    ...tailwind("px-4 my-2"),
  },
  content: {
    ...tailwind("text-base text-black"),
  },
  headline: {
    ...tailwind("text-3xl text-black font-bold"),
  },
  image: {
    ...tailwind("my-2"),
    height: 300,
    width: 400,
  },
  newsPostView: {
    flex: 1,
  },
});
