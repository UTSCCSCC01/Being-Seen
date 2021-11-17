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
import { PrimaryHeader, TertiaryHeader } from "../components/Headers";
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
      <ScreenHeader leftNode={<BackButton />} />
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
                <View style={styles.topInfo}>
                  <PrimaryHeader text={info?.name} />
                  <TagRow tagList={info.tags} />
                  {info.rating ? (
                    <View style={styles.ratingView}>
                      <Rating
                        readonly="true"
                        startingValue={info.rating}
                        // tintColor={purpleThemeColour} <-- TODO: Fix this styling
                        imageSize={28}
                        jumpValue={0.5}
                      />
                    </View>
                  ) : null}
                  {info.hours ? (
                    <Text style={styles.hours}>Open {info.hours}</Text>
                  ) : null}
                  <Text style={styles.description}>{info.description}</Text>
                </View>
                {info.address ? (
                  <TouchableOpacity
                    onPress={() => {
                      openMap({ query: info.address });
                    }}
                    style={styles.infoRow}
                  >
                    <TertiaryHeader text="Address" />
                    <Text style={styles.link}>{info.address}</Text>
                  </TouchableOpacity>
                ) : null}
                {info.phoneNumber ? (
                  <TouchableOpacity
                    onPress={() => {
                      openPhoneNumber(info.phoneNumber);
                    }}
                    style={styles.infoRow}
                  >
                    <TertiaryHeader text="Phone Number" />
                    <Text style={styles.link} color="purple">
                      {info.phoneNumber}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {info.email ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`mailto:${info.email}?subject=&body=`);
                    }}
                    style={styles.infoRow}
                  >
                    <TertiaryHeader text="Email" />
                    <Text style={styles.link} color="purple">
                      {info.email}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
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
              <View style={styles.ratingView}>
                <Rating
                  readonly="true"
                  startingValue={item.rating}
                  // tintColor={purpleThemeColour} <-- TODO: Fix this styling
                  imageSize={25}
                />
              </View>
              <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
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
  description: {
    ...tailwind("text-base"),
  },
  headlinePicture: {
    height: Dimensions.get("window").height / 3.5,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
  },
  hours: {
    ...tailwind("text-lg font-bold"),
  },
  infoContainer: {
    ...tailwind("py-3"),
  },
  infoRow: {
    ...tailwind("px-3 py-2 border-light-grey border-t-2"),
  },
  link: {
    ...tailwind("text-base"),
  },
  ratingView: {
    ...tailwind("flex-row py-2"),
  },
  reviewBox: {
    ...tailwind("px-4 py-3 border-light-grey border-t-2"),
  },
  reviewDate: {
    ...tailwind("text-sm text-grey"),
  },
  reviewText: {
    ...tailwind("font-black text-base"),
    flexWrap: "wrap",
  },
  topInfo: {
    ...tailwind("px-3 mb-3"),
  },
});
