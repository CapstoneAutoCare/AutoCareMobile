const MaintenanceInformationsApi = {
  async getAll() {
    const url = "/MaintenanceInformations/GetAll";
    return await axiosApi.get(url);
  },
  async getById(token, id) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "/MaintenanceInformations/GetById?id=" + id;
    return await axiosApi.get(url, config);
  },
  async getListByClient(token) {
    const config = {
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "/MaintenanceInformations/GetListByClient";
    return await axiosApi.get(url,config);
  },
};
export default MaintenanceInformationsApi;
