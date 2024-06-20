import axiosClient from "./axiosClient";

export const vehicleService = {
  getListVehicleByClient: () => {
    const url = `/Vehicles/GetListByClient`;
    return axiosClient.get(url);
  },
};
