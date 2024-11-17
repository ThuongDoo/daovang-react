import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://daovangbe.onrender.com/api/v1",
});

export default instance;
