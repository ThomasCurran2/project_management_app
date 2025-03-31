import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * This component renders a project object with its data.
 *
 * @param {Object} project Object used to get/display project specific data.
 * @param {String} username String used to save the username when changing endpoints.
 * @param {List.<string>} userList List used to save all usernames when changing endpoints.
 * @param {string} empPerms String used to save the employee permission when changing endpoints.
 * @returns {ReactNode} A React element that renders a greeting to the user.
 */
function Projects({ project, username, userList, empPerms }) {
  const navigate = useNavigate();

  /**
   * Changes the endpoint to the project's edit page and sends over data needed when returning to the main projects endpoint.
   */
  const toEdit = () => {
    navigate(`/projects/${project.id}`, {
      state: {
        name: username,
        permission: empPerms,
        allUsers: userList,
      },
    });
  };

  return (
    <div className="project_div">
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>
        {"Due date: " + project.month + "/" + project.day + "/" + project.year}
      </p>
      <p>{project.priority}</p>
      <p>{"Assigned workers: " + project.userArray}</p>

      {empPerms === "Admin" ? (
        <div>
          <button className="editButton" onClick={toEdit}>
            edit
          </button>
        </div>
      ) : (
        console.log("No edit permissions")
      )}
    </div>
  );
}

export default Projects;
