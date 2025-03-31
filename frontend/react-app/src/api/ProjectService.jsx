import axios from "axios";

const API_URL = "http://localhost:8080/projects";

/**
 * Request method that saves a project object to the database.
 *
 * @param {Object} project Object containing project details.
 * @returns {Promise} Post requeset responce from the backend, returns as a AxiosResponce if successful.
 */
export async function saveProject(project) {
  return await axios.post(API_URL, project);
}

/**
 * Request method that returns a page of project objects.
 *
 * @param {int} page Int specifying what page the data is being taken from.
 * @param {int} size Int specifying how many items are on each page.
 * @returns {Page.<Project>} Get request responce, returns a page of projects from the database.
 */
export async function getProjects(page = 0, size = 10) {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

/**
 * Request method that returns a single project object.
 *
 * @param {string} id String representing a project's uuid.
 * @returns {Project} Get request responce, returns a project object.
 */
export async function getProject(id) {
  return await axios.get(`${API_URL}/${id}`);
}

/**
 * Request method that deletes a single project object.
 *
 * @param {string} id String representing a project's uuid.
 * @returns {void} Get request responce, returns void.
 */
export async function deleteProject(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
