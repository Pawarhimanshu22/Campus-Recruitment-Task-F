import axiosClient from "./axiosClient";

const PROJECT_BASE = "/api/projects";

export const getProjects = () => axiosClient.get(PROJECT_BASE);

export const createProject = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  return axiosClient.post(PROJECT_BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProject = (id, data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  return axiosClient.put(`${PROJECT_BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProject = (id) =>
  axiosClient.delete(`${PROJECT_BASE}/${id}`);
