import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import openMap from "react-native-open-maps";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import TagRow from "../components/TagRow";
import apiHandler from "../util/APIHandler";
import { capitalize, formatDate, openPhone } from "../util/FormatHelper";

/**
 * @function ServiceDetails displays expanded details of a service
 * @module ServiceDetails
 * @description This is a screen that displays the details of one single service.
 * @prop {object} [route] Must contain {query, itemId}, where query is the name of
 *                         the endpoint to which this component will send http requests
 *                         and itemId is the id of the service of interest.
 * @prop {object} [navigation] The navigation object provided by react navigation library.
 *
 */
export default function ServiceDetails({ route, navigation }) {
  const { query, itemId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    apiHandler
      .getInfoFromApiById(query, itemId)
      .then((res) => res.json())
      .then((json) => setInfo(json))
      .catch((error) => console.log(error));
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
        <FlatList
          refreshing={refreshing}
          onRefresh={refreshFromApi}
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
                      <Text
                        style={styles.expandedTextUnderlines}
                        color="purple"
                      >
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
                      <Text
                        style={styles.expandedTextUnderlines}
                        color="purple"
                      >
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
                      <Text
                        style={styles.expandedTextUnderlines}
                        color="purple"
                      >
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
                      // tintColor={purpleThemeColour}
                      imageSize={40}
                      jumpValue={0.5}
                    />
                  </View>
                ) : null}
              </View>
              <TagRow tagList={info.tags} />
              {info.reviews ? (
                <Button
                  onPress={() => {
                    navigation.navigate(`Review ${capitalize(query)}`, {
                      infoId: info._id,
                      query,
                    });
                  }}
                  title="Write/Edit a Review For This Shelter"
                  // color={purpleThemeColour}
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
                  // tintColor={purpleThemeColour}
                  imageSize={25}
                />
              </View>
              <Text style={styles.reviewText}>
                Written on {formatDate(item.date)}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.reviewer.toString()}
        />
      )}
    </>
  );
}

ServiceDetails.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  displayTextView: {
    margin: 3,
  },
  expandedText: {
    ...tailwind("text-black"),
    fontSize: 16,
    margin: 2,
  },
  expandedTextUnderlines: {
    ...tailwind("text-black"),
    fontSize: 16,
    margin: 2,
    // textDecorationColor: purpleThemeColour,
    textDecorationLine: "underline",
  },
  largePic: {
    height: Dimensions.get("window").height / 4,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
  },
  reviewText: {
    ...tailwind("text-black"),
    flexWrap: "wrap",
    fontSize: 16,
    margin: 2,
  },
});
