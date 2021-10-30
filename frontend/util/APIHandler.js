// const apiAddress = "http://10.0.2.2:3000/";
const apiAddress = "http://192.168.0.13:3000/";

export default {
  async getInfoFromApi(query) {
    const response = await fetch(apiAddress + query, {
      method: "Get",
    });
    return response;
  },

  async getInfoFromApiById(query, id) {
    const response = await fetch(`${apiAddress + query}/${id}`, {
      method: "Get",
    });
    return response;
  },

  async submitLogin(username, password) {
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
};
