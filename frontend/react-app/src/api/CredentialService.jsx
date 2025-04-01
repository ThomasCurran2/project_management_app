import axios from "axios";

const API_URL = "http://localhost:8080/credentials";

/**
 * Request method that saves a user's credentials to the database.
 *
 * @param {Object} credential Object with variables containing the username and password.
 * @returns {Promise} Post request responce from the backend, returns as a AxiosResponce if successful.
 */
export async function saveCredential(credential) {
  return await axios.post(API_URL, credential);
}

/**
 * Request method that verifies the username and password, and returns the userlist from the database.
 *
 * @param {string} username Inputted username from the user.
 * @param {string} password Inputted password from the user.
 * @returns {List.<Object>} Get request responce that returns a list containing if the user is verified, permissions, and the userlist.
 */
export async function getAuthenticated(username, password) {
  return await axios.get(
    `${API_URL}?username=${username}&password=${password}`
  );
}
