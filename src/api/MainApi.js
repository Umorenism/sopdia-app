// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import { toast } from 'react-hot-toast'

// import { store } from '../redux/store'
// import { t } from 'i18next'
// import Router from 'next/router'

// export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// //const baseUrl = 'http://stackfood.6am.one/react/api/v1/'

// const MainApi = axios.create({
//     baseURL: baseUrl,
// })

// MainApi.interceptors.request.use(function (config) {
//     let zoneId = undefined
//     let token = undefined
//     let language = undefined
//     let currentLocation = undefined
//     let software_id = 33571750
//     let hostname = process.env.NEXT_CLIENT_HOST_URL

//     if (typeof window !== 'undefined') {
//         zoneId = localStorage.getItem('zoneid')
//         token = localStorage.getItem('token')
//         language = localStorage.getItem('language')
//         currentLocation = JSON.parse(localStorage.getItem('currentLatLng'))
//         //hostname = window.location.hostnam
//     }
//     if (currentLocation) config.headers.latitude = currentLocation.lat
//     if (currentLocation) config.headers.longitude = currentLocation.lng
//     if (zoneId) config.headers.zoneId = zoneId
//     if (token) config.headers.authorization = `Bearer ${token}`
//     if (language) config.headers['X-localization'] = language
//     if (hostname) config.headers['origin'] = hostname
//     config.headers['X-software-id'] = software_id

//     return config
// })
// export default MainApi










import axios from "axios";
import { store } from "../redux/store";
import { t } from "i18next";
import Router from "next/router";
import { toast } from "react-hot-toast";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const baseUrl = 'http://stackfood.6am.one/react/api/v1/'

const MainApi = axios.create({
  baseURL: baseUrl,
});

// Request interceptor
MainApi.interceptors.request.use(
  function (config) {
    let zoneId;
    let token;
    let language;
    let currentLocation;
    const software_id = 33571750;
    const hostname = process.env.NEXT_CLIENT_HOST_URL;

    if (typeof window !== "undefined") {
      zoneId = localStorage.getItem("zoneid");
      token = localStorage.getItem("token");
      language = localStorage.getItem("language");
      try {
        currentLocation = JSON.parse(localStorage.getItem("currentLatLng"));
      } catch {
        currentLocation = null;
      }
    }

    if (currentLocation) {
      config.headers.latitude = currentLocation.lat;
      config.headers.longitude = currentLocation.lng;
    }
    if (zoneId) config.headers.zoneId = zoneId;
    if (token) config.headers.Authorization = `Bearer ${token}`; // ✅ Fixed capitalization
    if (language) config.headers["X-localization"] = language;
    if (hostname) config.headers["origin"] = hostname;
    config.headers["X-software-id"] = software_id;

    // Debug log
    if (process.env.NODE_ENV === "development") {
      console.log("➡️ Request headers:", config.headers);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor (handle 401 errors)
MainApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("🚨 Unauthorized! Clearing token.");
      localStorage.removeItem("token");
      toast.error(t("Session expired, please login again."));

      // Optional: redirect to login
      Router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default MainApi;
