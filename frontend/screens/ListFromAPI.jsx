/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Rating } from "react-native-ratings";

import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import colors from "../constants/colors";
import ServiceList from "../components/screen_components/ServiceList";
import SearchScreen from "./SearchScreen";
import { capitalize } from "../util/FormatHelper";
import apiHandler from "../util/APIHandler";
import ServiceDetails from "./ServiceDetails";

const Stack = createNativeStackNavigator();
export const purpleThemeColour = "#662997";

/**
 *
 * @function ListFromAPI
 * @module ListFromAPI
 * @description full page of to display list of shelters and their details
 */
function ListFromAPI({ query }) {
  const listName = `${capitalize(query)}List`;
  return (
    <>
      <Stack.Navigator initialRouteName={listName}>
        <Stack.Screen
          name={listName}
          options={{
            headerShown: false,
            headerTintColor: "#662997",
            headerStyle: styles.header
          }}
        >
          {({ navigation }) => (
            <>
              <ScreenHeader headerText={listName} />
              <ServiceList
                navigation={navigation}
                query={query}
                infoGetter={() => {
                  return apiHandler.getInfoFromApi(query);
                }}
                listHeader={
                  <SearchBar
                    navigation={navigation}
                    resultScreenName={"searchResult"}
                    serviceType={query}
                  />
                }
              />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={`${capitalize(query)}Details`}
          component={ServiceDetails}
          options={{
            headerShown: true,
            headerTintColor: "#662997",
            headerStyle: styles.header
          }}
        />
        <Stack.Screen
          name={`Review ${capitalize(query)}`}
          component={WriteReview}
          options={{
            headerShown: true,
            headerTintColor: purpleThemeColour,
            headerStyle: styles.header
          }}
        />
        <Stack.Screen
          name={`Map ${capitalize(query)}`}
          component={Map}
          options={{
            headerShown: true,
            headerTintColor: purpleThemeColour,
            headerStyle: styles.header
          }}
        />
        <Stack.Screen
          name="searchResult"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

/**
 * @function WriteReview
 * @module WriteReview
 * @description displays the page responsible for handling the creation/editing of reviews
 * @param {*} param0 recieves object containing navigation and routing params
 */
function WriteReview({ route, navigation }) {
  const [review, setReview] = useState({
    content: "",
    rating: 0,
    date: new Date()
  });
  // local version of review rating since onFinishRating has unwanted effects on whole object
  const [tempRev, setTempRev] = useState(0);
  const [editReview, setEditReview] = useState(false);
  const [readyToPublish, setReadyToPublish] = useState(false);
  const [reviewer, setReviewer] = useState(null);
  const reviewParams = route.params;

  async function onScreenLoad() {
    // when load grab shelters from api and put them into the shelters state
    const profId = await getProfileIdFromToken();
    setReviewer(profId);
  }
  // essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  useEffect(() => {
    getReviewFromApi();
  }, [reviewer]);

  useEffect(() => {
    if (readyToPublish) {
      sendReviewToApi(
        JSON.stringify({ content: review.content, rating: review.rating })
      );
      navigation.goBack();
    }
    setReadyToPublish(false);
  }, [readyToPublish]);

  useEffect(() => {
    if (tempRev !== -1) {
      setReview({
        content: review.content,
        rating: tempRev,
        date: new Date()
      });
    }
  }, [tempRev]);

  async function getReviewFromApi() {
    try {
      const response = await fetch(
        // ipv4 localhost since running emulator
        // 10.0.2.2 is your machine's localhost when on an android emulator
        `${apiPath + reviewParams.query}/${
          reviewParams.infoId
        }/review/${reviewer}`,
        {
          method: "Get"
        }
      );
      if (response.status === 200) {
        response.json().then((json) => setReview(json));
        setEditReview(true);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteReviewFromApi() {
    try {
      await fetch(
        // ipv4 localhost since running emulator
        // 10.0.2.2 is your machine's localhost when on an android emulator
        `${apiPath + reviewParams.query}/${
          reviewParams.infoId
        }/review/${reviewer}`,
        {
          method: "DELETE"
        }
      );
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteReview() {
    Alert.alert(
      "Are you sure",
      "Once you delete this review, you cannot get it back",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            DeleteReviewFromApi();
            navigation.goBack();
          }
        }
      ]
    );
  }

  async function sendReviewToApi(body) {
    try {
      let method;
      if (editReview) method = "PATCH";
      else method = "POST";

      await fetch(
        `${apiPath + reviewParams.query}/${
          reviewParams.infoId
        }/review/${reviewer}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <View alignItems="center">
        <Text style={styles.writeReviewText}>Type Your Review Here</Text>
      </View>

      <View style={styles.writeReviewBox}>
        <TextInput
          multiline
          defaultValue={review.content}
          placeholder="Enter Review Here"
          maxLength={400}
          onChangeText={(content) =>
            setReview({
              content,
              rating: review.rating,
              date: review.date
            })
          }
        />
      </View>
      <View style={{ padding: "1%" }} />
      <View
        style={{ flex: 0.5, flexDirection: "row", justifyContent: "center" }}
      >
        <Rating
          startingValue={review.rating}
          tintColor={purpleThemeColour}
          jumpValue={0.5}
          onFinishRating={setTempRev}
        />
      </View>
      <Button
        title="publish review"
        color={purpleThemeColour}
        onPress={() => {
          setReadyToPublish(true);
        }}
      />
      <Button title="Delete Review" color="red" onPress={DeleteReview} />
    </View>
  );
}

async function getProfileIdFromToken() {
  const token = await SecureStore.getItemAsync("token");
  const decoded = await jwt_decode(token);
  return decoded.id;
}

const styles = StyleSheet.create({
  background: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  box: {
    borderColor: colors.themeMain,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 3
  },
  boxText: {
    flex: 1,
    margin: 2
  },
  displayBackground: {
    alignItems: "flex-start",
    backgroundColor: "#fffefc",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  displayTextView: {
    margin: 3
  },
  expandedText: {
    // flex: 1,
    // flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: purpleThemeColour
  },
  expandedTextUnderlines: {
    color: purpleThemeColour,
    fontSize: 16,
    margin: 2,
    textDecorationColor: purpleThemeColour,
    textDecorationLine: "underline"
  },
  header: {},
  headerLeftNode: {
    flex: 1
  },
  headerMiddleNode: {
    flex: 3
  },
  headerRightNode: {
    flex: 1
  },
  headerText: {
    color: colors.themeMain,
    fontSize: 24
  },
  icon: {
    flex: 0.25,
    height: "99%",
    width: "25%"
  },
  largePic: {
    height: Dimensions.get("window").height / 4,
    resizeMode: "cover",
    width: Dimensions.get("window").width
  },
  marginColour: {
    backgroundColor: "lightgrey"
  },
  reviewButton: {
    color: "purple"
  },
  reviewText: {
    margin: 2,
    fontSize: 16,
    color: purpleThemeColour,
    flexWrap: "wrap"
  },
  scrollBackground: {
    flex: 1
  },
  tagBox: {
    backgroundColor: "gainsboro",
    borderColor: purpleThemeColour,
    borderRadius: 5,
    margin: 2
  },
  tagText: {
    color: purpleThemeColour,
    fontSize: 12
  },
  text: {
    flex: 1,
    flexWrap: "wrap"
  },
  writeReviewBox: {
    backgroundColor: "white",
    borderColor: purpleThemeColour,
    borderWidth: 1,
    flex: 0,
    height: "40%",
    width: "100%"
  },
  writeReviewText: {
    color: purpleThemeColour,
    fontSize: 16
  }
});

export default ListFromAPI;
