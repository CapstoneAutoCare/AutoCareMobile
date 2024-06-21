import axiosClient from "./axiosClient";

export const centerService = {
  getListCenter: () => {
    const url = `/MaintenanceCenters/GetAll`;
    return axiosClient.get(url);
  },
  getListService: () => {
    const url = `/MaintenanceServices/GetListByCenter`;
    return axiosClient.get(url);
  },
  getListServiceById: (id) => {
    const url = `/MaintenanceServices/GetById?id=${id}`;
    return axiosClient.get(url);
  },
};
