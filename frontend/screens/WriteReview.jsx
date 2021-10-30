import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import apiHandler from "../util/APIHandler";

/**
 * @function WriteReview
 * @module WriteReview
 * @description Displays a page responsible for handling the creation/editing of reviews
 * @prop {object} [route] Must contain {query, infoId} in route.params, where query is the
 *                        type of the service being displayed and infoId is the objectId of
 *                        this one service being reviewed.
 * @prop {object} [navigation] The navigation object provided by react navigation library.
 */
export default function WriteReview({ route, navigation }) {
  const [review, setReview] = useState({
    content: "",
    rating: 0,
    date: new Date(),
  });
  const [editReview, setEditReview] = useState(false);
  const [readyToPublish, setReadyToPublish] = useState(false);
  const [reviewer, setReviewer] = useState(null);
  const { query, infoId } = route.params;

  useEffect(() => {
    apiHandler
      .getProfileIdFromToken()
      .then((profileId) => setReviewer(profileId))
      .catch((error) => console.log(error));
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
          setReview(json);
          setEditReview(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (readyToPublish) {
      if (editReview) {
        apiHandler
          .postReviewToApi(
            infoId,
            reviewer,
            query,
            review.content,
            review.rating
          )
          .catch((error) => console.log(error));
      } else {
        apiHandler
          .patchReviewToApi(
            infoId,
            reviewer,
            query,
            review.content,
            review.rating
          )
          .catch((error) => console.log(error));
      }
      navigation.goBack();
    }
    setReadyToPublish(false);
  }, [
    editReview,
    infoId,
    navigation,
    query,
    readyToPublish,
    review.content,
    review.rating,
    reviewer,
  ]);

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
            apiHandler.deleteReviewFromApi(infoId, reviewer, query);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.pageContainer}>
      <Rating
        startingValue={review.rating}
        // tintColor={purpleThemeColour}
        jumpValue={0.5}
        imageSize={28}
        onFinishRating={(rating) => {
          setReview({ ...review, rating });
        }}
        style={styles.ratingStars}
      />
      <View alignItems="center">
        <Text style={styles.ratingHint}>Slide on The Stars to Rate</Text>
      </View>
      <View style={styles.horizontalRuler} />
      <View style={styles.writeReviewBox}>
        <TextInput
          multiline
          defaultValue={review.content}
          placeholder="Enter Review Here"
          maxLength={400}
          onChangeText={(content) =>
            setReview({
              ...review,
              content,
            })
          }
        />
      </View>
      <Button
        title="publish review"
        // color={purpleThemeColour}
        onPress={() => {
          setReadyToPublish(true);
        }}
      />
      <Button title="Delete Review" color="red" onPress={DeleteReview} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalRuler: {
    ...tailwind("border-gray-400"),
    borderBottomWidth: 1,
    margin: 3,
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
    marginTop: 8,
  },
  writeReviewBox: {
    ...tailwind("bg-white border-primary"),
    borderRadius: 8,
    borderWidth: 2,
    height: "40%",
    marginHorizontal: 5,
    padding: 5,
  },
});

WriteReview.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
