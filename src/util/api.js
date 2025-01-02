import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  // ctrl /
  baseURL: "https://daovangbe.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
});

export default instance;
