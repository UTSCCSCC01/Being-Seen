import * as SecureStore from "expo-secure-store";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ScreenHeader from "../components/ScreenHeader";
import apiHandler from "../util/APIHandler";

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
        console.log(`rating: ${rating} content:${review.content}`)
        apiHandler
          .patchReviewToApi(infoId, reviewer, query, review.content, rating)
          .catch((error) => console.log(error));
      } else {
        apiHandler
          .postReviewToApi(infoId, reviewer, query, review.content, rating)
          .catch((error) => console.log(error));
      }
      navigation.goBack();
      return;
    }
    setReadyToPublish(false);
  }, [readyToPublish]);

  function DeleteReview() {
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
          onPress: async () => {
            await apiHandler.deleteReviewFromApi(infoId, reviewer, query);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ScreenHeader leftNode={<BackButton />} headerText="Write Review" />
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
        />
      </View>
      <View style={styles.horizontalRuler} />
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
            setReadyToPublish(true);
          }}
        />
      </View>
      <View style={styles.buttonView}>
        <Button label="Delete Review" disabled={false} onClick={DeleteReview} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    ...tailwind("mx-4 my-2"),
  },
  horizontalRuler: {
    ...tailwind("border-gray-400"),
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
  writeReviewBox: {
    ...tailwind("bg-white border-primary"),
    borderRadius: 8,
    borderWidth: 2,
    height: "40%",
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
  },
});

WriteReview.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
