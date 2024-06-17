import axiosClient from "./axiosClient";

export const sparePartService = {
  getListSparePart: () => {
    const url = `/SparePartItem/GetAll`;
    return axiosClient.get(url);
  },
};
