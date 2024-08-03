import axiosClient from "../services/axiosClient";

export const taskService = {
  getTasks: async () => {
    try {
      const response = await axiosClient.get('/MaintenanceTasks/GetListByTech');
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; 
    }
  },
};
