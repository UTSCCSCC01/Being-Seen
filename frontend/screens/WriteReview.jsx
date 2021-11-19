import * as SecureStore from "expo-secure-store";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import apiHandler from "../util/APIHandler";
import { AlertOK, AlertWarning } from "./Alerts";

/**
 * @function WriteReview
 * @module WriteReview
 * @description Displays a page responsible for handling the creation/editing of reviews
 * @prop {object} route Must contain {query, infoId} in route.params, where query is the
 *                        type of the service being displayed and infoId is the objectId of
 *                        this one service being reviewed.
 * @prop {object} navigation The navigation object provided by react navigation library.
 */
export default function WriteReview({ route, navigation }) {
  const [oldReview, setOldReview] = useState({
    content: "",
    rating: 0,
    date: new Date(),
  });
  const [review, setReview] = useState({
    content: "",
    rating: 0,
    date: new Date(),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [readyToPublish, setReadyToPublish] = useState(false);
  const [reviewer, setReviewer] = useState(null);
  // A classic moment of "when I remove this line the whole rating system collapses"
  // For some reason onFinishRating can't read review. This is the only workaround.
  const [rating, setRating] = useState(0);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showConfirmOK, setShowConfirmOK] = useState(false);
  const { query, infoId } = route.params;

  async function getProfileIdFromToken() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded.id;
  }

  useEffect(() => {
    getProfileIdFromToken().then((profile) => setReviewer(profile));
  }, []);

  useEffect(() => {
    apiHandler
      .getReviewFromApi(infoId, reviewer, query)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((json) => {
        if (json !== null) {
          setOldReview(json);
          setReview(json);
          setRating(review.rating);
          setIsEditing(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviewer]);

  useEffect(() => {
    if (readyToPublish) {
      if (isEditing) {
        apiHandler
          .patchReviewToApi(infoId, reviewer, query, review.content, rating)
          .catch((error) => console.log(error));
      } else {
        apiHandler
          .postReviewToApi(infoId, reviewer, query, review.content, rating)
          .catch((error) => console.log(error));
      }
      return;
    }
    setReadyToPublish(false);
  }, [readyToPublish]);

  return (
    <>
      <AlertOK
        isShown={showConfirmOK}
        onCancel={() => {
          navigation.goBack();
        }}
        onConfirm={() => {
          navigation.goBack();
        }}
        customView={
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>Your review has been recorded.</Text>
          </View>
        }
      />
      <AlertWarning
        isShown={showConfirmAlert}
        onCancel={() => {
          setShowConfirmAlert(false);
        }}
        onConfirm={async () => {
          await apiHandler.deleteReviewFromApi(infoId, reviewer, query);
          setShowConfirmAlert(false);
          navigation.goBack();
        }}
        customView={
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
              Are you sure? Once you delete this review, you cannot get it back!
            </Text>
          </View>
        }
      />
      <View style={styles.pageContainer}>
        <ScreenHeader leftNode={<BackButton />} headerText="Write Review" />
        <ScrollView>
          <View style={styles.writeReviewBox}>
            <TextInput
              multiline
              defaultValue={oldReview.content}
              placeholder="Enter Review Here"
              maxLength={400}
              onChangeText={(content) => {
                setReview({
                  content,
                  rating: review.rating,
                  date: review.date,
                });
              }}
              style={styles.textInput}
            />
          </View>
          <Rating
            startingValue={Math.max(0, oldReview.rating)}
            // tintColor={purpleThemeColour}
            jumpValue={0.5}
            imageSize={28}
            onFinishRating={setRating}
            style={styles.ratingStars}
          />
          <View alignItems="center">
            <Text style={styles.ratingHint}>Slide on The Stars to Rate</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              label="Publish Review"
              disabled={false}
              onClick={() => {
                setShowConfirmOK(true);
                setReadyToPublish(true);
              }}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              label="Delete Review"
              disabled={false}
              onClick={() => {
                setShowConfirmAlert(true);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    ...tailwind("items-center justify-center mt-2"),
  },
  alertText: {
    ...tailwind("text-center leading-5"),
  },
  buttonView: {
    ...tailwind("mx-4 my-2"),
  },
  horizontalRuler: {
    ...tailwind(""),
    borderBottomWidth: 1,
  },
  pageContainer: {
    flex: 1,
  },
  ratingHint: {
    ...tailwind("text-gray-400"),
    fontSize: 12,
  },
  ratingStars: {
    ...tailwind("bg-transparent"),
    marginVertical: 3,
  },
  textInput: {
    ...tailwind("text-base"),
  },
  writeReviewBox: {
    ...tailwind("m-3 p-2 border-2 border-grey rounded-lg"),
    height: 250,
  },
});

WriteReview.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
