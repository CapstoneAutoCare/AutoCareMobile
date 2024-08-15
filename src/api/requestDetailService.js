import Axios from 'axios';

const API_BASE_URL = 'http://solv2.runasp.net/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchClientName = async (clientId) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}/Clients/GetById?id=${clientId}`);
    return `${response.data.firstName} ${response.data.lastName}`;
  } catch (error) {
    throw new Error('Failed to fetch client name');
  }
};
export const fetchStaffByCenterId = async (centreId) => {
  const response = await Axios.get(`${API_BASE_URL}/Technicians/GetListByCenter?centerId=${centreId}`);
  return response.data;
};
export const fetchVehicleNumber = async (vehicleId) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}/Vehicles/GetById?id=${vehicleId}`);
    return response.data.licensePlate;
  } catch (error) {
    throw new Error('Failed to fetch vehicle number');
  }
};

export const fetchMaintenanceCenterName = async (maintenanceCenterId) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}/MaintenanceCenters/GetById?id=${maintenanceCenterId}`);
    return response.data.maintenanceCenterName;
  } catch (error) {
    throw new Error('Failed to fetch maintenance center name');
  }
};

export const fetchRequestDetail = async (requestId) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}/Bookings/GetById?id=${requestId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch request details');
  }
};
export const getTechnicianDetail = async (technicianId) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}/Technicians/GetById?id=${technicianId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch request details');
  }
};
export const updateStatus = async (requestId, newStatus) => {
  try {
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const response = await Axios.patch(`${API_BASE_URL}/Bookings/UpdateStatus?bookingId=${requestId}&status=${newStatus}`, null,
      {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${accessToken}`,
        }
      }
    );
    if (response.status !== 200) {
      throw new Error(`Failed to update status`);
    }
    return response.data; // Nếu cần trả về dữ liệu sau khi cập nhật
  } catch (error) {
    throw new Error('Failed to update status');
  }
};
