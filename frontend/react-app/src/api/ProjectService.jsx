import axios from "axios";

const API_URL = "http://localhost:8080/projects";

export async function saveProject(project) {
  return await axios.post(API_URL, project);
}

export async function getProjects(page = 0, size = 10) {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getProject(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateProject(id) {
  return await axios.post(`${API_URL}/${id}`);
}

export async function deleteProject(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
