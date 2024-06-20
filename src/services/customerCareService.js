import axiosClient from "./axiosClient";

export const customerCareService = {
  getListCustomerCare: () => {
    const url = `/CustomerCares/GetAll`;
    return axiosClient.get(url);
  },
};
