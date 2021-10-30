import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";
import { tailwind } from "tailwind";

import apiHandler from "../util/APIHandler";

/**
 * @function WriteReview
 * @module WriteReview
 * @description displays the page responsible for handling the creation/editing of reviews
 * @param {*} param0 recieves object containing navigation and routing params
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
              ...review,
              content,
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
          // tintColor={purpleThemeColour}
          jumpValue={0.5}
          onFinishRating={(rating) => {
            setReview({ ...review, rating });
          }}
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
  writeReviewBox: {
    ...tailwind("bg-white border-primary"),
    borderWidth: 1,
    flex: 0,
    height: "40%",
    width: "100%",
  },
  writeReviewText: {
    ...tailwind("text-black"),
    fontSize: 16,
  },
});
