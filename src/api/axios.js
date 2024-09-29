import axios from "axios";

const BASEURL = "https://ecom-backend-qdwv.onrender.com/";

export default axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASEURL, // Ensure this matches your server's URL
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Include credentials (cookies) with requests
});
