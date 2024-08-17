import axiosClient from '../services/axiosClient'; 

export const fetchClientName = async (clientId) => {
  try {
    const response = await axiosClient.get(`Clients/GetById?id=${clientId}`);
    return `${response.data.firstName} ${response.data.lastName}`;
  } catch (error) {
    throw new Error('Failed to fetch client name');
  }
};

export const fetchStaffByCenterId = async (centreId) => {
  try {
    const response = await axiosClient.get(`Technicians/GetListByCenter?centerId=${centreId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch staff by center ID');
  }
};

export const fetchVehicleNumber = async (vehicleId) => {
  try {
    const response = await axiosClient.get(`Vehicles/GetById?id=${vehicleId}`);
    return response.data.licensePlate;
  } catch (error) {
    throw new Error('Failed to fetch vehicle number');
  }
};

export const fetchMaintenanceCenterName = async (maintenanceCenterId) => {
  try {
    const response = await axiosClient.get(`MaintenanceCenters/GetById?id=${maintenanceCenterId}`);
    return response.data.maintenanceCenterName;
  } catch (error) {
    throw new Error('Failed to fetch maintenance center name');
  }
};

export const fetchRequestDetail = async (requestId) => {
  try {
    const response = await axiosClient.get(`Bookings/GetById?id=${requestId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch request details');
  }
};

export const getTechnicianDetail = async (technicianId) => {
  try {
    const response = await axiosClient.get(`Technicians/GetById?id=${technicianId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch technician details');
  }
};

export const updateStatus = async (requestId, newStatus) => {
  try {
    const response = await axiosClient.patch(
      `Bookings/UpdateStatus?bookingId=${requestId}&status=${newStatus}`,
      null,
      {
        headers: {
          'Content-Type': 'text/plain',
        }
      }
    );
    if (response.status !== 200) {
      throw new Error('Failed to update status');
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to update status');
  }
};
	