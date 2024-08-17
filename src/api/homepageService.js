import Axios from 'axios';

const API_BASE_URL = 'https://capstoneautocareapi20240816003911.azurewebsites.net/api';

export const fetchCentreData = async (centreId) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}/MaintenanceCenters/GetById?id=${centreId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch centre');
  }
};