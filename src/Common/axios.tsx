import axios from "axios";

const instance = axios.create({
  baseURL: "https://634a191133bb42dca4fe37b6.mockapi.io/",
});

export default instance;
