import Axios from 'axios';
import { BASE_URL } from '../../env';

const API_BASE_URL = 'https://capstoneautocareapi20240816003911.azurewebsites.net/api';

export const fetchCentreData = async (centreId) => {
  try {
    const response = await Axios.get(`${BASE_URL}/MaintenanceCenters/GetById?id=${centreId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch centre');
  }
};