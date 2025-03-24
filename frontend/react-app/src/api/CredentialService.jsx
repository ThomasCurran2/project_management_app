import axios from "axios";

const API_URL = "http://localhost:8080/credentials";

export async function saveCredential(credential) {
  return await axios.post(API_URL, credential);
}

export async function getCredentials(page = 0, size = 10) {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getAuthenticated(username, password) {
  return await axios.get(
    `${API_URL}?username=${username}&password=${password}`
  );
}
