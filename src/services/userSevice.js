import { BASE_URL } from "../../env";
import axiosClient from "./axiosClient";

export const userService = {
  login: ({ email, password }) => {
    const url = `/Accounts/Login?email=${email}&password=${password}`;
    return axiosClient.post(url);
  },
  getProfile: () => {
    const url = `/Accounts/Profile`;
    return axiosClient.get(url);
  },
};
