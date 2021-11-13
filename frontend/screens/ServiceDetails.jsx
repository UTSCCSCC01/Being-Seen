import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import openMap from "react-native-open-maps";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import Spinner from "../components/Spinner";
import TagRow from "../components/TagRow";
import apiHandler from "../util/APIHandler";
import { capitalize, formatDate, openPhoneNumber } from "../util/FormatHelper";

/**
 * @function ServiceDetails displays expanded details of a service
 * @module ServiceDetails
 * @description This is a screen that displays the details of one single service.
 * @prop {object} route Must contain {query, itemId} in route.params, where query is the name of
 *                         the endpoint to which this component will send http requests
 *                         and itemId is the id of the service of interest.
 * @prop {object} navigation The navigation object provided by react navigation library.
 *
 */
export default function ServiceDetails({ route, navigation }) {
  const { query, itemId } = route.params;
  const [refreshing, setRefreshing] = useState(true);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setRefreshing(true);
    apiHandler
      .getInfoFromApiById(query, itemId)
      .then((res) => res.json())
      .then((json) => setInfo(json))
      .then(() => setRefreshing(false))
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
      <ScreenHeader
        leftNode={<BackButton />}
        headerText={info?.name}
        secondaryHeader
      />
      {refreshing ? (
        <Spinner />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={refreshFromApi}
          ListHeaderComponent={
            <>
              {info.picture ? (
                <ImageBackground
                  style={styles.headlinePicture}
                  source={{ uri: info.picture }}
                />
              ) : null}
              <View style={styles.infoContainer}>
                <Text style={styles.infoNormalText}>Name: {info.name}</Text>
                {info.address ? (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoNormalText}>Address: </Text>
                    <TouchableOpacity
                      onPress={() => {
                        openMap({ query: info.address });
                      }}
                    >
                      <Text style={styles.infoUnderlinedText}>
                        {" "}
                        {info.address}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {info.phoneNumber ? (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoNormalText}>Phone Number: </Text>
                    <TouchableOpacity
                      onPress={() => {
                        openPhoneNumber(info.phoneNumber);
                      }}
                    >
                      <Text style={styles.infoUnderlinedText} color="purple">
                        {" "}
                        {info.phoneNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {info.email ? (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoNormalText}>Email:</Text>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`mailto:${info.email}?subject=&body=`);
                      }}
                    >
                      <Text style={styles.infoUnderlinedText} color="purple">
                        {" "}
                        {info.email}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <Text style={styles.infoNormalText}>
                  <Text style={styles.infoNormalText}>Description:</Text>
                  <Text style={styles.infoNormalText}>{info.description}</Text>
                </Text>
                {info.hours ? (
                  <Text style={styles.infoNormalText}>Hours: {info.hours}</Text>
                ) : null}
                {info.rating ? (
                  <View flexDirection="row">
                    <Text style={styles.infoNormalText}>Rating:</Text>
                    <Rating
                      readonly="true"
                      startingValue={info.rating}
                      // tintColor={purpleThemeColour} <-- TODO: Fix this styling
                      imageSize={28}
                      jumpValue={0.5}
                    />
                  </View>
                ) : null}
              </View>
              <TagRow tagList={info.tags} />
              <View style={styles.buttonsView}>
                {info.reviews ? (
                  <Button
                    style={styles.button}
                    onClick={() => {
                      navigation.push(`Review ${capitalize(query)}`, {
                        infoId: info._id,
                        query,
                      });
                    }}
                    label="Write/Edit a Review For This Shelter"
                    disabled={false}
                  />
                ) : null}
                {info.website ? (
                  <Button
                    style={styles.button}
                    label="Go to website"
                    disabled={false}
                    onClick={() => {
                      Linking.openURL(info.website);
                    }}
                  />
                ) : null}
              </View>
            </>
          }
          data={info.reviews}
          renderItem={({ item }) => (
            <View style={styles.reviewBox} key={item}>
              <Text style={styles.reviewText}>&quot;{item.content}&quot;</Text>
              <View flexDirection="row">
                <Text style={styles.reviewText}>Rating: </Text>
                <Rating
                  readonly="true"
                  startingValue={item.rating}
                  // tintColor={purpleThemeColour} <-- TODO: Fix this styling
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
  button: {
    ...tailwind("p-4"),
  },
  buttonsView: {
    ...tailwind("m-4"),
  },
  headlinePicture: {
    height: Dimensions.get("window").height / 4,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
  },
  infoContainer: {
    ...tailwind("bg-gray-100"),
    // borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  infoNormalText: {
    ...tailwind("text-black"),
    fontSize: 16,
    margin: 2,
  },
  infoRow: {
    flexDirection: "row",
  },
  infoUnderlinedText: {
    ...tailwind("text-black"),
    fontSize: 16,
    margin: 2,
    // textDecorationColor: purpleThemeColour,
    textDecorationLine: "underline",
  },
  reviewBox: {
    ...tailwind("bg-white border-primary"),
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    padding: 5,
  },
  reviewText: {
    ...tailwind("text-black"),
    flexWrap: "wrap",
    fontSize: 16,
    margin: 2,
  },
});
