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
  postService: (data) => {
    const url = `/MaintenanceServices/Post`;
    return axiosClient.post(url, data);
  },
  postServiceCost: (data) => {
    const url = `/MaintenanceServiceCosts/Post`;
    return axiosClient.post(url, data);
  },
  patchServiceCost: (id) => {
    const url = `/MaintenanceServiceCosts/PatchStatus?id=${id}&status=ACTIVE`;
    return axiosClient.patch(url);
  },
  getListServiceById: (id) => {
    const url = `/MaintenanceServices/GetById?id=${id}`;
    return axiosClient.get(url);
  },
};
