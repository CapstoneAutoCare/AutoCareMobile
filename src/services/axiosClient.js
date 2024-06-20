import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../env";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log("<AxiosClient> ACCESS TOKEN FAILED!");
  }

  return {
    ...config,
    headers: {
      ...customHeaders, 
      ...config.headers,
    },
  };
});


export default axiosClient;
