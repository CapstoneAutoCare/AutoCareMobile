import axiosClient from "./axiosClient";

export const customerCareService = {
  getListCustomerCareByCenterId: (id) => {
    const url = `/CustomerCares/GetListByCenter?centerId=${id}`;
    return axiosClient.get(url);
  },
};
