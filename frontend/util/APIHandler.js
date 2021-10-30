// const apiAddress = "http://10.0.2.2:3000/";
const apiAddress = "http://192.168.0.13:3000/";

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
};
