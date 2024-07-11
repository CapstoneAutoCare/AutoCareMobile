import axiosClient from "./axiosClient";

export const sparePartService = {
  getListSparePart: () => {
    const url = `/SparePartItem/GetListByCenter`;
    return axiosClient.get(url);
  },
  getSparePart: () => {
    const url = `/SparePart/GetAll`;
    return axiosClient.get(url);
  },
  getSparePartById: (id) => {
    const url = `/SparePartItem/GetById?id=${id}`;
    return axiosClient.get(url);
  },
  getSparePartByCenter: (id) => {
    const url = `/SparePartsItemCosts/GetListByClient?centerId=${id}`;
    return axiosClient.get(url);
  },
};
