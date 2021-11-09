import { UseNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const apiAddress = "http://10.0.2.2:3000/";

// eslint-disable-next-line no-underscore-dangle
async function __sendReviewToAPI(
  serviceId,
  reviewerId,
  serviceType,
  content,
  rating,
  method
) {
  if (content === undefined || Number.isNaN(rating)) {
    throw new Error("Content is undefined or rating is NaN");
  }
  const body = JSON.stringify({ content, rating });
  await fetch(`${apiAddress + serviceType}/${serviceId}/review/${reviewerId}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  });
}

export default {
  /**
   * Sends a GET request to the endpoint at serviceType.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @returns A Promise of response from the server.
   */
  getInfoFromApi(serviceType) {
    return fetch(apiAddress + serviceType, {
      method: "Get",
    });
  },

  /**
   * Sends a GET request to the endpoint at serviceType, with id concatenated.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @param {string} id The objectId of a database record.
   * @returns The Promise of a record in the database with objectId as its id.
   */
  getInfoFromApiById(serviceType, id) {
    return fetch(`${apiAddress + serviceType}/${id}`, {
      method: "Get",
    });
  },

  /**
   * Sends the login credentials to the server.
   * @param {string} username The username of the login credential.
   * @param {string} password The password of the login credential.
   * @returns A Promise of a response from the server, possibly containing an access token.
   */
  submitLogin(username, password) {
    return fetch(`${apiAddress}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  },

  /**
   * Let user log out and get back to Login page.
   */
  async logOut() {
    const navigation = UseNavigation();
    const token = await SecureStore.getItemAsync("token");
    if (token != null) {
      await SecureStore.deleteItemAsync("token");
      navigation.replace("Login");
    }
  },

  /**
   * Sends a list of strings as tags to the server.
   * @param {string[]} tagList An array of strings. Each one represents a tag to be searched.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @returns A Promise of an array of database records.
   */
  getSearchResult(tagList, serviceType) {
    const payload = JSON.stringify({
      tagList,
    });
    return fetch(`${apiAddress}${serviceType}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
  },

  /**
   * Gets this reviewer's review on this service.
   * @param {string} serviceId The objectId of the service of interest.
   * @param {string} reviewerId The objectId of the reviewer's profile.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @returns A Promise of the reviewer's review on this service. If this
   *          reviewer has not reviewed this service, the status code would
   *          be 404.
   */
  getReviewFromApi(serviceId, reviewerId, serviceType) {
    return fetch(
      `${apiAddress + serviceType}/${serviceId}/review/${reviewerId}`,
      {
        method: "Get",
      }
    );
  },

  /**
   * Gets the specified number of most recent news posts.
   * @param {string} numPosts the number of most recent posts
   * @returns A Promise of an array of the most recent posts.
   */
  getMostRecentNewsFromApi(numPosts) {
    return fetch(`${apiAddress}news/${numPosts}`, {
      method: "Get",
    });
  },

  /**
   * Deletes this reviewer's review on this service.
   * @param {string} serviceId The objectId of the service of interest.
   * @param {string} reviewerId reviewerId The objectId of the reviewer's profile.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @returns A Promise of a response from the server. 200 on success.
   */
  deleteReviewFromApi(serviceId, reviewerId, serviceType) {
    return fetch(
      `${apiAddress + serviceType}/${serviceId}/review/${reviewerId}`,
      {
        method: "DELETE",
      }
    );
  },

  /**
   * Sends a new review to the server and creates it in the database.
   * @param {string} serviceId The objectId of the service of interest.
   * @param {string} reviewerId The objectId of the reviewer's profile.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @param {string} content The content of this review.
   * @param {Number} rating The rating of thie review.
   */
  async postReviewToApi(serviceId, reviewerId, serviceType, content, rating) {
    __sendReviewToAPI(
      serviceId,
      reviewerId,
      serviceType,
      content,
      rating,
      "POST"
    );
  },

  /**
   * Sends an edited review to the server and overwrites it in the database.
   * @param {string} serviceId The objectId of the service of interest.
   * @param {string} reviewerId The objectId of the reviewer's profile.
   * @param {string} serviceType The name of the endpoint to which this http request will be sent.
   * @param {string} content The content of this review.
   * @param {Number} rating The rating of thie review.
   */
  async patchReviewToApi(serviceId, reviewerId, serviceType, content, rating) {
    __sendReviewToAPI(
      serviceId,
      reviewerId,
      serviceType,
      content,
      rating,
      "PATCH"
    );
  },

  async getProfile(profileId) {
    const URI = `${apiAddress}profiles/${profileId}`;
    const response = await fetch(URI, {
      method: "Get",
    });
    return response;
  },

  async updateStoryForProfile(story, profileId) {
    const bodyData = { story };
    const bodyDataJSON = JSON.stringify(bodyData);
    const URI = `${apiAddress}profiles/${profileId}`;
    const response = await fetch(URI, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: bodyDataJSON,
    });
    return response;
  },
};
