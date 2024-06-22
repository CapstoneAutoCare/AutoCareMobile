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
};
