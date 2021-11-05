import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
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
  const [refreshing, setRefreshing] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(post);
    // apiHandler
    //   .getInfoFromApiById(query, itemId)
    //   .then((res) => res.json())
    //   .then((json) => setInfo(json))
    //   .catch((error) => console.log(error));
  }, []);

  async function refreshFromApi() {
    setRefreshing(true);
    const res = await apiHandler.getInfoFromApiById(query, info._id);
    if (res.status === 200) {
      res.json().then((json) => setInfo(json));
    }
    setRefreshing(false);
  }

  return (
    <>
      {!info ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView style={styles.newsPostView}>
          <ScreenHeader leftNode={<BackButton />} />
          <ScrollView style={styles.articleView}>
            <Text style={styles.headline}>{info.headline}</Text>
            <Image
              source={{ uri: info.picture }}
              style={styles.image}
              resizeMethod="resize"
              resizeMode="contain"
            />
            <Text style={styles.content}>{post.content}</Text>
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
    ...tailwind("p-3"),
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
