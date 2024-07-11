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
  getService: () => {
    const url = `/Services/GetAll`;
    return axiosClient.get(url);
  },
  getServiceByCenter: (id) => {
    const url = `/MaintenanceServiceCosts/GetListByClient?centerId=${id}`;
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
  postSparePartCost: (data) => {
    const url = `/SparePartsItemCosts/Post`;
    return axiosClient.post(url, data);
  },
  patchSparePartCost: (id) => {
    const url = `/SparePartsItemCosts/PatchStatus?id=${id}&status=ACTIVE`;
    return axiosClient.patch(url);
  },
  getListServiceById: (id) => {
    const url = `/MaintenanceServices/GetById?id=${id}`;
    return axiosClient.get(url);
  },
  getListStaff: () => {
    const url = `/Technicians/GetAll`;
    return axiosClient.get(url);
  },
  postStaff: (data) => {
    const url = `/Technicians/Post`;
    return axiosClient.post(url, data);
  },
  getListStaffById: (id) => {
    const url = `/Technicians/GetById?id=${id}`;
    return axiosClient.get(url);
  },
  getListCare: () => {
    const url = `/CustomerCares/GetAll`;
    return axiosClient.get(url);
  },
  postCare: (data) => {
    const url = `/CustomerCares/Post`;
    return axiosClient.post(url, data);
  },
  getListCareById: (id) => {
    const url = `/CustomerCares/GetById?id=${id}`;
    return axiosClient.get(url);
  },
  deleteServiceById: (id) => {
    const url = `/MaintenanceServices/Remove?id=${id}`;
    return axiosClient.delete(url);
  },
  deleteSparePartById: (id) => {
    const url = `/SparePartItem/Remove?id=${id}`;
    return axiosClient.delete(url);
  },
  getCenterById: (id) => {
    const url = `/MaintenanceCenters/GetById?id=${id}`;
    return axiosClient.get(url);
  },
};
