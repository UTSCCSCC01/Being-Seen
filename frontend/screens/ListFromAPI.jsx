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
  Image,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import openMap from "react-native-open-maps";

import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import colors from "../constants/colors";
import SearchScreen from "./SearchScreen";

const Stack = createNativeStackNavigator();
const apiPath = "http://10.0.2.2:3000/";
//const apiPath = "http://192.168.2.49:3000/";
export const purpleThemeColour = "#662997";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

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
            headerStyle: styles.header,
          }}
        >
          {({ navigation }) => (
            <>
              <ScreenHeader headerText={listName} />
              <ShelterList navigation={navigation} query={query} />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={`${capitalize(query)}Details`}
          component={DisplayShelter}
          options={{
            headerShown: true,
            headerTintColor: "#662997",
            headerStyle: styles.header,
          }}
        />
        <Stack.Screen
          name={`Review ${capitalize(query)}`}
          component={WriteReview}
          options={{
            headerShown: true,
            headerTintColor: purpleThemeColour,
            headerStyle: styles.header,
          }}
        />
        <Stack.Screen
          name={`Map ${capitalize(query)}`}
          component={Map}
          options={{
            headerShown: true,
            headerTintColor: purpleThemeColour,
            headerStyle: styles.header,
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
 * @function ShelterList display list of shelters
 * @module ShelterList ShelterList
 * @description display list of shelters
 * @param {*} navigation - screen navigator used to traverse between list of shelters and shelter details
 *
 */
function ShelterList({ navigation, query }) {
  const [information, setInformation] = useState([
    { name: `Error ${query} not loaded` },
  ]);
  const [sheltersRefreshing, setSheltersRefreshing] = useState(false);

  const onScreenLoad = () => {
    // when load grab shelters from api and put them into the shelters state
    getInfoFromApi(query)
      .then((response) => response.json())
      .then((json) => setInformation(json))
      .catch((error) => console.error(error));
  };
  // essentially componentWillMount
  useEffect(() => {
    onScreenLoad();
  }, []);

  async function refreshSheltersFromApi() {
    setSheltersRefreshing(true);
    getInfoFromApi(query)
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
      onRefresh={refreshSheltersFromApi}
      renderItem={({ item }) => {
        return (
          <View style={styles.marginColour}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate(`${capitalize(query)}Details`, {
                  item,
                  query,
                });
              }}
            >
              <View
                style={[
                  styles.box,
                  {
                    backgroundColor: colors.backgroundColor,
                  },
                ]}
              >
                {item.picture ? (
                  <Image style={styles.icon} source={{ uri: item.picture }} />
                ) : null}
                <View style={styles.boxText}>
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
              </View>
            </TouchableHighlight>
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
/**
 * @function DisplayShelter displays expanded details of a shelter
 * @module DisplayShelter DisplayShelter
 * @description displays expanded details of a shelter
 * @param {*} param0 recieves object containg route and navigation from react navigation
 *
 */
function DisplayShelter({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [info, setInfo] = useState(route.params.item);
  const { query } = route.params;

  async function refreshShelters() {
    setRefreshing(true);
    const res = await getInfoFromApiById(query, info._id);
    if (res.status == 200) {
      res.json().then((json) => setInfo(json));
    }
    setRefreshing(false);
  }

  return (
    <>
      <FlatList
        refreshing={refreshing}
        onRefresh={refreshShelters}
        ListHeaderComponent={
          <>
            {info.picture ? (
              <ImageBackground
                style={styles.largePic}
                source={{ uri: info.picture }}
              />
            ) : null}
            <View style={styles.displayTextView}>
              <Text style={styles.expandedText}>Name: {info.name}</Text>
              {info.address ? (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.expandedText}>Address: </Text>
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      openMap({ query: info.address });
                    }}
                  >
                    <Text style={styles.expandedTextUnderlines} color="purple">
                      {" "}
                      {info.address}
                    </Text>
                  </TouchableHighlight>
                </View>
              ) : null}
              {info.phoneNumber ? (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.expandedText}>Phone Number: </Text>
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      openPhone(info.phoneNumber);
                    }}
                  >
                    <Text style={styles.expandedTextUnderlines} color="purple">
                      {" "}
                      {info.phoneNumber}
                    </Text>
                  </TouchableHighlight>
                </View>
              ) : null}
              {info.email ? (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.expandedText}>Email:</Text>
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      Linking.openURL(`mailto:${info.email}?subject=&body=`);
                    }}
                  >
                    <Text style={styles.expandedTextUnderlines} color="purple">
                      {" "}
                      {info.email}
                    </Text>
                  </TouchableHighlight>
                </View>
              ) : null}
              <Text style={styles.expandedText}>
                Description: {info.description}
              </Text>
              {info.hours ? (
                <Text style={styles.expandedText}>Hours: {info.hours}</Text>
              ) : null}
              {info.rating ? (
                <View flexDirection="row">
                  <Text style={styles.expandedText}>Rating:</Text>
                  <Rating
                    readonly="true"
                    startingValue={info.rating}
                    tintColor={purpleThemeColour}
                    imageSize={40}
                    jumpValue={0.5}
                  />
                </View>
              ) : null}
            </View>
            <DisplayTags tags={info.tags} />
            {info.reviews ? (
              <Button
                onPress={() => {
                  navigation.navigate(`Review ${capitalize(query)}`, {
                    infoId: info._id,
                    query,
                  });
                }}
                title="Review This Shelter"
                color={purpleThemeColour}
              />
            ) : null}
            {info.website ? (
              <Button
                title="Go to website"
                onPress={() => {
                  Linking.openURL(info.website);
                }}
              />
            ) : null}
          </>
        }
        data={info.reviews}
        renderItem={({ item }) => (
          <View style={styles.reviewBox} key={item}>
            <Text style={styles.reviewText}>"{item.content}"</Text>
            <View flexDirection="row">
              <Text style={styles.reviewText}>Rating: </Text>
              <Rating
                readonly="true"
                startingValue={item.rating}
                tintColor={purpleThemeColour}
                imageSize={25}
              />
            </View>
            <Text style={styles.reviewText}>
              Written on {FormatDate(item.date)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.reviewer.toString()}
      />
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
    date: new Date(),
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
    if (tempRev != -1) {
      setReview({
        content: review.content,
        rating: tempRev,
        date: new Date(),
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
          method: "Get",
        }
      );
      if (response.status == 200) {
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
      const response = await fetch(
        // ipv4 localhost since running emulator
        // 10.0.2.2 is your machine's localhost when on an android emulator
        `${apiPath + reviewParams.query}/${
          reviewParams.infoId
        }/review/${reviewer}`,
        {
          method: "DELETE",
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
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            DeleteReviewFromApi();
            navigation.goBack();
          },
        },
      ]
    );
    // DeleteReviewFromApi()
    // navigation.goBack()
  }

  async function sendReviewToApi(body) {
    try {
      let method;
      if (editReview) method = "PATCH";
      else method = "POST";

      const response = await fetch(
        // ipv4 localhost since running emulator
        // 10.0.2.2 is your machine's localhost when on an android emulator
        `${apiPath + reviewParams.query}/${
          reviewParams.infoId
        }/review/${reviewer}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body,
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
              date: review.date,
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

async function getInfoFromApi(query) {
  try {
    const response = await fetch(
      // ipv4 localhost since running emulator
      // 10.0.2.2 is your machine's localhost when on an android emulator
      apiPath + query,
      //`http://192.168.2.49:3000/${query}`,
      {
        method: "Get",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getInfoFromApiById(query, id) {
  try {
    const response = await fetch(
      // ipv4 localhost since running emulator
      // 10.0.2.2 is your machine's localhost when on an android emulator
      `${apiPath + query}/${id}`,
      //`http://192.168.2.49:3000/${query}`,
      {
        method: "Get",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getProfileIdFromToken() {
  const token = await SecureStore.getItemAsync("token");
  const decoded = await jwt_decode(token);
  return decoded.id;
}

/**
 * @function getTags function responsible for extracting and formatting names of tags for a shelter
 * @module getTags getTags
 * @description function responsible for extracting and formatting names of tags for a shelter
 * @param {Tag[]} tags array of tags for a shelter
 *
 */
const getTags = (tags) => {
  let toRet = "";
  for (let i = 0; i < tags.length; i++) {
    toRet += tags[i].tagName;
    if (i != tags.length - 1) toRet += ", ";
  }
  return toRet;
};

export function openPhone(phone) {
  let phoneNumber;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  return Linking.openURL(phoneNumber);
}

/**
 * @function DisplayTags
 * @module DisplayTags
 * @description displays given tags within a flatlist of boxes
 * @param {*} props propety object which contains tags
 *
 */
export const DisplayTags = (props) => {
  const { tags } = props;
  return (
    <FlatList
      horizontal
      data={tags}
      renderItem={({ item }) => (
        <View style={styles.tagBox}>
          <Text>{item.tagName}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export const FormatDate = (dateString) => {
  const date = new Date(dateString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${weekdays[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};
const styles = StyleSheet.create({
  background: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  box: {
    borderColor: colors.themeMain,
    borderStyle: "solid",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    margin: 3,
    borderRadius: 8,
  },
  marginColour: {
    backgroundColor: "lightgrey",
  },
  boxText: {
    flex: 1,
    margin: 2,
  },
  displayBackground: {
    alignItems: "flex-start",
    backgroundColor: "#fffefc",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  expandedText: {
    // flex: 1,
    // flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: purpleThemeColour,
  },
  expandedTextUnderlines: {
    color: purpleThemeColour,
    fontSize: 16,
    margin: 2,
    textDecorationColor: purpleThemeColour,
    textDecorationLine: "underline",
  },
  header: {},
  headerLeftNode: {
    flex: 1,
  },
  headerMiddleNode: {
    flex: 3,
  },
  headerRightNode: {
    flex: 1,
  },
  headerText: {
    color: colors.themeMain,
    fontSize: 24,
  },
  icon: {
    flex: 0.25,
    height: "99%",
    width: "25%",
  },
  largePic: {
    height: Dimensions.get("window").height / 4,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
  },
  reviewBox: {
    // flexWrap: "wrap",
    backgroundColor: "white",
    borderColor: purpleThemeColour,
    borderWidth: 1,
  },
  reviewButton: {
    color: "purple",
  },
  reviewText: {
    // flex: 1,
    // flexWrap:'wrap',
    margin: 2,
    fontSize: 16,
    color: purpleThemeColour,
    flexWrap: "wrap",
  },
  scrollBackground: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent:'center',
    flex: 1,
  },
  displayTextView: {
    margin: 3,
  },
  tagBox: {
    backgroundColor: "gainsboro",
    borderColor: purpleThemeColour,
    borderRadius: 5,
    margin: 2,
  },
  tagText: {
    color: purpleThemeColour,
    fontSize: 12,
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
  },
  writeReviewBox: {
    backgroundColor: "white",
    borderColor: purpleThemeColour,
    borderWidth: 1,
    flex: 0,
    height: "40%",
    width: "100%",
  },
  writeReviewText: {
    color: purpleThemeColour,
    fontSize: 16,
  },
});

export default ListFromAPI;
