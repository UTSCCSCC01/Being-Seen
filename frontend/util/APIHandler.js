import * as SecureStore from "expo-secure-store";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

// const apiAddress = "http://10.0.2.2:3000/";
const apiAddress = "http://192.168.0.13:3000/";

// eslint-disable-next-line no-underscore-dangle
async function __sendReviewToAPI(
  serviceId,
  reviewerId,
  serviceType,
  content,
  rating,
  method
) {
  if (content === undefined || isNaN(rating)) {
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
  getInfoFromApi(serviceType) {
    return fetch(apiAddress + serviceType, {
      method: "Get",
    });
  },

  getInfoFromApiById(serviceType, id) {
    return fetch(`${apiAddress + serviceType}/${id}`, {
      method: "Get",
    });
  },

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

  getReviewFromApi(serviceId, reviewerId, serviceType) {
    return fetch(
      `${apiAddress + serviceType}/${serviceId}/review/${reviewerId}`,
      {
        method: "Get",
      }
    );
  },

  deleteReviewFromApi(serviceId, reviewerId, serviceType) {
    return fetch(
      `${apiAddress + serviceType}/${serviceId}/review/${reviewerId}`,
      {
        method: "DELETE",
      }
    );
  },

  async getProfileIdFromToken() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded.id;
  },

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
};
