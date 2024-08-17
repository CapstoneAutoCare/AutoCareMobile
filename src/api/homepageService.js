import axiosClient from "../services/axiosClient";

export const fetchCentreData = async (centreId) => {
  try {
    const response = await axiosClient.get(`MaintenanceCenters/GetById?id=${centreId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch centre');
  }
};
