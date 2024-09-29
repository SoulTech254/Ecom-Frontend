import axios from "axios";

const BASEURL = "http://127.0.0.1:3000";

export default axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://127.0.0.1:3000", // Ensure this matches your server's URL
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Include credentials (cookies) with requests
});
