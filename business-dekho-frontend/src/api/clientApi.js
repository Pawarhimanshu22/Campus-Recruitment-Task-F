import axiosClient from "./axiosClient";

const CLIENT_BASE = "/api/clients";

export const getClients = () => axiosClient.get(CLIENT_BASE);

export const createClient = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("designation", data.designation);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  return axiosClient.post(CLIENT_BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateClient = (id, data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("designation", data.designation);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  return axiosClient.put(`${CLIENT_BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteClient = (id) =>
  axiosClient.delete(`${CLIENT_BASE}/${id}`);
