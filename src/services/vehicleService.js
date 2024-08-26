import axiosClient from "./axiosClient";

export const vehicleService = {
  getListVehicleByClient: () => {
    const url = `/Vehicles/GetListByClient`;
    return axiosClient.get(url);
  },
  getListVehicleModel: () => {
    const url = `/VehicleModel/GetAll`;
    return axiosClient.get(url);
  },
  getListVehicleBrand: () => {
    const url = `/VehicleBrand/GetAllActive`;
    return axiosClient.get(url);
  },
  getListVehicleModelByBrandId: (id) => {
    const url = `/VehicleModel/GetListActiveByBrandId?id=${id}`;
    return axiosClient.get(url);
  },
};
