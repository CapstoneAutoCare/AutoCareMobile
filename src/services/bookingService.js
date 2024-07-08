import axiosClient from "./axiosClient";

export const bookingService = {
  getListBooking: () => {
    const url = `/Bookings/GetListByCenter`;
    return axiosClient.get(url);
  },
  getListBookingByClient: () => {
    const url = `/Bookings/GetListByClient`;
    return axiosClient.get(url);
  },
  getListBookingById: (id) => {
    const url = `/Bookings/GetById?id=${id}`;
    return axiosClient.get(url);
  },
};
